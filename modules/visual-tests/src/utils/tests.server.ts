import { ObjectEntries } from '@reykjavik/hanna-utils';
import { execSync } from 'child_process';
import { existsSync, readFileSync, statSync } from 'fs';
import { stat } from 'fs/promises';

import { LABEL_SPLIT, NAME_SPLIT } from '../../tests/helpers/screeshots';

import { globP, globSync } from './glob.server';

type TestPageInfo = {
  path: string;
  label: string;
};
type SkippedTestInfo = {
  label: string;
  reasons: string;
};

const cwd = 'src/routes';

const _filesToTestList = (readSkipped?: true) => (files: Array<string>) =>
  files
    .map((file) => {
      const path = file.slice(cwd.length).replace(/(?:\.tsx?|\.skipped\.txt)$/, '');
      return {
        file,
        path,
        label: path.replace(/^.+\//, ''),
      };
    })
    .map(({ path, label, file }) => {
      if (file.endsWith('.skipped.txt')) {
        const skipped: SkippedTestInfo = {
          label: label.replace(/\.skipped$/, ''),
          reasons: (readSkipped && readFileSync(file).toString()) || '',
        };
        return skipped;
      }
      const testPage: TestPageInfo = { path, label };
      return testPage;
    });

const _testPageGlob = cwd + '/test/**/*{.tsx,.skipped.txt}';

export const getTestList = (): Promise<Array<TestPageInfo | SkippedTestInfo>> =>
  globP(_testPageGlob).then(_filesToTestList(true));

export const getTestListSync = (): Array<TestPageInfo> => {
  const files = globSync(_testPageGlob);
  return _filesToTestList()(files).filter((item): item is TestPageInfo => 'path' in item);
};

// ---------------------------------------------------------------------------

export type Changeset = {
  id: string;
  prevId?: string;
  nextId?: string;

  testName: string;
  label: string;
  project: string;

  testName_raw: string;
  specFile: string;
  actualPath: string;

  actualUrl: string;
  expectedUrl?: string;
  diffUrl?: string;

  confirmedBug?: true;
  confirmedOk?: true;
};

/*
  Structure of `public/test-results/**` file names,
  and how it relates to the `Changeset` type above:

  ┌─A─┐ ┌─B──┐┌Z┐┌─C─┐ ┌─────D──────────┐  ┌────E─────┐ ┌─B──┐┌Z┐┌─C─┐┌Y─┐┌─────F──────┐┌Z┐ ┌─G──┐
  tests-Button-ι-extra-¶firefox⁋-¶chrome⁋--firefox-wide/Button-ι-extra-ιι-disabled-hover-ι--actual.png

  (A) `specFile`.
      The name (prefix) of the actual "*.spec.ts" file containing
      the test definition.
  (B) Base part of `testName`.
      The name of the `src/routes/test/*` page
  (C) Optional label suffix part of `testName`
      The `TestInfoObj['label']` added when there are multiple
      tests run for a single test page.
  (D) This bit is ignored. (These are the tags that control
      in which "projects" (i.e. browsers) the test is run.
  (E) `project`. Effectively the name of the browser in which
      the screenshot is snapped.
  (F) `label`. An (optional) unique label for this specific screenshot.
      Most test pages don't have this as they only snap one.
  (G) The role of this image file.
      Possible values `actual`, `expected`, and `diff`.

  (Y) `LABEL_SPLIT`
  (Z) `NAME_SPLIT`
*/

const testsFolder = 'tests/'; // where the *.spec.ts files are stored
const publicFolder = 'public/';
const resultsFolder = 'test-results/';

const _getChangesToReview = async (): Promise<Array<Changeset>> => {
  const cwd = publicFolder + resultsFolder;
  if (!(await existsSync(cwd))) {
    console.warn(`Can't find folder "${cwd}"`);
    return [];
  }
  const fileList = await globP('*/*.{png,bug,ok}', { cwd });
  const filesByTest: Record<
    string,
    Pick<
      Changeset,
      | `${'actual' | 'expected' | 'diff'}Url`
      | 'actualPath'
      | 'confirmedBug'
      | 'confirmedOk'
    >
  > = {};
  let timestamp = 0;

  fileList.forEach((fileName, i) => {
    const m = fileName.match(`(.+)${NAME_SPLIT}-(actual|expected|diff)\\.(png|bug|ok)$`);
    if (!m) {
      return;
    }
    if (!timestamp) {
      timestamp = statSync(cwd + fileName).mtime.getTime();
    }

    const key = m[1] as string;
    const group =
      filesByTest[key] || (filesByTest[key] = { actualPath: '', actualUrl: '' });

    const ext = m[3] as 'png' | 'bug' | 'ok';
    if (ext !== 'png') {
      const flag = ext === 'ok' ? 'confirmedOk' : 'confirmedBug';
      group[flag] = true;
      return;
    }

    const type = m[2] as 'actual' | 'expected' | 'diff';
    if (type === 'actual') {
      group.actualPath = fileName;
    }
    group[`${type}Url`] = '/' + resultsFolder + fileName + '?t=' + timestamp;
  });
  const changes = ObjectEntries(filesByTest).map(([testPath, urls]): Changeset => {
    const [folder = '', filename = ''] = testPath.split('/');
    const project = folder.split('--')[1] || '_unknown-project_';
    const [testName_raw = '_unknown-test_', label = ''] = filename.split(LABEL_SPLIT);
    const testName = testName_raw.replace(NAME_SPLIT, ' : ');
    const id = `${testName}_${label}_${project}`;

    const specFile = folder.split('-' + testName_raw)[0] || '_unknown-specfile_';

    return {
      id,
      testName_raw,
      testName,
      label,
      project,
      specFile,

      ...urls,
    };
  });
  changes.sort((a, b) => {
    if (a.testName !== b.testName) {
      return a.testName > b.testName ? 1 : -1;
    }
    if (a.label !== b.label) {
      return a.label > b.label ? 1 : -1;
    }
    if (a.project !== a.project) {
      return a.project > b.project ? 1 : -1;
    }
    return 0;
  });
  changes.forEach((change, i) => {
    const prev = changes[i - 1];
    const next = changes[i + 1];
    if (prev) {
      change.prevId = prev.id;
    }
    if (next) {
      change.nextId = next.id;
    }
  });
  return changes;
};

/** Max-age for the `changes` cache in milliseconds  */
const CHANGES_MAXAGE = 20_000; // ms
const EMPTY_CACHE = { time: 0, changes: [] };
let cache: {
  time: number;
  changes: Array<Changeset>;
} = EMPTY_CACHE;

const _emptyChangesCache = () => {
  cache = EMPTY_CACHE;
};

// ---------------------------------------------------------------------------

export const getChangesToReview = async (
  noCache?: boolean
): Promise<Array<Changeset>> => {
  const time = Date.now();
  if (time - cache.time > CHANGES_MAXAGE || noCache) {
    cache = {
      time,
      changes: await _getChangesToReview(),
    };
  }
  return cache.changes;
};

// ---------------------------------------------------------------------------

export const getChangeById = async (id: string | undefined) => {
  if (!id) {
    return;
  }
  return (await getChangesToReview()).find((change) => change.id === id);
};

// ---------------------------------------------------------------------------

const _getNextChangeId = async (id: string): Promise<string | undefined> =>
  (await getChangesToReview()).find((change, i, arr) => i > 0 && arr[i - 1]!.id === id)
    ?.id;

const getSnapshotFilePath = (change: Changeset): string => {
  const { specFile, testName_raw, project } = change;

  const label = change.label ? LABEL_SPLIT + change.label : '';

  const _snapshotsPath = `${testsFolder + specFile}.spec.ts-snapshots/`;
  const _snapshotsFileName = `${testName_raw + label + NAME_SPLIT}-${project}-${
    process.platform
  }.png`;
  return _snapshotsPath + _snapshotsFileName;
};

export const updateScreenshotsFor = async (id: string, action: 'accept' | 'reject') => {
  const change = await getChangeById(id);

  if (!change) {
    return;
  }
  const nextId = await _getNextChangeId(id);
  const actualPath = change.actualPath;

  const isNew = !change.expectedUrl;
  const actualFile = publicFolder + resultsFolder + actualPath;
  const bugFlagFile = actualFile.replace(/.png$/, '.bug');
  const okFlagFile = actualFile.replace(/.png$/, '.ok');
  const snapshotsFile = getSnapshotFilePath(change);

  if (action === 'accept') {
    execSync(`rm -f ${bugFlagFile}`);
    execSync(`touch ${okFlagFile}`);
    execSync(`cp ${actualFile} ${snapshotsFile}`);
  } else {
    execSync(`rm -f ${okFlagFile}`);
    execSync(`touch ${bugFlagFile}`);
    if (isNew) {
      execSync(`rm -f ${snapshotsFile}`);
    } else {
      const expectedFile = actualFile.replace(/-actual.png$/, '-expected.png');
      execSync(`cp ${expectedFile} ${snapshotsFile}`);
    }
  }

  // Always refresh changes list
  _emptyChangesCache();
  return nextId;
};

// ---------------------------------------------------------------------------

export const getReportDate = () =>
  stat('public/report/index.html')
    .then((stat) => stat.mtime.getTime())
    .catch(() => undefined);

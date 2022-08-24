import { ObjectEntries } from '@reykjavik/hanna-utils';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import type { IOptions as GlobOptions } from 'glob';

import { LABEL_SPLIT, NAME_SPLIT } from '../../tests/helpers/screeshots';

import { globP, globSync } from './glob.server';

type TestPageInfo = {
  path: string;
  label: string;
};

const _filesToTestList = (files: Array<string>) =>
  files
    .map((file) => '/' + file.replace(/\.tsx?$/, ''))
    .map(
      (path): TestPageInfo => ({
        path,
        label: path.replace(/^.+\//, ''),
      })
    );

const _testPageGlob = 'test/**/*.tsx';
const _testPageGlobOpts: GlobOptions = { cwd: 'src/routes' };

export const getTestList = (): Promise<Array<TestPageInfo>> =>
  globP(_testPageGlob, _testPageGlobOpts).then(_filesToTestList);

export const getTestListSync = (): Array<TestPageInfo> => {
  const files = globSync(_testPageGlob, _testPageGlobOpts);
  return _filesToTestList(files);
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
};

/*
  Structure of `public/test-results/**` file names,
  and how it relates to the `Changeset` type above:

  ┌─A─┐ ┌─B──┐┌Z┐┌─C─┐ ┌─────D─────┐  ┌────E─────┐ ┌─B──┐┌Z┐┌─C─┐┌Y─┐┌─────F──────┐┌Z┐ ┌─G──┐
  tests-Button-ι-extra-🏷also-safari--firefox-wide/Button-ι-extra-ιι-disabled-hover-ι--actual.png

  (A) `specFile`.
      The name (prefix) of the actual "*.spec.ts" file containing
      the test definition.
  (B) Base part of `testName`.
      The name of the `src/routes/test/*` page
  (C) Optional label suffix part of `testName`
      The `TestInfoObj['label']` added when there are multiple
      tests run for a single test page.
  (D) This bit is ignored. (These are optional tags that control
      in which "projects" (browsers) test is run.
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
  const fileList = await globP('*/*.{png,bug}', { cwd });
  const filesByTest: Record<
    string,
    Pick<
      Changeset,
      `${'actual' | 'expected' | 'diff'}Url` | 'actualPath' | 'confirmedBug'
    >
  > = {};
  fileList.forEach((fileName) => {
    const m = fileName.match(`(.+)${NAME_SPLIT}-(actual|expected|diff).(png|bug)$`);
    if (m) {
      const key = m[1] as string;
      const group =
        filesByTest[key] || (filesByTest[key] = { actualPath: '', actualUrl: '' });

      if (m[3] === 'bug') {
        group.confirmedBug = true;
        return;
      }

      const type = m[2] as 'actual' | 'expected' | 'diff';
      if (type === 'actual') {
        group.actualPath = fileName;
      }
      group[`${type}Url`] = '/' + resultsFolder + fileName;
    }
  });
  const changes = ObjectEntries(filesByTest).map(([testPath, urls]): Changeset => {
    const [folder = '', filename = ''] = testPath.split('/');
    const project = folder.split('--')[1] || '_unknown-project_';
    const [testName_raw = '_unknown-test_', label = ''] = filename.split(LABEL_SPLIT);
    const testName = testName_raw.replace(NAME_SPLIT, '--');
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
  const snapshotsFile = getSnapshotFilePath(change);

  if (isNew) {
    if (action === 'accept') {
      execSync(`mv ${actualFile} ${snapshotsFile}`);
    } else {
      execSync(`rm ${snapshotsFile}`);
      execSync(`touch ${bugFlagFile}`);
    }
  } else {
    if (action === 'accept') {
      const expectedFile = actualFile.replace(/-actual.png$/, '-expected.png');
      const diffFile = actualFile.replace(/-actual.png$/, '-diff.png');
      execSync(`mv ${actualFile} ${snapshotsFile}`);
      execSync(`rm -f ${expectedFile} ${diffFile} ${bugFlagFile}`);
    } else {
      execSync(`touch ${bugFlagFile}`);
    }
  }

  // Always refresh changes list
  _emptyChangesCache();
  return nextId;
};

// ---------------------------------------------------------------------------

export const doesReportExists = () => existsSync('public/report/index.html');

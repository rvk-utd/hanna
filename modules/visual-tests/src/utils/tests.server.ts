import type { IOptions as GlobOptions } from 'glob';

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

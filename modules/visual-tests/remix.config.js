/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*', '**/*.tsx_', '**/*.css.ts'],
  appDirectory: 'src',
  assetsBuildDirectory: 'public/build',
  serverBuildPath: '_remix-build/index.js',
  // publicPath: "/build/",
};

const { createRoutesFromFolders } = require('@remix-run/v1-route-convention');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },

  // Tell Remix to ignore everything in the routes directory.
  // We'll let `createRoutesFromFolders` take care of that.
  ignoredRouteFiles: ['**/*'],
  routes: (defineRoutes) =>
    createRoutesFromFolders(defineRoutes, {
      appDirectory: 'src',
      ignoredFilePatterns: ['**/.*', '**/*.{tsx_,txt}', '**/*.css.ts'],
    }),

  appDirectory: 'src',
  assetsBuildDirectory: 'public/build',
  serverBuildPath: '_remix-build/index.js',
  // publicPath: "/build/",
};

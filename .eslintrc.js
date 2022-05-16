module.exports = require('@hugsmidjan/hxmstyle')({
  // Place your project-specific additions or overrides here
  // using standard ESLint config syntax...

  rules: {
    'total-functions/require-strict-mode': 'error',
  },
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
});

module.exports = {
  extends: [
    // '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '../../.eslintrc.js',
  ],
  parserOptions: {
    project: __dirname + '/tsconfig.json',
  },
  // ignorePatterns: ['src/**/iframeResizer.contentWindow@4.js'],
};

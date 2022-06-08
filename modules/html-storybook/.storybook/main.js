const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: { transpileManager: true },
    },
    '@storybook/addon-viewport/register',
    '@whitespace/storybook-addon-html/register',
    '@storybook/addon-knobs/register',
  ],
  webpackFinal: /* async */ (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      resolve: {
        alias: {
          '@reykjavik/hanna-css': path.resolve(__dirname, '../../hanna-css/src/lib/'),
          '@reykjavik/hanna-react': path.resolve(__dirname, '../../hanna-react/src/'),
          '@reykjavik/hanna-utils': path.resolve(__dirname, '../../hanna-utils/src/'),
        },
      },

      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};

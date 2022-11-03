import { devices, PlaywrightTestConfig } from '@playwright/test';
import { ObjectEntries, ObjectFromEntries } from '@reykjavik/hanna-utils';

import { ProjectName, TestTag } from './src/test-helpers/testingInfo';
import { TAG_PREFIX, TAG_SUFFIX } from './tests/helpers/screeshots';
import { registerCustomSelectorsEngines } from './tests/helpers/selectorEngines';

registerCustomSelectorsEngines();

// ---------------------------------------------------------------------------

const tagREs: Record<TestTag, RegExp> = ObjectFromEntries(
  (
    [
      'meta',
      'firefox',
      'firefox-wide',
      'firefox-netbook',
      'firefox-tablet',
      'firefox-phone',
      'chrome',
      'chrome-wide',
      'chrome-netbook',
      'chrome-tablet',
      'chrome-phone',
      'safari',
      'safari-wide',
      'safari-netbook',
      'safari-tablet',
      'safari-phone',
      // 'ipad',
      // 'iphone',
    ] /*  as Array<TestTag> */ as const
  ).map((name) => {
    const re = new RegExp(TAG_PREFIX.trim() + name + TAG_SUFFIX);
    return [name, re];
  })
);

type ProjectCfg = NonNullable<PlaywrightTestConfig['projects']>[0] & {
  name: ProjectName;
};

const projects: Array<ProjectCfg> = [
  {
    name: 'meta',
    // use: { browserName: 'chromium' },
    grep: tagREs.meta,
  },

  ...ObjectEntries({
    wide: { width: 1600, height: 300 },
    netbook: { width: 1100, height: 300 },
    tablet: { width: 768, height: 300 },
    phone: { width: 375, height: 300 },
  }).flatMap(
    ([label, viewport]): Array<ProjectCfg> => [
      {
        name: `firefox-${label}`,
        use: {
          ...devices['Desktop Firefox'],
          viewport,
        },
        grep: [tagREs.firefox, tagREs[`firefox-${label}`]],
      },
      {
        name: `chrome-${label}`,
        use: {
          ...devices['Desktop Chrome'],
          viewport,
        },
        grep: [tagREs.chrome, tagREs[`chrome-${label}`]],
      },
      {
        name: `safari-${label}`,
        use: {
          ...devices['Desktop Safari'],
          viewport,
        },
        grep: [tagREs.safari, tagREs[`safari-${label}`]],
      },
    ]
  ),

  // // The webkit-based emulators (especially "iphone") are wildly unstable
  // // and non-deterministic.
  // // Since we're not really testing touch-screen behavior or other device
  // // specific things, and mostly just CSS rendering, we decided to just
  // // stick with Firefox.
  // {
  //   name: 'ipad',
  //   use: { ...devices['iPad (gen 7)'] },
  //   grep: [tagREs.ipad],
  // },
  // {
  //   name: 'iphone',
  //   use: { ...devices['iPhone 12'] },
  //   grep: [tagREs.iphone],
  // },

  /* Test against branded browsers. */
  // { name: 'Microsoft Edge', use: { channel: 'msedge' } },
  // { name: 'Google Chrome', use: { channel: 'chrome' } },
];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'public/test-results',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'public/report', open: 'never' }]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:7357',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects,

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'yarn run webserver:testingmode',
      port: 7357,
      reuseExistingServer: true,
    },
    {
      command: 'yarn run build:css:dev  &&  yarn run dev:server',
      cwd: '../hanna-css',
      port: 4000,
      reuseExistingServer: true,
    },
  ],
};

export default config;

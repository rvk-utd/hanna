import { devices, PlaywrightTestConfig } from '@playwright/test';
import { ObjectEntries, ObjectFromEntries } from '@reykjavik/hanna-utils';

import { ProjectName, TestTag } from './src/test-helpers/testingInfo';
import { TAG_PREFIX } from './tests/helpers/screeshots';
import { registerCustomSelectorsEngines } from './tests/helpers/selectorEngines';

registerCustomSelectorsEngines();

// ---------------------------------------------------------------------------

const tagREs: Record<TestTag, RegExp> = ObjectFromEntries(
  (
    [
      'meta',
      'firefox',
      'firefox_wide',
      'firefox_netbook',
      'chrome',
      'chrome_wide',
      'chrome_netbook',
      'safari',
      'safari_wide',
      'safari_netbook',
      'ipad',
      'iphone',
    ] /*  as Array<TestTag> */ as const
  ).map((name) => {
    const re = new RegExp(TAG_PREFIX + name.replace(/_/g, '-'));
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
  }).flatMap(
    ([label, viewport]): Array<ProjectCfg> => [
      {
        name: `firefox_${label}`,
        // use desktop firefox
        use: {
          ...devices['Desktop Firefox'],
          viewport,
        },
        grep: [tagREs.firefox, tagREs[`firefox_${label}`]],
      },
      {
        name: `chrome_${label}`,
        use: {
          ...devices['Desktop Chrome'],
          viewport,
        },
        grep: [tagREs.chrome, tagREs[`chrome_${label}`]],
      },
      {
        name: `safari_${label}`,
        use: {
          ...devices['Desktop Safari'],
          viewport,
        },
        grep: [tagREs.safari, tagREs[`safari_${label}`]],
      },
    ]
  ),

  {
    name: 'ipad',
    use: { ...devices['iPad (gen 7)'] },
    grep: [tagREs.ipad],
  },
  {
    name: 'iphone',
    use: { ...devices['iPhone 12'] },
    grep: [tagREs.iphone],
  },

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

  updateSnapshots: 'none',

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

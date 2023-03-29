import React, { Fragment, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Layout } from '@reykjavik/hanna-react/Layout';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { breadCrumbTrail } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.server';

export const meta: MetaFunction = autoTitle;

const toggle = (on: true | undefined) => !on || undefined;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('Alert', 'BreadCrumbs');

export default function () {
  const [globalAlerts, setGlobalAlerts] = useState<true | undefined>();
  const [bigContent, setBigContent] = useState<true | undefined>();

  return (
    <Layout
      globalAlerts={
        globalAlerts && (
          <Fragment>
            <Alert type="warning" closable>
              Some warning
            </Alert>
            <Alert type="critical" closable>
              Some critical alert
            </Alert>
          </Fragment>
        )
      }
      navChildren={
        <Fragment>
          <BreadCrumbs title="Þú ert hér" trail={breadCrumbTrail} />
          <DummyBlock thin />
          Nav Content
          <DummyBlock thin />
        </Fragment>
      }
      footerChildren={
        <Fragment>
          <DummyBlock thin />
          Footer Content
          <DummyBlock thin />
        </Fragment>
      }
    >
      <DummyBlock thin />
      <p>
        <strong>Toggle:</strong>{' '}
        <button data-testid="content" onClick={() => setBigContent(toggle)}>
          BigContent
        </button>
        ,{' '}
        <button data-testid="alerts" onClick={() => setGlobalAlerts(toggle)}>
          Alerts
        </button>
      </p>
      {bigContent ? <DummyBlock customHeight="600px" /> : <DummyBlock big />}
    </Layout>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot }) => {
    await page.getByTestId('content').click();
    await page.mouse.move(0, 0);
    await pageScreenshot('bigcontent');

    await page.getByTestId('content').click();
    await page.getByTestId('alerts').click();
    await page.mouse.move(0, 0);
    await pageScreenshot('alerts');
  },
};

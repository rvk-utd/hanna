import React, { Fragment, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import Alert from '@reykjavik/hanna-react/Alert';
import Layout from '@reykjavik/hanna-react/Layout';

import { DummyBlock } from '../../layout/DummyBlock';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

const toggle = (on: true | undefined) => !on || undefined;

// Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['Alert'] };

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

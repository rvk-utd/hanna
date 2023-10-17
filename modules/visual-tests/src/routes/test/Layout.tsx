import React, { Fragment, useState } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Layout } from '@reykjavik/hanna-react/Layout';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { breadCrumbTrail } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

const toggle = (on: true | undefined) => !on || undefined;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('Alert', 'BreadCrumbs');

const SHY = '\u00AD';

const siteNames = [
  'Mínar síður',
  'Gagnahlaðborðið í tveimur línum',
  'Vaðlaheiðar' + SHY + 'vegavinnu' + SHY + 'verkfæra' + SHY + 'geymslu' + SHY + 'skúr',
];

export default function () {
  const [globalAlerts, setGlobalAlerts] = useState<true | undefined>();
  const [bigContent, setBigContent] = useState<true | undefined>();
  const [siteName, setSiteName] = useState<string | undefined>();
  const [opacity, setOpacity] = useState(0);

  return (
    <Layout
      siteName={siteName}
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
          {!siteName && <BreadCrumbs trail={breadCrumbTrail} />}
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
      wrapperProps={{
        onMouseEnter: () => setOpacity(1),
        onMouseLeave: () => setOpacity(0),
      }}
    >
      <DummyBlock thin />
      <p>
        <strong>Toggle:</strong>{' '}
        <button data-testid="content" onClick={() => setBigContent(toggle)}>
          BigContent
        </button>
        <button data-testid="alerts" onClick={() => setGlobalAlerts(toggle)}>
          , Alerts
        </button>
        <button
          data-testid="sitename"
          onClick={() => setSiteName((n) => siteNames[siteNames.indexOf(n || '') + 1])}
          style={{ opacity }}
        >
          , SiteName
        </button>
      </p>
      {bigContent ? <DummyBlock customHeight="600px" /> : <DummyBlock big />}
    </Layout>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot, localScreenshot, mediaFormat }) => {
    await page.getByTestId('content').click();
    await page.mouse.move(0, 0);
    await pageScreenshot('bigcontent');
    await page.getByTestId('content').click();

    await page.getByTestId('alerts').click();
    await page.mouse.move(0, 0);
    await pageScreenshot('alerts');
    await page.getByTestId('alerts').click();

    if (mediaFormat('wide') || mediaFormat('phone')) {
      const homeLink = page.locator('.Layout__header__homelink');
      let i = siteNames.length;
      while (i--) {
        await page.locator('.Layout__main').hover();
        await page.getByTestId('sitename').click();
        await localScreenshot(homeLink, `siteneame-${i}`, { margin: true });
      }
      await page.getByTestId('sitename').click();
      await page.mouse.move(0, 0);
    }
  },
};

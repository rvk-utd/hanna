import React, { Fragment, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { WizardLayout } from '@reykjavik/hanna-react/WizardLayout';
import { WizardLayoutClose } from '@reykjavik/hanna-react/WizardLayoutClose';

import { DummyBlock, GhostLabel } from '../../layout/DummyBlock.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route';

export const meta: MetaFunction = autoTitle;

const toggle = (on: true | undefined) => !on || undefined;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('Alert', 'WizardLayoutClose');

export default function () {
  const [globalAlerts, setGlobalAlerts] = useState<true | undefined>();
  const [stepper, setStepper] = useState<true | undefined>();
  const [closeLink, setCloseLink] = useState<true | undefined>();
  return (
    <WizardLayout
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
      wizardStepper={
        stepper && (
          <Fragment>
            <GhostLabel label="Wizard Stepper Zone" />
            {' '}
            <DummyBlock customHeight="600px" clear={false} />
          </Fragment>
        )
      }
      wizardFooter={
        closeLink ? (
          <WizardLayoutClose href="/" label="Hætta" />
        ) : (
          <WizardLayoutClose onClick={() => undefined} label="Hætta" />
        )
      }
    >
      <p>
        <strong>Toggle:</strong>{' '}
        <button data-testid="stepper" onClick={() => setStepper(toggle)}>
          Stepper
        </button>
        {', '}
        <button data-testid="alerts" onClick={() => setGlobalAlerts(toggle)}>
          Alerts
        </button>
        {', '}
        <button data-testid="closelink" onClick={() => setCloseLink(toggle)}>
          CloseA
        </button>
      </p>

      <DummyBlock customHeight="600px" clear={false} />
    </WizardLayout>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, pageScreenshot, project }) => {
    await page.getByTestId('stepper').click();
    await page.mouse.move(0, 0);
    await pageScreenshot('stepper');

    await page.getByTestId('alerts').click();
    await page.mouse.move(0, 0);
    await pageScreenshot('alerts');

    if (project === 'firefox-netbook') {
      return;
    }

    const closeButton = page.locator('.WizardLayoutClose');
    await closeButton.hover();
    await localScreenshot(closeButton, 'closeButton-hover', { margin: 10 });

    await page.getByTestId('closelink').click();
    await closeButton.hover();
    await localScreenshot(closeButton, 'closeLink-hover', { margin: 10 });
  },
};

import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { ButtonBack } from '@reykjavik/hanna-react/ButtonBack';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <ButtonBack>Back button</ButtonBack>
      <ButtonBack disabled>Disabled button</ButtonBack>
      <br />
      <ButtonBack href="">Back link</ButtonBack>{' '}
      <ButtonBack aria-disabled="true" href="">
        Disabled link
      </ButtonBack>{' '}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }

    const backButton = page.locator('.ButtonBack:text("Back button")');
    const backLink = page.locator('.ButtonBack:text("Back link")');
    const disabledBackButton = page.locator('.ButtonBack:text("Disabled button")');
    const disabledBackLink = page.locator('.ButtonBack:text("Disabled link")');

    await backButton.hover();
    await localScreenshot(backButton, 'button-hover');

    await backLink.hover();
    await localScreenshot(backLink, 'link-hover');

    await disabledBackButton.hover({ force: true });
    await localScreenshot(disabledBackButton, 'button-disabled-hover');

    await disabledBackLink.hover({ force: true });
    await localScreenshot(disabledBackLink, 'link-disabled-hover');
  },
};

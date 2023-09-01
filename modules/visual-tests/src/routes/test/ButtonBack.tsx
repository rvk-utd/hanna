import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { ButtonBack } from '@reykjavik/hanna-react/ButtonBack';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

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
  extras: async ({ page, localScreenshot, mediaFormat }) => {
    if (!mediaFormat('wide') && !mediaFormat('phone')) {
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

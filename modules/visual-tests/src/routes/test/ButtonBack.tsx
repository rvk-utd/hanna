import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import ButtonBack from '@reykjavik/hanna-react/ButtonBack';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ButtonBack>Button Back</ButtonBack>
      <ButtonBack disabled>Disabled</ButtonBack>
      <br />
      <ButtonBack href="">Link Back</ButtonBack>{' '}
      <ButtonBack aria-disabled="true" href="">
        Link Back
      </ButtonBack>{' '}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const backButton = page.locator('.ButtonBack >> nth=0');
    const linkBackButton = page.locator('.ButtonBack >> nth=2');

    await backButton.hover();
    await localScreenshot(backButton, 'button-back-hover');

    await linkBackButton.hover();
    await localScreenshot(linkBackButton, 'link-back-hover');
  },
};

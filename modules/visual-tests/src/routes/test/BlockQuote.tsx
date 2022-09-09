import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import BlockQuote from '@reykjavik/hanna-react/BlockQuote';

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
      <BlockQuote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus in beatae distinctio cum!
      </BlockQuote>
      <BlockQuote by="Jón Jónsson">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <ul>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Explicabo quam voluptas necessitatibus in beatae distinctio cum!</li>
        </ul>
        <p>Explicabo quam voluptas necessitatibus in beatae distinctio cum!</p>
        <ol>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Explicabo quam voluptas necessitatibus in beatae distinctio cum!</li>
        </ol>
      </BlockQuote>
      <BlockQuote by="Jón Jónsson ehf" byHref="about:blank">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
          necessitatibus in beatae distinctio cum!
        </p>
      </BlockQuote>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('a').hover();
  },
};

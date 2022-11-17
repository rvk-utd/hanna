import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import TextButton from '@reykjavik/hanna-react/TextButton';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <p>
        Some <TextButton href="">text Link</TextButton> in text.{' '}
        <TextButton data-testid="link-hover" href="">
          Hover link
        </TextButton>
        .{' — '}
        Also available: <TextButton>text Button</TextButton> version.{' '}
        <TextButton data-testid="button-hover">Hover button</TextButton>.
      </p>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '[data-testid="link-hover"]',
  extras: async ({ page, localScreenshot }) => {
    const button = page.getByTestId('button-hover');
    await button.hover();
    await localScreenshot(button, 'button-hover');
  },
};

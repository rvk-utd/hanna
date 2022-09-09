import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Attention from '@reykjavik/hanna-react/Attention';

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
      <Attention>
        Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í
        Ráðhúsi Reykjavíkur hefst kl. 14:00. Please note that -{' '}
        <a href="">Bein útsending frá fundi borgarstjórnar</a> í Ráðhúsi Reykjavíkur hefst
        kl. 14:00
      </Attention>
      {'\n\n'}
      <Attention small>
        Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í
        Ráðhúsi Reykjavíkur hefst kl. 14:00. Please note that -{' '}
        <a href="">Bein útsending frá fundi borgarstjórnar</a> í Ráðhúsi Reykjavíkur hefst
        kl. 14:00.
      </Attention>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('a >> nth=0').hover();
  },
};

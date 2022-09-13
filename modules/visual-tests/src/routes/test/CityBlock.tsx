import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import CityBlock, { CityBlockProps } from '@reykjavik/hanna-react/CityBlock';

import { Minimal } from '../../layout/Minimal';
import { illustr, lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

const IMAGES = {
  '': { image: illustr.medium },
  largebox: { image: { src: photo.square.src, altText: 'Alt text!' } },
};
// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const props: Pick<CityBlockProps, 'content' | 'type' | 'startSeen'> = {
  content: {
    title: 'Lorem Ipsum',
    summary: lorem.medium,
    buttons: [{ href: '', label: 'Dagskrá næsta fundar' }],
  },
};

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <CityBlock {...props} {...IMAGES['']} startSeen />
      <CityBlock {...props} {...IMAGES['largebox']} align="left" startSeen />
      <CityBlock {...props} {...IMAGES['largebox']} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('.CityBlock__button >> nth=0').hover();
  },
};

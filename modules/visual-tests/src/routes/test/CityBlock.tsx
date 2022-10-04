import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import CityBlock, { CityBlockProps } from '@reykjavik/hanna-react/CityBlock';

import { Minimal } from '../../layout/Minimal';
import { illustr, lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

const IMAGES = {
  illustr: { image: illustr.tall },
  portrait: { image: { src: photo.portrait.src, altText: 'Alt text!' } },
  small: { image: { src: photo.square.src, altTect: 'Alt text' } },
};
// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const buttonList = [
  { href: '', label: 'Button number one' },
  { href: '', label: 'Button number two' },
  { href: '', label: 'Button number three' },
  { href: '', label: 'Button number four' },
];

const content = (cityBlockTitle: string, i: number) => {
  const props: Pick<CityBlockProps, 'content' | 'startSeen'> = {
    content: {
      title: cityBlockTitle,
      summary: lorem.medium,
      buttons: buttonList.slice(0, i),
    },

    startSeen: true,
  };
  return props;
};

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <CityBlock
        {...content('Large image and right aligned', 3)}
        {...IMAGES.portrait}
        type={'largeimage'}
        startSeen
      />
      <CityBlock
        {...content('Large image and left aligned', 1)}
        {...IMAGES.portrait}
        align={'left'}
        type={'largeimage'}
        startSeen
      />
      <CityBlock
        {...content('Large illustration and right aligned', 4)}
        {...IMAGES.illustr}
        startSeen
      />
      <CityBlock
        {...content('Large illustration and left aligned', 2)}
        {...IMAGES.illustr}
        align={'left'}
        startSeen
      />
      <CityBlock
        {...content('Largebox and left aligned', 0)}
        {...IMAGES.illustr}
        type={'largebox'}
        startSeen
      />
      <CityBlock
        {...content('Largebox and right aligned', 2)}
        {...IMAGES.illustr}
        align={'left'}
        type={'largebox'}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('.CityBlock__button >> nth=0').hover();
  },
};

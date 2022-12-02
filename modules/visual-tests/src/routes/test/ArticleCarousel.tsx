import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import {
  ArticleCarousel,
  ArticleCarouselProps,
} from '@reykjavik/hanna-react/ArticleCarousel';

import { Minimal } from '../../layout/Minimal';
import { illustr, lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

const items: ArticleCarouselProps['items'] = [
  {
    image: illustr.short,
    theme: 'colorful',
    date: '30. mar 2020',
    title: 'Item Number One',
    summary: lorem.tiny,
    href: '/',
  },
  {
    image: {
      ...photo.landscape,
      photo: true,
    },
    color: 'ellidaardalur',
    date: '20. feb 2021',
    title: 'Second Item Has a Pretty Long Title',
    summary: lorem.medium.slice(0, 120) + '.',
    href: '/',
  },
  {
    image: illustr.tall,
    title: 'This is the third item',
    summary: lorem.tiny,
    href: '/',
  },
  {
    image: illustr.medium,
    color: 'sund',
    date: '20. feb 2021',
    title: 'Item Number Four',
    summary: lorem.short,
    href: '/',
  },
  {
    image: illustr.tall,
    color: 'nautholsvik',
    title: 'Item Number Five',
    summary: lorem.tiny,
    href: '/',
  },
  {
    image: illustr.short,
    color: 'ellidaardalur',
    date: '20. feb 2021',
    title: 'Item Number Six',
    summary: lorem.tiny,
    href: '/',
  },
];

// ---------------------------------------------------------------------------

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <ArticleCarousel
        title="Article Carousel"
        moreLabel="Lesa meira"
        items={items}
        startSeen
      />
      <ArticleCarousel items={items.slice(0, 2)} startSeen />
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  initialHover: '.ArticleCarouselCard__illustration >> nth=0',
  extras: async ({ page, localScreenshot }) => {
    const carousel = page.locator('.ArticleCarousel >> nth=0');
    const itemlist = carousel.locator('.ArticleCarousel__itemlist');

    await carousel.locator('.CarouselStepper__button >> nth=2').click();
    await page.waitForTimeout(100);

    await itemlist.hover();

    await carousel.locator('.ArticleCarousel__itemlist-goRight').hover();
    await localScreenshot(itemlist, 'goright-hover');

    await carousel.locator('.ArticleCarousel__itemlist-goLeft').hover();
    await localScreenshot(itemlist, 'goleft-hover');
  },
};

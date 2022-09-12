import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ArticleCarousel, {
  ArticleCarouselProps,
} from '@reykjavik/hanna-react/ArticleCarousel';

import { Minimal } from '../../layout/Minimal';
import { illustr, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

const items: ArticleCarouselProps['items'] = [
  {
    image: illustr.short,
    theme: 'colorful',
    date: '30. mar 2020',
    title: 'Item Number One',
    summary: 'Veðrið hafði lítil áhrif á 88 íbúa og starfsfólk Seljahlíðar í gærmorgun.',
    href: '/',
  },
  {
    image: {
      ...photo.landscape,
      photo: true,
    },
    color: 'ellidaardalur',
    title: 'Second Item Has a Pretty Long Title',
    summary:
      'Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
    href: '/',
  },
  {
    image: illustr.tall,
    date: '20. feb 2021',
    title: 'This is the third item',
    summary:
      'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
    href: '/',
  },
  {
    image: illustr.medium,
    color: 'sund',
    date: '20. feb 2021',
    title: 'Item Number Four',
    summary:
      'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
    href: '/',
  },
  {
    image: illustr.tall,
    color: 'nautholsvik',
    date: '30. mar 2020',
    title: 'Item Number Five',
    summary:
      'Veðrið hafði lítil áhrif á 88 íbúa og starfsfólk Seljahlíðar í gærmorgun þegar þau gengu þríeykisgöngu í kringum hjúkrunarheimilið.',
    href: '/',
  },
  {
    image: illustr.short,
    color: 'ellidaardalur',
    date: '20. feb 2021',
    title: 'Borgarlínan',
    summary:
      'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
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

import React from 'react';
import {
  ArticleCarousel,
  ArticleCarouselProps,
} from '@reykjavik/hanna-react/ArticleCarousel';

import photohUrl from './example_assets/NewsHero__landscape.jpg';
import { StoryComponent, StoryParameters } from './storytypes.js';

const articleCarouselData: ArticleCarouselProps = {
  title: 'Article Carousel',
  moreLabel: 'Lesa meira',
  items: [
    {
      illustration: 'tomstundir3',
      theme: 'colorful',
      date: '30. mar 2020',
      title: 'Borgarlínan',
      summary:
        'Veðrið hafði lítil áhrif á 88 íbúa og starfsfólk Seljahlíðar í gærmorgun þegar þau gengu þríeykisgöngu í kringum hjúkrunarheimilið.',
      href: '/',
    },
    {
      image: {
        src: photohUrl,
        altText: 'Listaverið Sólfarið við Sæbraut',
        photo: true,
      },
      color: 'ellidaardalur',
      title: 'Borgarlínan',
      summary:
        'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
      href: '/',
      target: '_blank',
    },
    {
      illustration: 'borgarstjori2',
      date: '20. feb 2021',
      title: 'Borgarlínan',
      summary:
        'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
      href: '/',
    },
    {
      illustration: 'born2',
      color: 'sund',
      date: '20. feb 2021',
      title: 'Borgarlínan',
      summary:
        'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
      href: '/',
    },
    {
      illustration: 'atvinna2',
      color: 'nautholsvik',
      date: '30. mar 2020',
      title: 'Borgarlínan',
      summary:
        'Veðrið hafði lítil áhrif á 88 íbúa og starfsfólk Seljahlíðar í gærmorgun þegar þau gengu þríeykisgöngu í kringum hjúkrunarheimilið.',
      href: '/',
    },
    {
      illustration: 'velferd1',
      color: 'ellidaardalur',
      date: '20. feb 2021',
      title: 'Borgarlínan',
      summary:
        'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
      href: '/',
    },
    {
      illustration: 'velferd1',
      color: 'ellidaardalur',
      date: '20. feb 2021',
      title: 'Borgarlínan',
      summary:
        'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
      href: '/',
    },
    {
      illustration: 'velferd1',
      color: 'ellidaardalur',
      date: '20. feb 2021',
      title: 'Borgarlínan',
      summary:
        'Nokkrar götur í miðborginni verða tímabundnar göngugötur í sumar. Tilgangurinn er að  skapa aukið og betra rými fyrir gangandi vegfarendur, mannlíf og starfsemi.',
      href: '/',
    },
  ],
};

// ===========================================================================

export default {
  title: 'ArticleCarousel',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _ArticleCarousel: StoryComponent = () => (
  <ArticleCarousel {...articleCarouselData} startSeen />
);

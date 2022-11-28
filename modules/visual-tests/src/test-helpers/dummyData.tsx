import React, { Fragment, ReactNode } from 'react';

export const host =
  typeof location !== 'undefined'
    ? location.href.replace(/([^:/])\/.+/, '$1')
    : `http://localhost:${process.env.PORT || '8080'}`;

export const illustr = {
  short: { src: '/media/illustration-short.png', altText: 'Short illustration' },
  medium: {
    src: '/media/illustration-medium.png',
    altText: 'Medium-high illustration',
  },
  tall: { src: '/media/illustration-tall.png', altText: 'Tall illustration' },
};

export const photo = {
  landscape: { src: '/media/photo-landscape.png', altText: 'Photo, landscape' },
  square: { src: '/media/photo-square.png', altText: 'Photo, square' },
  portrait: { src: '/media/photo-portrait.png', altText: 'Photo, portrait' },
  banner: { src: '/media/photo-banner.png', altText: 'Photo, long banner' },
};

export const blingUrl = '/media/bling.svg';

// ---------------------------------------------------------------------------

export const lorem = {
  tiny: 'Leebur deroor iehroom, bork bork börk! Enim ad minim chokolat moose. ',
  short:
    'Yöva gäta stahrt sömwaer. Ut enim ad minim venäm, letsi börk ifder ' +
    'svensk og latin makinen dehr graek. ',
  medium:
    'Vender gests kämmen vewänthärdis wehrdsen onderpasje moose. Ut enim ' +
    'ad minim veniam, letsi ifder svensk og latin makinen dehr graek. ' +
    'Yöva gäta stahrt sömwaer. Nawei raitinen de wehbsyte. ',
  long:
    'Lörem ipsum dolor sit amet, dedeeshka duu. Leebur deroor iehroom, bork ' +
    'bork börk! Ut enim ad minim veniam, letsi ifder svensk og latin ' +
    'makinen dehr graek. Ut enim ad minim veniam, letsi ifder svensk og ' +
    'latin makinen dehr graek. Nawei raitinen de wehbsyte. Ut enim ad minim ' +
    'veniam, letsi ifder svensk og latin makinen dehr graek. Ut enim ad ' +
    'minim veniam, letsi ifder svensk og latin makinen dehr graek. ',
};

// ---------------------------------------------------------------------------

export const breadCrumbTrail = [
  { href: '', label: 'Forsíða' },
  { href: '', label: 'Fundargerðir nefnda og ráða' },
  { href: undefined, label: 'Sparse unlinked/static item' },
  { href: '', label: 'Mannréttindaráð' },
];

// ---------------------------------------------------------------------------

type BProps = { on: boolean; children: ReactNode };
const B = ({ on, children }: BProps) => {
  const Tag = on ? 'strong' : Fragment;
  return <Tag>{children}</Tag>;
};

export const loremRT = {
  tiny: (bold = false) => (
    <Fragment>
      Leebur deroor iehroom, <a href="/">bork bork börk</a>! Enim ad{' '}
      <B on={bold}>minim chokolat moose</B>.{' '}
    </Fragment>
  ),
  short: (bold = false) => (
    <Fragment>
      Yöva gäta <a href="/">stahrt sömwaer</a>. Ut enim ad minim venäm,{' '}
      <B on={bold}>letsi börk ifder</B> svensk og latin makinen dehr graek.{' '}
    </Fragment>
  ),
  medium: (bold = false) => (
    <Fragment>
      Vender gests kämmen <a href="/">vewänthärdis wehrdsen</a> onderpasje moose. Ut enim
      ad minim veniam, letsi ifder <B on={bold}>svensk og latin</B> makinen dehr graek.
      Yöva gäta <a href="/">stahrt</a> sömwaer. Nawei raitinen de wehbsyte.
    </Fragment>
  ),
  long: (bold = false) => (
    <Fragment>
      Lörem ipsum <B on={bold}>dolor sit amet</B>, dedeeshka duu.{' '}
      <a href="/">Leebur deroor</a> iehroom, bork bork börk! Ut enim ad minim veniam,
      letsi ifder svensk og latin makinen dehr graek. Ut enim ad minim veniam, letsi ifder
      svensk og latin makinen dehr graek. Nawei raitinen de wehbsyte.{' '}
      <a href="/">Ut enim ad minim</a> veniam, letsi ifder svensk og latin makinen dehr
      graek. Ut enim ad minim veniam, letsi ifder svensk og latin makinen dehr graek.{' '}
    </Fragment>
  ),
};

export const efnistakn = [
  'bygging_01',
  'download_01',
  'dyrahald_01',
  'ferdalag_01',
  'tonlist_01',
  'tonlist_02',
  'tonlist_03',
] as const;
export type Efnistakn = typeof efnistakn[number];

import React from 'react';
import range from '@hugsmidjan/qj/range';
import { BreadCrumbTrail } from '@reykjavik/hanna-react/BreadCrumbs';
import { ButtonTertiaryProps } from '@reykjavik/hanna-react/ButtonTertiary';
import { ImageCardsItemProps } from '@reykjavik/hanna-react/ImageCards';
import {
  AuxiliaryPanelProps,
  MainMenuItemList,
  MegaMenuItem,
  MegaMenuPanel,
} from '@reykjavik/hanna-react/MainMenu';

import dummyImage from '../example_assets/ImageCard__image.jpg';

export const crumbTrail: BreadCrumbTrail = [
  { href: '', label: 'Forsíða' },
  { href: '', label: 'Stjórnkerfi' },
  { href: '', label: 'Fundargerðir' },
  { href: '', label: 'Mannréttindaráð' },
];

export const someButtons: Array<ButtonTertiaryProps> = [
  { href: '', label: 'Dagskrá næsta fundar' },
  { href: '', label: 'Stjórnkerfi' },
  { href: '', label: 'Nánari upplýsingar' },
  { onClick: () => alert('Hi!'), label: 'Button is ok!' },
];

export const mainMenuItems: MainMenuItemList = [
  // // Optional - as a default "Home" link is automatically inserted
  // {
  //   label: 'Forsíða',
  //   href: '/',
  //   modifier: 'home',
  // },
  {
    label: 'Íbúar',
    href: '#MegaMenu:Íbúar',
    current: true,
  },
  {
    label: 'Stjórnkerfið',
    href: '#MegaMenu:Stjórnkerfið',
  },
  {
    label: 'Mannlíf',
    href: '#MegaMenu:Mannlíf',
  },
  '---',
  {
    label: 'EN',
    labelLong: 'English',
    lang: 'en',
    href: '/en',
    modifier: 'lang',
  },
  {
    label: 'PL',
    labelLong: 'Polski',
    lang: 'pl',
    href: '/pl',
    modifier: 'lang',
  },
  {
    label: 'Mínar síður',
    href: '',
    modifier: 'mypages',
  },
  {
    label: 'Leita',
    labelLong: 'Leita á vefnum',
    href: '',
    modifier: 'search',
  },
];

const createPanelItems = (title: string, length: number, current?: number) => ({
  title,
  id: 'MegaMenu:' + title,
  items: Array.from({ length }).map(
    (_, i): MegaMenuItem => ({
      label: title + ' item ' + (i + 1),
      href: '',
      current: current === i || undefined,
      summary:
        ['Lorem impsum dolor sit', 'dolore amet', 'foo bleargh.']
          .slice(0, Math.floor(4 * Math.random()))
          .join(' ') || undefined,
    })
  ),
});

export const megaMenuPanels: Array<MegaMenuPanel> = [
  createPanelItems('Íbúar', 8, 2),
  createPanelItems('Stjórnkerfið', 2),
  createPanelItems('Mannlíf', 4),
];

export const auxiliaryPanel: AuxiliaryPanelProps = {
  ...createPanelItems('Sérvefir', 5),
  image: 'hanna-veitiggi',
};

export const TITLE_SHORT = 'Block title';
export const TITLE_LONG = 'Block title lorem ipsum dolor sit ament foobar';
export const TITLE_MEDIUM = 'Tré ársins er rauðgreni í Elliðaárhólma';
export const SUMMARY_BITS = [
  'Block summary text ',
  'lorem ipsum dolor',
  ' sit ament foobar. Blah blah blah.',
];

export const imageCards = range(0, 9).map(
  (i): ImageCardsItemProps => ({
    title: [TITLE_SHORT, TITLE_LONG, TITLE_MEDIUM][i % 3]!,
    href: '',
    image: i === 4 || i === 6 ? undefined : { src: dummyImage, altText: '' },
    meta: '14. október',
    summary: (i - 2) % 7 === 0 ? 'Sum summary may go here also.' : undefined,
  })
);

export const getSummary = (
  type: 'html' | 'text' | undefined,
  Tag: 'a' | 'strong' = 'a'
) =>
  type === 'html' ? (
    <p>
      {SUMMARY_BITS[0]}
      {Tag === 'a' ? <a href="">{SUMMARY_BITS[1]}</a> : <Tag>{SUMMARY_BITS[1]}</Tag>}
      {SUMMARY_BITS[2]} {SUMMARY_BITS[2]}
    </p>
  ) : type === 'text' ? (
    SUMMARY_BITS.join()
  ) : undefined;

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

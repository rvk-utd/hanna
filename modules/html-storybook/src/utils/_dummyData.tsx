import React from 'react';
import range from '@hugsmidjan/qj/range';
import { BreadCrumbTrail } from '@reykjavik/hanna-react/BreadCrumbs';
import { ButtonTertiaryProps } from '@reykjavik/hanna-react/ButtonTertiary';
import { ImageCardsItemProps } from '@reykjavik/hanna-react/ImageCards';
import {
  AuxiliaryPanelProps,
  MainMenuItem,
  MainMenuSeparator,
  MegaMenuItem,
  MegaMenuPanel,
} from '@reykjavik/hanna-react/MainMenu';
import {
  MainMenu2Props,
  MainMenu2SubMenu,
  MainMenu2SubMenuItem,
} from '@reykjavik/hanna-react/MainMenu2';
import { getStableRandomItem } from '@reykjavik/hanna-utils';

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

export const mainMenuItems: Array<MainMenuItem | MainMenuSeparator> = [
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
  {
    label: 'Button',
    onClick: () => alert('Hi!'),
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
    href: 'https://minarsidur.reykjavik.is',
    modifier: 'mypages',
  },
  {
    label: 'Leita',
    labelLong: 'Leita á vefnum',
    href: '',
    modifier: 'search',
  },
];

export const mainMenuItemsSimple: typeof mainMenuItems = mainMenuItems.map((item) =>
  typeof item === 'object'
    ? { ...item, href: item.href?.replace(/^#MegaMenu:/, '/') }
    : item
);

const createPanelItems = (title: string, length: number, current?: number) => ({
  title,
  id: `MegaMenu:${title}`,
  items: Array.from({ length }).map(
    (_, i): MegaMenuItem => ({
      label: `${title} item ${i + 1}`,
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

// ---------------------------------------------------------------------------

const createMM2PanelItems = (
  title: string,
  length: number,
  current?: number
): MainMenu2SubMenu => ({
  title,
  subItems: Array.from({ length }).map(
    (_, i): MainMenu2SubMenuItem => ({
      label: `${title + (i === 2 ? ' lorem impsum dolor sit' : '')} item ${i + 1}`,
      href: '',
      current: current === i || undefined,
      descr: getStableRandomItem(
        [
          'Lorem impsum dolor sit dolore amet',
          'Enim ad minim impsum sita met fööt dolore bleargh.',
          'Leebur deroor iehroom, bork bork bork! Enim ad minim chokolat moose flüü.',
          undefined,
          undefined,
        ],
        i * 11 + title.slice(0, 1)
      ),
    })
  ),
});
export const mainMenu2Items = (
  menuConent?: 'full-blown' | 'only-main' | 'only-related'
): MainMenu2Props['items'] => {
  const showMain = menuConent !== 'only-related' || undefined;
  const showRelated = menuConent !== 'only-main' || undefined;
  return {
    main: showMain && [
      createMM2PanelItems('Íbúar', 8, 2),
      createMM2PanelItems('Stjórnkerfi', 5),
      createMM2PanelItems('Atvinnulíf', 4),
      { label: 'Hverfið mitt', href: '', target: '_blank', current: false },
    ],
    hot: [
      {
        label: 'EN',
        labelLong: 'English',
        href: '',
        icon: 'globe',
        lang: 'en',
        hrefLang: 'en',
      },
      { label: 'Mínar síður', href: '', icon: 'user', target: '_blank' },
    ],
    extra: [
      { label: 'Leita', labelLong: 'Leita á vefnum', href: '', icon: 'search' },
      { label: 'Tilkynningar', href: '', icon: 'notifications' },
    ],
    relatedTitle: 'Sérvefir',
    related: showRelated && [
      { label: 'Græna planið', href: '', target: '_blank' },
      { label: 'Gagnahlaðborðið', href: '', target: '_blank' },
      { label: 'Borgarbókasafnið', href: '', target: '_blank' },
      { label: 'Borgin okkar', href: '', target: '_blank' },
      { label: 'Borgarsögusafn Reykjavíkur ', href: '', target: '_blank' },
      { label: 'Frístundavefurinn', href: '', target: '_blank' },
      { label: 'Listasafn Reykjavíkur', href: '', target: '_blank' },
    ],
  };
};

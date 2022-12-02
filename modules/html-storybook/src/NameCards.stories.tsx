import React from 'react';
import { NameCardProps } from '@reykjavik/hanna-react/NameCard';
import { NameCards } from '@reykjavik/hanna-react/NameCards';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'NameCards',
  parameters: {
    knobs: {
      disabled: true,
      theming: true,
    },
  } as StoryParameters,
};

const items: Array<NameCardProps> = [
  {
    name: 'George Clooney',
    contactInfo: [{ href: 'tel:+3545674321', label: '567-4321' }],
    location: 'Breiðstræti 4, 107',
    hours: 'Vinnutími: 08:00 - 20:00',

    updated: '22.02.2020',
    available: true,
  },
  {
    name: 'Jón Jónsson',
    contactInfo: [{ href: 'tel:+3549876543', label: '987-6543' }],
    location: 'Vegamót 18, \n\n107 Reykjavík',
  },
  {
    name: 'Hanna Hönnudóttir',
    contactInfo: [
      { href: 'tel:+3545674321', label: '567 4321' },
      { href: 'tel:+3549876543', label: '987 6543' },
    ],
    location: 'Fjöruborð 6, 101',
    hours: 'Vinnutími: 08:00 - 14:00 \n\n(extra text info)',
    available: false,
  },
  {
    name: 'Jóna Jónsdóttir og James Bond',
    contactInfo: [
      { label: '007@spy.com', href: 'mailto:007@spy.com' },
      { href: 'tel:+3548765432', label: '876-5432' },
      { href: 'tel:+4407007007007', label: '+44 0700 700-7007' },
    ],
    location: 'Skeljagrandi 7,\n 107 Reykjavík',
    hours: 'Vinnutími: 08:00 - 14:00',
    aboutText:
      'Yöva gäta stahrt sömwaer. Ut enim ad minim veniam, letsi Björk ifder svensk og latin makinen dehr graek.',
    updated: '22.02.2020',
  },
];

export const _NameCards: StoryComponent = () => <NameCards items={items} />;

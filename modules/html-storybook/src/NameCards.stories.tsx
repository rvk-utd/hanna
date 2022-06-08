import React from 'react';
import { NameCardProps } from '@reykjavik/hanna-react/NameCard';
import NameCards from '@reykjavik/hanna-react/NameCards';

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
    name: 'Anna Barbara Idzik',
    contactInfo: [{ href: 'tel:+3546903653', label: '690-3653' }],
    location: 'Skeljagrandi 7, 107',
    hours: 'Vinnutími: 08:00 - 14:00',

    updated: '22.02.2020',
    available: true,
  },
  {
    name: 'Jerzy Edward Brys',
    contactInfo: [{ href: 'tel:+3546903653', label: '690-3653' }],
    location: 'Skeljagrandi 7, \n\n107 Reykjavík',
  },
  {
    name: 'Anna Barbara Idzik',
    contactInfo: [
      { href: 'tel:+3546903653', label: '690 3653' },
      { href: 'tel:+3547700227', label: '770 0227' },
    ],
    location: 'Skeljagrandi 7, 107',
    hours: 'Vinnutími: 08:00 - 14:00 \n\n(except on the first Wednesday of the month)',
    available: false,
  },
  {
    name: 'Álfhildur S. Jóhannsdóttir og Jón Jónsson',
    contactInfo: [
      { label: 'aogj@gmail.com', href: 'mailto:aogj@gmail.com' },
      { href: 'tel:+3546903653', label: '690-3653' },
      { href: 'tel:+3546903654', label: '690-3654' },
    ],
    location: 'Skeljagrandi 7,\n 107 Reykjavík',
    hours: 'Vinnutími: 08:00 - 14:00',
    aboutText: 'Eina 100% vegan daggæslan á stór-Skerjafjarðarsvæðinu.',
    updated: new Date(),
  },
];

export const _NameCards: StoryComponent = () => <NameCards items={items} />;

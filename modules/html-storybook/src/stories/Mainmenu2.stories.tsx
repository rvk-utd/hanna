import React from 'react';
import {
  MainMenu2,
  MainMenu2SubMenu,
  MainMenu2SubMenuItem,
} from '@reykjavik/hanna-react/MainMenu2';
import { getStableRandomItem } from '@reykjavik/hanna-utils';
import { Meta, StoryObj } from '@storybook/react';

const createPanelItems = (
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

// ---------------------------------------------------------------------------

type ControlProps = {
  ssr: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Layout/MainMenu2',
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: {
      head: true,
      pos: 'nav',
    },
  },
};
export default meta;

export const _MainMenu2: StoryObj<ControlProps> = {
  render: (args) => (
    <MainMenu2
      key={`${args.ssr}`}
      ssr={args.ssr ? 'ssr-only' : true}
      items={{
        main: [
          createPanelItems('Íbúar', 8, 2),
          createPanelItems('Stjórnkerfi', 5),
          createPanelItems('Atvinnulíf', 4),
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
          { label: 'Tilkynningar', href: '', icon: 'alert' },
        ],
        relatedTitle: 'Sérvefir',
        related: [
          { label: 'Græna planið', href: '', target: '_blank' },
          { label: 'Gagnahlaðborðið', href: '', target: '_blank' },
          { label: 'Borgarbókasafnið', href: '', target: '_blank' },
          { label: 'Borgin okkar', href: '', target: '_blank' },
          { label: 'Borgarsögusafn Reykjavíkur ', href: '', target: '_blank' },
          { label: 'Frístundavefurinn', href: '', target: '_blank' },
          { label: 'Listasafn Reykjavíkur', href: '', target: '_blank' },
        ],
      }}
      illustration="bekkur"
    />
  ),
  argTypes: {
    ssr: { name: 'Server-side Markup' },
  },
  args: {
    ssr: false,
  },
};

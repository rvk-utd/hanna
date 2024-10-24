import React from 'react';
import { MainMenu2 } from '@reykjavik/hanna-react/MainMenu2';
import { Meta, StoryObj } from '@storybook/react';

import { mainMenu2Items } from '../utils/_dummyData.js';

const contentOptions = ['full-blown', 'only-main', 'only-related'] as const;

type ControlProps = {
  ssr: boolean;
  lightVariant: boolean;
  menuContent: (typeof contentOptions)[number];
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
  render: (args) => {
    return (
      <MainMenu2
        key={`${args.ssr}`}
        variant={args.lightVariant ? 'light' : undefined}
        ssr={args.ssr ? 'ssr-only' : true}
        items={mainMenu2Items(args.menuContent)}
        illustration="bekkur"
      />
    );
  },
  argTypes: {
    menuContent: {
      name: 'Menu content',
      options: contentOptions,
      control: {
        type: 'inline-radio',
        labels: {
          'full-blown': 'Fully populated menu',
          'only-main': 'Main items only',
          'only-related': "'Related' items only",
        } satisfies Record<ControlProps['menuContent'], string>,
      },
    },
    ssr: { name: 'Server-side Markup' },
    lightVariant: { name: 'Light-colored variant (experimental)' },
  },
  args: {
    menuContent: 'full-blown',
    ssr: false,
    lightVariant: false,
  },
};

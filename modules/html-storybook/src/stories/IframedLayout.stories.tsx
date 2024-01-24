import React from 'react';
import { IframedLayout } from '@reykjavik/hanna-react/IframedLayout';
import { Meta, StoryObj } from '@storybook/react';

import { hannaVars } from '../../../hanna-css/src/lib/hannavars.js';
import { HiddenTiger } from '../utils/HiddenTiger.js';
import { themeArgTypes, ThemeControlProps } from '../utils/knobs.js';

const meta: Meta = {
  title: 'IframedLayout',
  parameters: {
    layout: { disabled: true },
    css: { noLayout: true },
  },
};
export default meta;

// ==================== IframedLayout With Content ===========================================

type IframedLayoutControlProps = {
  globalAlerts: boolean;
} & ThemeControlProps;

export const _IframedLayout: StoryObj<IframedLayoutControlProps> = {
  render: (args) => {
    const key = `${args.theme}`;
    return (
      <IframedLayout key={key} colorTheme={args.theme}>
        <p>...Main Content Components...</p>
        <HiddenTiger>
          <div
            style={{
              margin: `${hannaVars.space_3} 0`,
              display: 'flex',
              flexFlow: 'row wrap',
              gap: `${hannaVars.space_2}`,
            }}
          >
            <div
              style={{
                width: '16rem',
                height: '3rem',
                backgroundColor: `${hannaVars.theme_color_primary}`,
              }}
            />
            <div
              style={{
                width: '8rem',
                height: '3rem',
                backgroundColor: `${hannaVars.theme_color_secondary}`,
              }}
            />
            <div
              style={{
                width: '4rem',
                height: '3rem',
                backgroundColor: `${hannaVars.theme_color_tertiary}`,
              }}
            />
          </div>
          <p>...Some more Content...</p>
        </HiddenTiger>
      </IframedLayout>
    );
  },
  argTypes: {
    ...themeArgTypes,
  },
  args: {},
  parameters: {
    // css: { tokens: 'IframedLayout' },
  },
};

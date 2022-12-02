import React from 'react';
import Bling, { BlingProps as _BlingProps } from '@reykjavik/hanna-react/Bling';
import { blingTypes, getBlingUrl } from '@reykjavik/hanna-utils/assets';
import { boolean, optionsKnob, select } from '@storybook/addon-knobs';

import { HiddenTiger } from './utils/HiddenTiger';
import { StoryComponent, StoryParameters } from './storytypes';

type BlingProps = Required<_BlingProps>;

// ===========================================================================

export default {
  title: 'Bling',
  parameters: {
    knobs: {
      disabled: false,
      // theming: true,
    },
    layout: { theme: 'colorful' },
  } as StoryParameters,
};

const Spacer = () => (
  <HiddenTiger
    style={{
      height: '47vh',
      background: 'rgba(222, 222, 222, .2)',
      borderTop: '1px dashed rgba(0,0,0,.15)',
    }}
  >
    <div
      style={{
        height: '100%',
        width: '50%',
        borderRight: '1px dashed rgba(0,0,0,.15)',
      }}
    />
  </HiddenTiger>
);

const customOption = '- Custom SVG URL -';
const blingOptions = [...blingTypes, customOption] as const;

export const _Bling: StoryComponent = () => {
  const type = select<BlingProps['type'] | typeof customOption>(
    'Bling Type',
    blingOptions,
    blingTypes[0]
  );

  const align = optionsKnob<BlingProps['align']>(
    'Alignment',
    {
      left: 'left',
      'left-ish': 'left-ish',
      'left-center': 'left-center',
      'right-center': 'right-center',
      'right-ish': 'right-ish',
      right: 'right',
    },
    'left',
    { display: 'inline-radio' }
  );

  const vertical =
    optionsKnob<'' | BlingProps['vertical']>(
      'Vertical align',
      {
        up: 'up',
        'up-ish': 'up-ish',
        'center (default)': '',
        'down-ish': 'down-ish',
        down: 'down',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const color =
    optionsKnob<'' | BlingProps['color']>(
      'Color variant',
      { 'Default (tertiary)': '', Secondary: 'secondary', Primary: 'primary' },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const overlay = boolean('Place in front of other content', false);

  const parent =
    optionsKnob<'' | BlingProps['parent']>(
      'Insertion point',
      {
        'Default (inline)': '',
        top: 'top',
        'top-ish': 'top-ish',
        center: 'center',
        'bottom-ish': 'bottom-ish',
        bottom: 'bottom',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const typeProps =
    type === customOption ? { blingUrl: getBlingUrl(blingTypes[2]) } : { type };

  return (
    <HiddenTiger
      key={type + align + vertical + color + overlay + parent}
      style={{ position: 'relative' }}
      serverSide={
        <Bling
          {...typeProps}
          align={align}
          vertical={vertical}
          color={color}
          overlay={overlay}
          parent={parent}
        />
      }
    >
      <Spacer />
      {'\n\n\n'}

      <Bling
        {...typeProps}
        align={align}
        vertical={vertical}
        color={color}
        overlay={overlay}
        parent={parent}
      />

      {'\n\n\n'}
      <Spacer />
    </HiddenTiger>
  );
};

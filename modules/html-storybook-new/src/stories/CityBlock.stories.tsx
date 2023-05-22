import React from 'react';
import { CityBlock } from '@reykjavik/hanna-react/CityBlock';
import { illustrations } from '@reykjavik/hanna-utils/assets';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import imageLarge from '../example_assets/CityBlock__image--large.jpg';
import imageSmall from '../example_assets/CityBlock__image--small.jpg';
import { getSummary, someButtons, TITLE_LONG } from '../utils/_dummyData.js';

const meta: Meta<typeof CityBlock> = {
  title: 'components/CityBlock',
  component: CityBlock,
};
export default meta;

type Story = StoryObj<typeof CityBlock>;

const IMAGES = {
  '': { illustration: illustrations[5] },
  largebox: { image: { src: imageSmall, altText: 'Alt text!' } },
  largeimage: { image: { src: imageLarge, altText: 'Alt text!' } },
};

const Component = () => {
  const type =
    optionsKnob(
      'Type',
      { Normal: '', Largebox: 'largebox', 'Large Image': 'largeimage' },
      '',
      { display: 'inline-radio' }
    ) || undefined;
  const align = optionsKnob('Layout', { Left: 'left', Right: 'right' }, 'right', {
    display: 'inline-radio',
  });
  const numButtons = parseInt(
    optionsKnob('Links', { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4' }, '2', {
      display: 'inline-radio',
    })
  );
  return (
    <CityBlock
      type={type}
      align={align}
      content={{
        title: TITLE_LONG,
        summary: boolean('Summary text', true) ? getSummary('html', 'strong') : undefined,
        buttons: someButtons.slice(0, numButtons),
      }}
      {...IMAGES[type || '']}
      startSeen
    />
  );
};

export const _CityBlock: Story = {
  render: () => <Component />,
};

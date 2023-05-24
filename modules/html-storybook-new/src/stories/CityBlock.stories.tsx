import React, { Fragment } from 'react';
import { CityBlock, CityBlockProps } from '@reykjavik/hanna-react/CityBlock';
import { illustrations } from '@reykjavik/hanna-utils/assets';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import imageLarge from '../example_assets/CityBlock__image--large.jpg';
import imageSmall from '../example_assets/CityBlock__image--small.jpg';
import { getSummary, someButtons, TITLE_LONG, TITLE_SHORT } from '../utils/_dummyData.js';

const meta: Meta<typeof CityBlock> = {
  title: 'CityBlock',
  component: CityBlock,
};
export default meta;

type Story = StoryObj<typeof CityBlock>;

const IMAGES = {
  '': { illustration: illustrations[5] },
  largebox: { image: { src: imageSmall, altText: 'Alt text!' } },
  largeimage: { image: { src: imageLarge, altText: 'Alt text!' } },
};

const CityBlockomponent = () => {
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

const testCombos = (['largeimage', undefined, 'largebox'] as const).reduce<
  // const testCombos = ([undefined, 'largebox', 'largeimage'] as const).reduce<
  Array<CityBlockProps>
>((list, type) => {
  (['right', 'left'] as const).forEach((align) => {
    const c = list.length + 1;
    const summaryType = c % 3 ? 'html' : c % 2 ? 'text' : undefined;
    list.push({
      align,
      type,
      content: {
        title: c % 2 ? TITLE_LONG : TITLE_SHORT,
        summary: getSummary(summaryType),
        buttons: someButtons.slice(0, 1 + ((c + 2) % 3)),
      },
      ...IMAGES[type || ''],
    });
  });
  return list;
}, []);

const CityBlockExamplesComponent = () => {
  return (
    <>
      {' '}
      {testCombos.map((props, i) => (
        <Fragment key={i}>
          <CityBlock {...props} startSeen />
          {'\n\n'}
        </Fragment>
      ))}
    </>
  );
};

export const _CityBlock: Story = {
  render: () => <CityBlockomponent />,
};

export const _CityBlockExamples: Story = {
  render: () => <CityBlockExamplesComponent />,
  parameters: {
    css: {
      tokens: 'CityBlock',
    },
  },
};

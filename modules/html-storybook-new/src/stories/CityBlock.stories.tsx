import React, { Fragment } from 'react';
import { CityBlock, CityBlockProps } from '@reykjavik/hanna-react/CityBlock';
import { illustrations } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import imageLarge from '../example_assets/CityBlock__image--large.jpg';
import imageSmall from '../example_assets/CityBlock__image--small.jpg';
import { getSummary, someButtons, TITLE_LONG, TITLE_SHORT } from '../utils/_dummyData.js';

const blockTypeOptions = ['normal', 'largebox', 'largeimage'] as const;
type Blocktype = (typeof blockTypeOptions)[number];

const alignOptions = ['left', 'right'] as const;
type Align = (typeof alignOptions)[number];

const linksOptions = [0, 1, 2, 3, 4] as const;
type Links = (typeof linksOptions)[number];

type ControlProps = {
  blocktype: Blocktype;
  align: Align;
  links: Links;
  summaryText: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'CityBlock',
  parameters: {
    controls: { hideNoControlsWarning: true },
    css: { tokens: 'CityBlock' },
  },
};
export default meta;

const IMAGES = {
  '': { illustration: illustrations[5] },
  largebox: { image: { src: imageSmall, altText: 'Alt text!' } },
  largeimage: { image: { src: imageLarge, altText: 'Alt text!' } },
};

const CityBlockStory: React.FC<ControlProps> = ({
  blocktype,
  align,
  links,
  summaryText,
}) => {
  const type = blocktype !== 'normal' ? blocktype : undefined;

  return (
    <CityBlock
      type={type}
      align={align}
      content={{
        title: TITLE_LONG,
        summary: summaryText ? getSummary('html', 'strong') : undefined,
        buttons: someButtons.slice(0, links),
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

const CityBlockExamplesStory = () => {
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

export const _CityBlock: StoryObj<ControlProps> = {
  render: (args) => <CityBlockStory {...args} />,
  argTypes: {
    blocktype: {
      name: 'Type',
      options: blockTypeOptions,
      control: 'inline-radio',
    },
    align: {
      name: 'Layout',
      options: alignOptions,
      control: 'inline-radio',
    },
    links: {
      name: 'Links',
      options: linksOptions,
      control: 'inline-radio',
    },
    summaryText: { name: 'Summary text' },
  },
  args: {
    blocktype: 'normal',
    align: 'right',
    links: 2,
    summaryText: true,
  },
};

export const _CityBlockExamples: StoryObj<ControlProps> = {
  render: () => <CityBlockExamplesStory />,
};

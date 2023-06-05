import React, { Fragment } from 'react';
import { CityBlock, CityBlockProps } from '@reykjavik/hanna-react/CityBlock';
import { illustrations } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import imageLarge from '../example_assets/CityBlock__image--large.jpg';
import imageSmall from '../example_assets/CityBlock__image--small.jpg';
import { getSummary, someButtons, TITLE_LONG, TITLE_SHORT } from '../utils/_dummyData.js';
import { disableControlProps } from '../utils/disableControlTypes.js';

type CityBlockControlProps = {
  blocktype: 'normal' | 'largebox' | 'largeimage';
  links: 0 | 1 | 2 | 3 | 4;
  summaryText: boolean;
};

type CityBlockStoryProps = CityBlockProps & CityBlockControlProps;

const meta: Meta<CityBlockStoryProps> = {
  title: 'CityBlock',
  component: CityBlock,
};
export default meta;

type Story = StoryObj<CityBlockStoryProps>;

const IMAGES = {
  '': { illustration: illustrations[5] },
  largebox: { image: { src: imageSmall, altText: 'Alt text!' } },
  largeimage: { image: { src: imageLarge, altText: 'Alt text!' } },
};

const CityBlockStory: React.FC<CityBlockStoryProps> = ({
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

const CityBlockExamplesStory: React.FC<CityBlockStoryProps> = ({ blocktype }) => {
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
  render: (args: CityBlockStoryProps) => <CityBlockStory {...args} />,
  argTypes: {
    blocktype: {
      control: 'inline-radio',
      options: ['normal', 'largebox', 'largeimage'],
      name: 'Type',
    },
    align: {
      control: 'inline-radio',
      options: ['left', 'right'],
      name: 'Layout',
    },
    links: {
      control: 'inline-radio',
      options: [0, 1, 2, 3, 4],
      name: 'Links',
    },
    summaryText: {
      control: 'boolean',
      name: 'Summary text',
    },
    ...disableControlProps(['type', 'content', 'illustration', 'image', 'startSeen']),
  },
  args: {
    blocktype: 'normal',
    align: 'right',
    links: 2,
    summaryText: true,
  },
};

export const _CityBlockExamples: Story = {
  render: (args: CityBlockStoryProps) => <CityBlockExamplesStory {...args} />,
  argTypes: {
    ...disableControlProps([
      'align',
      'type',
      'content',
      'illustration',
      'image',
      'startSeen',
    ]),
  },
  parameters: {
    css: {
      tokens: 'CityBlock',
    },
  },
};

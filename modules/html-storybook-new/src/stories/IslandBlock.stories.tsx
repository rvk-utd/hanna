import React from 'react';
import { colorThemes, HannaColorTheme } from '@reykjavik/hanna-css';
import { IslandBlock, IslandBlockProps } from '@reykjavik/hanna-react/IslandBlock';
import { formheimur } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { getSummary, someButtons, TITLE_LONG, TITLE_SHORT } from '../utils/_dummyData.js';

type IslandBlockControlProps = {
  theme: string;
  type: 'svg-asset' | 'textonly';
  layout: 'left' | 'right';
  summaryText: boolean;
  links: 0 | 1 | 2 | 3;
};

const colorThemeKeys = Object.keys(colorThemes) as Array<HannaColorTheme>;
const themeOptions = Object.values(colorThemes).concat(colorThemeKeys);

const meta: Meta<IslandBlockControlProps> = {
  title: 'IslandBlock',
};
export default meta;

type Story = StoryObj<IslandBlockControlProps>;

const IslandBlockStory: React.FC<IslandBlockControlProps> = ({
  type,
  summaryText,
  links,
  layout,
}) => {
  const align = layout;
  const summary = summaryText || undefined;
  const numButtons = links;
  const content = {
    title: TITLE_LONG,
    summary: summary && getSummary('html', 'strong'),
    buttons: someButtons.slice(0, numButtons),
  };

  const contentProps =
    type === 'textonly'
      ? { content: [content, { ...content, title: TITLE_SHORT + ' 2' }] }
      : { content, shapes: /* shapeImage ||  */ formheimur[3] };
  return <IslandBlock align={align} {...contentProps} startSeen />;
};

export const _IslandBlock: Story = {
  render: (args: IslandBlockControlProps) => <IslandBlockStory {...args} />,
  argTypes: {
    theme: {
      control: 'select',
      options: themeOptions,
      name: 'Theme',
    },
    type: {
      control: {
        type: 'inline-radio',
        labels: {
          'svg-asset': 'Fornheimur SVG image',
          textonly: 'Two text boxes',
        },
      },
      options: ['svg-asset', 'textonly'],
      name: 'Type',
    },
    layout: {
      control: {
        type: 'inline-radio',
        labels: {
          left: 'Left',
          right: 'Right',
        },
      },
      options: ['left', 'right'],
      name: 'Layout',
    },
    summaryText: {
      control: 'boolean',
      name: 'Summary text',
    },
    links: {
      control: 'inline-radio',
      options: [0, 1, 2, 3],
      name: 'Links',
    },
  },
  args: {
    type: 'svg-asset',
    layout: 'right',
    summaryText: true,
    links: 2,
  },
};

// ===========================================================================

const getSummaryType = (c: number) => (c % 3 ? 'html' : c % 2 ? 'text' : undefined);

const testCombos = (['svg-asset', 'textonly'] as const).reduce<Array<IslandBlockProps>>(
  (list, type) => {
    (['right', 'left'] as const).forEach((align) => {
      const c = 2 * list.length + 1;

      const content = {
        title: TITLE_LONG,
        summary: getSummary(getSummaryType(c), 'a'),
        buttons: someButtons.slice(0, 1 + ((c + 2) % 3)),
      };

      if (type === 'textonly') {
        const content2 = {
          title: TITLE_SHORT + ' 2',
          summary: getSummary(getSummaryType(c + 1), 'strong'),
          buttons: someButtons.slice(0, 1 + ((c + 3) % 3)),
        };

        list.push({
          align,
          content: [content, content2],
        });
      } else {
        list.push({
          align,
          content,
          shapes: formheimur[3],
        });
      }
    });
    return list;
  },
  []
);

// ===========================================================================

const IslandBlockExamplesStory = () => {
  return (
    <>
      {' '}
      {testCombos.map((props, i) => (
        <React.Fragment key={i}>
          <IslandBlock {...props} startSeen />
          {'\n\n'}
        </React.Fragment>
      ))}
    </>
  );
};

export const _IslandBlock_Examples: Story = {
  render: () => <IslandBlockExamplesStory />,
  parameters: {
    css: {
      tokens: 'IslandBlock',
    },
  },
};

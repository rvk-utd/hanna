import React from 'react';
import { colorThemes, HannaColorTheme } from '@reykjavik/hanna-css';
import { IslandBlock, IslandBlockProps } from '@reykjavik/hanna-react/IslandBlock';
import { formheimur } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { getSummary, someButtons, TITLE_LONG, TITLE_SHORT } from '../utils/_dummyData.js';

const colorThemeKeys = Object.keys(colorThemes) as Array<HannaColorTheme>;
const themeOptions = Object.values(colorThemes).concat(colorThemeKeys);

const typeOptions = ['svg-asset', 'textonly'] as const;
type Type = (typeof typeOptions)[number];

const layoutOptions = ['left', 'right'] as const;
type Layout = (typeof layoutOptions)[number];

const linksOptions = [0, 1, 2, 3] as const;
type Links = (typeof linksOptions)[number];

type ControlProps = {
  theme: HannaColorTheme;
  type: Type;
  layout: Layout;
  summaryText: boolean;
  links: Links;
};

const meta: Meta<ControlProps> = {
  title: 'IslandBlock',
};
export default meta;

type Story = StoryObj<ControlProps>;

// TODO: connect theme property
const IslandBlockStory: React.FC<ControlProps> = ({
  theme,
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
  render: (args: ControlProps) => <IslandBlockStory {...args} />,
  argTypes: {
    theme: {
      control: 'select',
      // TODO: Connect themeoptions
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
      options: typeOptions,
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
      options: layoutOptions,
      name: 'Layout',
    },
    summaryText: {
      control: 'boolean',
      name: 'Summary text',
    },
    links: {
      control: 'inline-radio',
      options: linksOptions,
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
    controls: { hideNoControlsWarning: true },
    css: {
      tokens: 'IslandBlock',
    },
  },
};

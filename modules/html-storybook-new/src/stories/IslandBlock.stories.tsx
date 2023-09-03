import React from 'react';
import { IslandBlock, IslandBlockProps } from '@reykjavik/hanna-react/IslandBlock';
import { formheimur } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { getSummary, someButtons, TITLE_LONG, TITLE_SHORT } from '../utils/_dummyData.js';
import { themeArgTypes, ThemeControlProps } from '../utils/knobs.js';

// =================== IslandBlock ========================================

const typeOptions = ['svg-asset', 'textonly'] as const;
const layoutOptions = ['left', 'right'] as const;
const linksOptions = [0, 1, 2, 3] as const;

type ControlProps = {
  type: (typeof typeOptions)[number];
  layout: (typeof layoutOptions)[number];
  summaryText: boolean;
  links: (typeof linksOptions)[number];
} & ThemeControlProps;

const meta: Meta<ControlProps> = {
  title: 'IslandBlock',
  parameters: {
    css: { tokens: 'IslandBlock' },
  },
};
export default meta;

const IslandBlockStory = (props: ControlProps) => {
  const align = props.layout;
  const summary = props.summaryText || undefined;
  const numButtons = props.links;
  const content = {
    title: TITLE_LONG,
    summary: summary && getSummary('html', 'strong'),
    buttons: someButtons.slice(0, numButtons),
  };

  const contentProps =
    props.type === 'textonly'
      ? { content: [content, { ...content, title: TITLE_SHORT + ' 2' }] }
      : { content, shapes: /* shapeImage ||  */ formheimur[3] };
  return <IslandBlock align={align} {...contentProps} startSeen />;
};

export const _IslandBlock: StoryObj<ControlProps> = {
  render: (args) => <IslandBlockStory {...args} />,
  argTypes: {
    type: {
      name: 'Type',
      options: typeOptions,
      control: {
        type: 'inline-radio',
        labels: {
          'svg-asset': 'Fornheimur SVG image',
          textonly: 'Two text boxes',
        } satisfies Record<ControlProps['type'], string>,
      },
    },
    layout: {
      name: 'Layout',
      options: layoutOptions,
      control: {
        type: 'inline-radio',
        labels: {
          left: 'Left',
          right: 'Right',
        } satisfies Record<ControlProps['layout'], string>,
      },
    },
    summaryText: { name: 'Summary text' },
    links: {
      name: 'Links',
      options: linksOptions,
      control: 'inline-radio',
    },
    ...themeArgTypes,
  },
  args: {
    type: 'svg-asset',
    layout: 'right',
    summaryText: true,
    links: 2,
  },
};

// =================== IslandBlockExamples ========================================

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

export const _IslandBlock_Examples: StoryObj<ControlProps> = {
  render: () => <IslandBlockExamplesStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

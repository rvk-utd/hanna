import React from 'react';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { Meta, StoryObj } from '@storybook/react';

const layoutOptions = ['left', 'wide', 'right', 'labelled'] as const;
type Layout = (typeof layoutOptions)[number];

type ControlProps = {
  layout: Layout;
  smallText: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'text/TextBlock',
};
export default meta;

const demoMarkup = () => {
  return (
    <>
      <h2>Testing a H2 headline</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus <a href="">Text link demo</a> in beatae distinctio cum!
      </p>
      <h3>Test h3 title</h3>
      <ul>
        <li>Test bullet 1</li>
        <li>
          Test bullet 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          dolores esse animi laboriosam!{' '}
        </li>
        <li>Test bullet 3</li>
      </ul>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo</p>
      <hr />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo</p>

      <h2>Testing a H2 headline</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo{' '}
        <a href="">text with line wrapping </a> quam voluptas necessitatibus in beatae
        distinctio cum!
      </p>
      <h4>Test h4 title</h4>
      <blockquote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus in beatae distinctio cum!
      </blockquote>
    </>
  );
};

const TextBlockStory: React.FC<ControlProps> = ({ layout, smallText }) => {
  const _layout = layout !== 'left' ? layout : '';

  const layoutProps =
    _layout === 'wide'
      ? { wide: true }
      : _layout === 'right'
      ? { align: _layout }
      : _layout === 'labelled'
      ? { labelled: true }
      : {};

  const small = smallText || undefined;
  return (
    <TextBlock key={_layout + small} {...layoutProps} small={small}>
      {demoMarkup()}
    </TextBlock>
  );
};

export const _TextBlock: StoryObj<ControlProps> = {
  render: (args) => <TextBlockStory {...args} />,
  argTypes: {
    layout: {
      name: 'Layout',
      options: layoutOptions,
      control: {
        type: 'inline-radio',
        labels: {
          left: 'Left',
          wide: 'Wide',
          right: 'Right aligned',
          labelled: 'Labelled (H2 headings)',
        } satisfies Record<Layout, string>,
      },
    },
    smallText: { name: 'Small text' },
  },
  args: {
    layout: 'left',
    smallText: false,
  },
};

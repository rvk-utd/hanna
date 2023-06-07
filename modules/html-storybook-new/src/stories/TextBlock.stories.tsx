import React from 'react';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { Meta, StoryObj } from '@storybook/react';

type PageHeadingControlProps = {
  layout: 'left' | 'wide' | 'right' | 'labelled';
  smallText: boolean;
};

type Story = StoryObj<PageHeadingControlProps>;

const meta: Meta<PageHeadingControlProps> = {
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

const TextBlockStory: React.FC<PageHeadingControlProps> = ({ layout, smallText }) => {
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
    <TextBlock key={_layout + small} {...layoutProps} small={small} startSeen>
      {demoMarkup()}
    </TextBlock>
  );
};

export const _TextBlock: Story = {
  render: (args: PageHeadingControlProps) => <TextBlockStory {...args} />,
  argTypes: {
    layout: {
      control: {
        type: 'inline-radio',
        labels: {
          left: 'Left',
          wide: 'Wide',
          right: 'Right aligned',
          labelled: 'Labelled (H2 headings)',
        },
      },
      options: ['left', 'wide', 'right', 'labelled'],
      name: 'Layout',
    },
    smallText: {
      control: 'boolean',
      name: 'Small text',
    },
  },
  args: {
    layout: 'left',
    smallText: false,
  },
};

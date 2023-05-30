import React from 'react';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextBlock> = {
  title: 'text/TextBlock',
  component: TextBlock,
};
export default meta;

type Story = StoryObj<typeof TextBlock>;

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

const TextBlockStory = () => {
  const layout = optionsKnob(
    'Layout',
    {
      Left: '',
      Wide: 'wide',
      'Right aligned': 'right',
      'Labelled (H2 headings)': 'labelled',
    },
    '',
    { display: 'inline-radio' }
  );

  const layoutProps =
    layout === 'wide'
      ? { wide: true }
      : layout === 'right'
      ? { align: layout }
      : layout === 'labelled'
      ? { labelled: true }
      : {};

  const small = boolean('Small text', false) || undefined;
  return (
    <TextBlock key={layout + small} {...layoutProps} small={small} startSeen>
      {demoMarkup()}
    </TextBlock>
  );
};

export const _TextBlock: Story = {
  render: () => <TextBlockStory />,
};

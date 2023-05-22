import React from 'react';
import { BlockQuote } from '@reykjavik/hanna-react/BlockQuote';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BlockQuote> = {
  title: 'components/text/BlockQuote',
  component: BlockQuote,
};
export default meta;

type Story = StoryObj<typeof BlockQuote>;

const Component = () => {
  return (
    <>
      <BlockQuote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus in beatae distinctio cum!
      </BlockQuote>
      <BlockQuote by="Jón Jónsson">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <ul>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Explicabo quam voluptas necessitatibus in beatae distinctio cum!</li>
        </ul>
        <p>Explicabo quam voluptas necessitatibus in beatae distinctio cum!</p>
        <ol>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Explicabo quam voluptas necessitatibus in beatae distinctio cum!</li>
        </ol>
      </BlockQuote>
      <BlockQuote by="Jón Jónsson ehf" byHref="about:blank">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
          necessitatibus in beatae distinctio cum!
        </p>
      </BlockQuote>
    </>
  );
};

export const _BlockQuote: Story = {
  render: () => <Component />,
};

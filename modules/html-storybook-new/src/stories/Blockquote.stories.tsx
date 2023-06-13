import React from 'react';
import { BlockQuote } from '@reykjavik/hanna-react/BlockQuote';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta = {
  title: 'text/BlockQuote',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj;

const BlockQuoteStory = () => {
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
  render: () => <BlockQuoteStory />,
};

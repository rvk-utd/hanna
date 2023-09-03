import React from 'react';
import { PullQuote } from '@reykjavik/hanna-react/PullQuote';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'text/PullQuote',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const PullQuoteStory = () => {
  return (
    <>
      <PullQuote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessi tatibus in beatae distinctio cum!
      </PullQuote>
      <PullQuote by="Jón Jónsson">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Explicabo quam voluptas necessi tatibus in beatae distinctio cum!</p>
      </PullQuote>
      <PullQuote by="Jón Jónsson" byHref="about:blank">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
          necessi tatibus in beatae distinctio cum!
        </p>
      </PullQuote>
    </>
  );
};

export const _PullQuote: StoryObj = {
  render: () => <PullQuoteStory />,
};

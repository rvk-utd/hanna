import React from 'react';
import PullQuote from '@reykjavik/hanna-react/PullQuote';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'text/PullQuote',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _PullQuote: StoryComponent = () => {
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

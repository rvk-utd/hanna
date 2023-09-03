import React from 'react';
import { BlockQuote } from '@reykjavik/hanna-react/BlockQuote';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'text/BlockQuote',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _BlockQuote: StoryComponent = () => {
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

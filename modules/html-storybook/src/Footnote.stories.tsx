import React from 'react';
import { Footnote } from '@reykjavik/hanna-react/Footnote';

import { HiddenTiger } from './utils/HiddenTiger';
import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Footnote',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _Footnote: StoryComponent = () => (
  <>
    <HiddenTiger>
      <p>
        This Atomic component can be placed inside/alongside just about any type of text
        content.
      </p>
    </HiddenTiger>
    <Footnote>
      Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í Ráðhúsi
      Reykjavíkur hefst kl. 14:00
    </Footnote>
  </>
);

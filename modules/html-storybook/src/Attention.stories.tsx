import React from 'react';
import Attention from '@reykjavik/hanna-react/Attention';

import HiddenTiger from './utils/HiddenTiger';
import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Attention',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _Attention: StoryComponent = () => (
  <>
    <HiddenTiger>
      <p>
        This Atomic component can be placed inside/alongside just about any type of text
        content.
      </p>
    </HiddenTiger>
    <Attention>
      Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í Ráðhúsi
      Reykjavíkur hefst kl. 14:00
    </Attention>
    {'\n\n'}
    <Attention small>
      Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í Ráðhúsi
      Reykjavíkur hefst kl. 14:00
    </Attention>
  </>
);

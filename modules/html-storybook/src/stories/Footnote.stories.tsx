import React from 'react';
import { Footnote } from '@reykjavik/hanna-react/Footnote';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

const meta: Meta = {
  title: 'Footnote',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    controls: { hideNoControlsWarning: true },
  },
};
export default meta;

export const _Footnote: StoryObj = {
  render: () => (
    <>
      <HiddenTiger>
        <p>
          This Atomic component can be placed inside/alongside just about any type of text
          content.
        </p>
      </HiddenTiger>
      <Footnote>
        Please note that - <a href="">Bein útsending frá fundi borgarstjórnar</a> í
        Ráðhúsi Reykjavíkur hefst kl. 14:00
      </Footnote>
    </>
  ),
};

import React from 'react';
import { Footnote } from '@reykjavik/hanna-react/Footnote';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

const meta: Meta<typeof Footnote> = {
  title: 'Footnote',
  component: Footnote,
};
export default meta;

type Story = StoryObj<typeof Footnote>;

const FootnoteStory = () => {
  return (
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
  );
};

export const _Footnote: Story = {
  render: () => <FootnoteStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

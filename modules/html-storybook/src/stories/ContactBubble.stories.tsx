import React from 'react';
import { ContactBubble } from '@reykjavik/hanna-react/ContactBubble';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

import { contactBubbleData } from './shared/contactBubble.data.js';

type ControlProps = {
  ssr: boolean;
  alwaysShow: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ContactBubble',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    layout: { pos: 'footer' },
  },
};
export default meta;

export const _ContactBubble: StoryObj<ControlProps> = {
  render: (args) => {
    // /* ONLY use during Development */
    // const [open, setOpen] = useState(false);
    const { ssr, alwaysShow } = args;
    const key = `${ssr}${alwaysShow}`;
    return (
      <>
        <HiddenTiger>
          <p style={{ height: '300vh' }} />
        </HiddenTiger>

        <ContactBubble
          key={key}
          {...contactBubbleData}
          alwaysShow={alwaysShow}
          // /* ONLY use during Development */
          // open={open}
          // onToggle={setOpen}
          ssr={ssr}
        />
      </>
    );
  },
  argTypes: {
    ssr: { name: 'Show client-side markup' },
    alwaysShow: { name: 'Set optional "alwaysShow" data-attribute' },
  },
  args: {
    ssr: false,
    alwaysShow: true,
  },
};

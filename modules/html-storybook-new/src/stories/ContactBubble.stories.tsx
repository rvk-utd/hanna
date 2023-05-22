import React from 'react';
import { ContactBubble, ContactBubbleItem } from '@reykjavik/hanna-react/ContactBubble';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

const meta: Meta<typeof ContactBubble> = {
  title: 'components/ContactBubble',
  component: ContactBubble,
};
export default meta;

type Story = StoryObj<typeof ContactBubble>;

const TITLE = 'Hvað getum við gert fyrir þig?';

const LINKS: Array<ContactBubbleItem> = [
  {
    href: 'https://abendingar.reykjavik.is/',
    target: '_blank',
    label: 'Ábendingar',
    extraLabel: 'Sendu okkur línu',
    icon: 'suggestions',
  },
  {
    label: 'Netspjall',
    extraLabel: 'Opið virka daga kl. 8:30–16:00',
    onClick: () => alert('Netspjall!!'),
    icon: 'livechat',
  },
  {
    href: '/spurt-og-svarad',
    label: 'Spurt og svarað',
    extraLabel: 'Algengar spurningar og svör',
    icon: 'faq',
  },
  {
    href: 'tel:+3544111111',
    label: 'Þjónustuver 411-1111',
    extraLabel: 'Opið virka daga kl. 8:30–16:00',
    icon: 'phone',
  },
  {
    href: 'mailto:upplysingar@reykjavik.is',
    label: 'upplysingar@reykjavik.is',
    extraLabel: 'Sendu okkur línu',
    icon: 'suggestions',
  },
];

const Component = () => {
  const ssr = !boolean('Show client-side markup', false);
  const alwaysShow = boolean('Set optional "alwaysShow" data-attribute', true);

  // /* ONLY use during Development */
  // const [open, setOpen] = useState(false);

  const key = '' + ssr;
  return (
    <>
      <HiddenTiger>
        <p style={{ height: '300vh' }} />
      </HiddenTiger>

      <ContactBubble
        key={key}
        title={TITLE}
        links={LINKS}
        alwaysShow={alwaysShow}
        // /* ONLY use during Development */
        // open={open}
        // onToggle={setOpen}
        ssr={ssr}
      />
    </>
  );
};

export const _ContactBubble: Story = {
  render: () => <Component />,
};

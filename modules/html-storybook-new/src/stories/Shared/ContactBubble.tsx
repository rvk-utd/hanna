import React from 'react';
import {
  ContactBubble,
  ContactBubbleItem,
  ContactBubbleProps,
} from '@reykjavik/hanna-react/ContactBubble';
import { FooterBadgesProps } from '@reykjavik/hanna-react/FooterBadges';

import dummyImage from '../../example_assets/FooterBadges__image.jpg';
import { HiddenTiger } from '../../utils/HiddenTrigger.js';

type Maur = Pick<ContactBubbleProps, 'ssr' | 'alwaysShow'>;

const dummySubFooterLinks: FooterBadgesProps['badges'] = [
  {
    href: 'http://www.reykjavik.is',
    altText: 'Jafnlaunavottun 2020–2021',
    src: dummyImage,
  },
];

dummySubFooterLinks.push(...dummySubFooterLinks);

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

export const ContactBubbleStory: React.FC<Maur> = ({ ssr, alwaysShow }) => {
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

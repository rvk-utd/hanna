import React from 'react';
import FooterBadges, { FooterBadgesProps } from '@reykjavik/hanna-react/FooterBadges';

import dummyImage from './example_assets/FooterBadges__image.jpg';
import { StoryComponent } from './storytypes';

export default {
  title: 'Layout/FooterBadges',
  component: FooterBadges,
};

const dummySubFooterLinks: FooterBadgesProps['badges'] = [
  {
    href: 'http://www.reykjavik.is',
    altText: 'Jafnlaunavottun 2020–2021',
    src: dummyImage,
  },
];

dummySubFooterLinks.push(...dummySubFooterLinks);

export const _FooterBadges: StoryComponent = () => (
  <FooterBadges badges={dummySubFooterLinks} />
);

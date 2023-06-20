import React from 'react';
import { FooterBadges, FooterBadgesProps } from '@reykjavik/hanna-react/FooterBadges';

import dummyImage from '../example_assets/FooterBadges__image.jpg';

const dummySubFooterLinks: FooterBadgesProps['badges'] = [
  {
    href: 'http://www.reykjavik.is',
    altText: 'Jafnlaunavottun 2020–2021',
    src: dummyImage,
  },
];

dummySubFooterLinks.push(...dummySubFooterLinks);

export const FooterBadgesStory = () => <FooterBadges badges={dummySubFooterLinks} />;

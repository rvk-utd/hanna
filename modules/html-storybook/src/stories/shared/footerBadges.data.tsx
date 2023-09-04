import { FooterBadgesProps } from '@reykjavik/hanna-react/FooterBadges';

import dummyImage from '../../example_assets/FooterBadges__image.jpg';

export const footerBadgesData: FooterBadgesProps = {
  badges: [
    {
      href: 'http://www.reykjavik.is',
      altText: 'Jafnlaunavottun 2020–2021',
      src: dummyImage,
    },
  ],
};

footerBadgesData.badges.push(...footerBadgesData.badges);

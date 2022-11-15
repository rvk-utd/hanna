import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import FooterBadges, { FooterBadgesProps } from '@reykjavik/hanna-react/FooterBadges';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const dummySubFooterLinks: FooterBadgesProps['badges'] = [
  {
    src: '/media/x/FooterBadges__image.jpg',
    altText: 'Jafnlaunavottun 2020–2021',
  },
  {
    src: '/media/x/FooterBadges__image.jpg',
    altText: 'Jafnlaunavottun 2020–2021',
    href: 'https://www.reykjavik.is',
  },
  {
    src: '/media/x/FooterBadges__image.jpg',
    altText: 'Jafnlaunavottun 2020–2021',
  },
];
export default function () {
  return (
    <Minimal>
      <FooterBadges badges={dummySubFooterLinks} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.FooterBadges__badge a',
};

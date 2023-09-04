import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { V2_MetaFunction } from '@remix-run/node';
import {
  ExtraLinks,
  ExtraLinksCardProps,
  RelatedLink,
} from '@reykjavik/hanna-react/ExtraLinks';

import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const CARDS = range(1, 7).map(
  (n): ExtraLinksCardProps => ({
    title:
      'Eignaskiptayfirlýsing' +
      (n % 3 === 0 ? ' lorem ipsum dolor sit amet wehbsyte' : ''),
    href: '/',
    summary: (n - 2) % 4 === 0 ? lorem.short : lorem.tiny,
  })
);

const relatedTypes: Array<RelatedLink['type']> = [undefined, 'pdf', 'text', 'link'];
const RELATED_LINKS = range(1, 6).map(
  (n): RelatedLink => ({
    label: 'Stefna í málefnum eldri borgara til ársins 2022 ' + n,
    href: '/',
    type: relatedTypes[(n - 1) % 4],
  })
);

export default function () {
  return (
    <Minimal>
      <ExtraLinks title="Extra Links" cards={CARDS} />
      {/* <SeenEffect effectType="custom"> */}
      <ExtraLinks
        title="Extra Links with Some Related Links Also"
        cards={CARDS.slice(0, 5)}
        relatedTitle="Related Links"
        relatedLinks={RELATED_LINKS}
      />
      {/* </SeenEffect> */}
      <ExtraLinks
        title="Extra Links"
        cards={CARDS.slice(0, 1)}
        relatedLinks={RELATED_LINKS.slice(0, 2)}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ExtraLinks__card >> nth = 1',
  extras: async ({ page, localScreenshot }) => {
    const relatedLinks = page.locator('.ExtraLinks__related__list').last();
    const relLink = relatedLinks.locator(':last-child > .ExtraLinks__related__link');

    await relLink.hover();
    await localScreenshot(relatedLinks, 'relatedlink-hover', { margin: true });
  },
};

import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { V2_MetaFunction } from '@remix-run/node';
import { ArticleCards, ArticleCardsItemProps } from '@reykjavik/hanna-react/ArticleCards';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { host, illustr, lorem, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const cards = range(1, 5).map(
  (i): ArticleCardsItemProps => ({
    title:
      [
        'Block Title',
        'Block title lorem ipsum dolor sit ament foobar',
        'Block title lorem ipsum dolor.',
      ][i % 3] || '',
    href: '',
    image: i === 3 ? undefined : i % 4 ? photo.landscape : photo.portrait,
    meta: i % 2 === 0 ? lorem.medium.slice(0, 103) + '.' : '14. október',
    summary: i === 2 ? lorem.tiny : i === 3 ? lorem.short : undefined,
  })
);

export default function () {
  return (
    <Minimal>
      <ArticleCards cards={cards} imgPlaceholder={host + illustr.short.src} />
      <DummyBlock thin />
      <ArticleCards
        cards={cards}
        imgPlaceholder={host + illustr.short.src}
        size="large"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ArticleCards__card__title >> nth = 1',
};

import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import ArticleCards, { ArticleCardsItemProps } from '@reykjavik/hanna-react/ArticleCards';

import { Minimal } from '../../layout/Minimal';
import { illustr, lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

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
  })
);

export default function () {
  return (
    <Minimal>
      <ArticleCards cards={cards} imgPlaceholder={illustr.short.src} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ArticleCards__card__title >> nth = 0',
};

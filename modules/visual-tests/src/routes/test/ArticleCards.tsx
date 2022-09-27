import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import ArticleCards from '@reykjavik/hanna-react/ArticleCards';
import { ImageCardProps } from '@reykjavik/hanna-react/ImageCards';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const cards = range(0, 7).map(
  (i): ImageCardProps => ({
    title: [
      'Block Title',
      'Block title lorem ipsum dolor sit ament foobar',
      'Block title lorem ipsum dolor.',
    ][i % 3]!,
    href: '',
    image: photo.square,
    meta: i % 2 === 0 ? lorem.medium.slice(0, 103) + '.' : '14. október',
  })
);
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ArticleCards cards={cards} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ArticleCards__card__title >> nth = 0',
};

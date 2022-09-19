import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import NewsHero from '@reykjavik/hanna-react/NewsHero';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const prop = {
  short: {
    title: 'Yöva gäta stahrt sömwaer.',
    meta: '14. oktober',
    summary: lorem.short,
  },
  medium: {
    title: 'Leebur deroor iehroom, bork bork börk!',
    meta: '14. oktober',
    summary: lorem.medium,
  },
  long: {
    title: 'Ut enim ad minim veniam, letsi ifder svensk og latin.',
    meta: '14. oktober',
    summary: lorem.long,
  },
};
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <NewsHero {...prop.short} image={photo.landscape} />
      <NewsHero {...prop.medium} blingType={'balls-small'} />
      <NewsHero {...prop.medium} blingType={'dome'} />
      <NewsHero {...prop.long} blingType={'snake'} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ShareButtons__link--facebook >> nth = 0',
};
import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { NewsHero } from '@reykjavik/hanna-react/NewsHero';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const prop = {
  short: {
    title: 'Yöva gäta stahrt.',
    meta: '14. oktober',
    summary: lorem.short,
  },
  medium: {
    title: 'Leebur deroor iehroom, bork!',
    // meta: '14. oktober',
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
    <Minimal>
      <NewsHero {...prop.short} image={photo.landscape} startSeen />
      <DummyBlock thin />
      <NewsHero {...prop.medium} blingType={'balls-small'} startSeen />
      <DummyBlock thin />
      <NewsHero {...prop.long} blingType={'dome'} sharing={false} startSeen />
      <DummyBlock thin />
      <NewsHero {...prop.medium} summary={undefined} blingType={'snake'} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ShareButtons__link--facebook >> nth = 0',
  clipViewport: true,
};

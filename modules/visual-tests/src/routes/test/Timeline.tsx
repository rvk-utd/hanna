import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Timeline, TimelineProps } from '@reykjavik/hanna-react/Timeline';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

const items: TimelineProps['items'] = [
  {
    title: 'Latest item',
    category: 'User or author',
    description: 'Some short summary or description',
    date: new Date(2025, 1, 10),
  },
  {
    title: 'This item is flagged as current, and has a weirdly long title',
    category: 'Category',
    status: { label: 'Móttekið', color: 'green' },
    current: true,
  },
  {
    title: 'Previous item',
    description: lorem.medium,
    date: new Date(2025, 0, 6),
  },
  {
    title: 'First item',
    description: 'Short description for this',
    date: new Date(2024, 10, 30),
  },
];

const twoItems = [items[0]!, items[items.length - 1]!];

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <Timeline items={items} />
      <DummyBlock thin />
      <Timeline items={twoItems} hideTime title="With 'title' and time hidden" />
      <DummyBlock thin />
      <Timeline items={twoItems} oldestFirst />
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {};

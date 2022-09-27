import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import InfoBlock from '@reykjavik/hanna-react/InfoBlock';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const textItems = [
  lorem.tiny,
  lorem.long.slice(0, 80) + '.',
  lorem.medium.slice(0, 115) + '.',
  lorem.medium.slice(0, 149) + '.',
  lorem.tiny,
];
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <InfoBlock
        title="InfoBlock with attention text below"
        subtitle={lorem.short}
        items={textItems}
        attention={lorem.medium}
        startSeen
      />
      <InfoBlock
        title="InfoBlock with extra info below"
        subtitle={lorem.short}
        items={textItems}
        extraInfo={lorem.medium}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};

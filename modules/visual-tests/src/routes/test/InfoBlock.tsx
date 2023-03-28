import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { InfoBlock } from '@reykjavik/hanna-react/InfoBlock';

import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');
const textItems = () => [
  lorem.tiny,
  lorem.tiny.slice(0, 50) + '.',
  loremRT.medium(true),
  lorem.medium.slice(0, 115) + '.',
  lorem.tiny,
];
export default function () {
  return (
    <Minimal>
      <InfoBlock
        title="InfoBlock with attention text below"
        subtitle={loremRT.short()}
        items={textItems()}
        startSeen
      />
      <InfoBlock
        title={lorem.short}
        items={textItems().slice(0, 2)}
        attention={lorem.medium}
        startSeen
      />
      <InfoBlock
        title={lorem.short}
        items={textItems().slice(0, 2)}
        extraInfo={lorem.short}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};

import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { InfoBlock } from '@reykjavik/hanna-react/InfoBlock';

import { Minimal } from '../../layout/Minimal.js';
import { lorem, loremRT } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

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
      />
      <InfoBlock
        title={lorem.short}
        items={textItems().slice(0, 2)}
        attention={lorem.medium}
      />
      <InfoBlock
        title={lorem.short}
        items={textItems().slice(0, 2)}
        extraInfo={lorem.short}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};

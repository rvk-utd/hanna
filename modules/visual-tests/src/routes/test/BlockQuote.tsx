import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import BlockQuote from '@reykjavik/hanna-react/BlockQuote';

import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <BlockQuote>{loremRT.medium(true)}</BlockQuote>
      <BlockQuote by="Jón Jónsson">
        <p>{loremRT.short()}</p>
        <ul>
          <li>{lorem.tiny}</li>
          <li>{lorem.short}</li>
        </ul>
        <p>{lorem.short}</p>
        <ol>
          <li>{lorem.short}</li>
          <li>{lorem.tiny}</li>
        </ol>
      </BlockQuote>
      <BlockQuote by="Jón Jónsson" byHref="about:blank">
        <p>{lorem.medium}</p>
      </BlockQuote>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.BlockQuote__by > a',
};

import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <Fragment>
        <p>
          Single line:
          <Skeleton text />
        </p>
        <p>
          Multi-line:
          <Skeleton text height={4} />
        </p>
        <p>
          Block:
          <Skeleton height={6} />
        </p>

        <p>
          Multi item (default gap: 3):
          <Skeleton items={3} height={3} text />
        </p>
        <p>
          Multi block:
          <Skeleton items={3} height={3} gap={1} />
        </p>
      </Fragment>
    </Minimal>
  );
}
export const testing: TestingInfo = {};

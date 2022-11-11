import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import Skeleton from '@reykjavik/hanna-react/Skeleton';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

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

import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { hannaVars } from '@reykjavik/hanna-css';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonSecondary from '@reykjavik/hanna-react/ButtonSecondary';
import { Progress, ProgressProps } from '@reykjavik/hanna-react/Progress';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens(
  'Progress',
  'ButtonPrimary',
  'ButtonSecondary',
  'RowBlock',
  'RowBlockColumn'
);

export default function () {
  type SpinnerSize = NonNullable<ProgressProps['size']>;
  const sizes: Array<SpinnerSize> = ['large', 'medium', 'small', 'xsmall'];
  const allSizes = (renderer: (size: SpinnerSize) => React.ReactNode) => (
    <div>{sizes.map((size) => renderer(size))}</div>
  );

  return (
    <Minimal>
      <Progress />
      <Progress percent={33} />
      <Progress percent={61} />
      <Progress percent={67} />
      <Progress percent={100} />
      <Progress done />
      <DummyBlock thin />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              backgroundColor:
                i === 1 ? hannaVars.color_suld_75.toString() : 'transparent',
            }}
          >
            {allSizes((size) => (
              <Progress spinner size={size} />
            ))}
            {allSizes((size) => (
              <Progress spinner size={size} percent={33} />
            ))}
            {allSizes((size) => (
              <Progress spinner size={size} percent={61} />
            ))}
            {allSizes((size) => (
              <Progress spinner size={size} percent={67} />
            ))}
            {allSizes((size) => (
              <Progress spinner size={size} percent={100} />
            ))}
            {allSizes((size) => (
              <Progress spinner size={size} done />
            ))}
          </div>
        ))}
      </div>
      <DummyBlock thin />
      <ButtonPrimary>Loading...</ButtonPrimary>
      <ButtonPrimary>
        <Progress spinner /> Loading...
      </ButtonPrimary>
      <ButtonPrimary variant="destructive">
        <Progress spinner /> Loading...
      </ButtonPrimary>
      <DummyBlock thin />
      <ButtonSecondary>
        <Progress spinner /> Loading...
      </ButtonSecondary>
      <ButtonSecondary variant="destructive">
        <Progress spinner /> Loading...
      </ButtonSecondary>
    </Minimal>
  );
}

export const testing: TestingInfo = {};

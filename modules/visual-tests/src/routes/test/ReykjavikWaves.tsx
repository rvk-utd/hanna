import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { hannaVars } from '@reykjavik/hanna-css';
import { ReykjavikWaves } from '@reykjavik/hanna-react/ReykjavikWaves';

import { Minimal } from '../../layout/Minimal.js';
import { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const CustomContent = () => (
  <span
    style={{
      display: 'inline-block',
      background: `${hannaVars.color_nautholsvik_50}`,
      padding: '4px 8px',
    }}
  >
    Custom content.
  </span>
);

export default function () {
  return (
    <Minimal>
      {[false, true].map((customContent, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            columnGap: '32px',
            gridTemplateColumns: '1fr 1fr',
            marginBottom: '24px',
          }}
        >
          <ReykjavikWaves>{customContent && <CustomContent />}</ReykjavikWaves>
          <ReykjavikWaves small>{customContent && <CustomContent />}</ReykjavikWaves>
        </div>
      ))}
      <ReykjavikWaves wrapperProps={{ style: { width: '16px' } }} />
    </Minimal>
  );
}

export const testing: TestingInfo = {};

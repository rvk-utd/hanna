import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { hannaVars } from '@reykjavik/hanna-css';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <div style={{ display: 'flex', gap: '1em', flexFlow: 'row wrap' }}>
        {[false, true].map((darkBg, i) => (
          <div
            key={i}
            style={{
              flexGrow: 1,
              margin: 0,
              paddingBlock: '1em',
              ...(darkBg && {
                paddingInline: hannaVars.space_3.toString(),
                background: hannaVars.color_faxafloi_100.toString(),
                color: hannaVars.color_suld_0.toString(),
              }),
            }}
          >
            <p>
              Single line:
              <Skeleton negative={darkBg} text height={1} />
            </p>
            <p>
              Multi-line:
              <Skeleton negative={darkBg} text height={4} />
            </p>
            <p>
              Block:
              <Skeleton negative={darkBg} height={6} />
            </p>
            <p>
              Rounded:
              <Skeleton negative={darkBg} rounded height={2} />
            </p>
            <p>
              Multi item (default gap: 3):
              <Skeleton negative={darkBg} items={3} height={3} text />
            </p>
            <p>
              Multi block:
              <Skeleton negative={darkBg} items={3} height={3} gap={1} />
            </p>
            <p>
              Circles:
              <Skeleton negative={darkBg} circle />
              <Skeleton negative={darkBg} circle height={5} />
            </p>
          </div>
        ))}
      </div>

      {/** /
        <div
          style={{
            marginBlock: '1em',
            display: 'flex',
            gap: '1em',
            flexFlow: 'row wrap',
          }}
        >
          {[
            hannaVars.color_faxafloi_100,
            hannaVars.color_suld_200,
            hannaVars.color_suld_150,
            hannaVars.color_suld_100,
            hannaVars.color_suld_75,
            hannaVars.color_suld_50,
            hannaVars.color_suld_25,
            hannaVars.color_suld_0,
          ].map((color, i) => (
            <div
              key={i}
              style={{
                width: '21%',
                flexGrow: 1,
                background: color.toString(),
                padding: '1em',
              }}
            >
              <Skeleton highContrast={i < 4} circle />
              <Skeleton highContrast={i < 4} height={2} />
            </div>
          ))}
        </div>
        /**/}
    </Minimal>
  );
}
export const testing: TestingInfo = {};

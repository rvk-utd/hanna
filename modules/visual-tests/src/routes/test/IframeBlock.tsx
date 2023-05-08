import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { IframeBlock } from '@reykjavik/hanna-react/IframeBlock';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const alignment = [undefined, 'right'] as const;
const compactness = [false, true] as const;
const framedness = [false, true] as const;

export default function () {
  return (
    <Minimal>
      {compactness.map((compact) => {
        return alignment.map((align) => {
          return framedness.map((framed, i) => {
            const dummy = align !== 'right' || compact !== true || framed !== true;
            const name =
              (align === undefined ? '' : align + ' align') +
              (compact === true ? ' compact' : '') +
              (framed === true ? ' framed' : '');
            return (
              <Fragment key={i}>
                <IframeBlock
                  title="Testing"
                  src={
                    'data:text/html,' +
                    encodeURIComponent(`<body style="background:#ffdc">${name} </body>`)
                  }
                  scrolling={true}
                  height={150}
                  align={align}
                  framed={framed}
                  compact={compact}
                />
                {dummy && <DummyBlock thin />}
              </Fragment>
            );
          });
        });
      })}
    </Minimal>
  );
}

export const testing: TestingInfo = {};

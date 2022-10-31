import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import IframeBlock from '@reykjavik/hanna-react/IframeBlock';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const alignment = [undefined, 'right'] as const;
const compactness = [false, true] as const;
const framedness = [false, true] as const;

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
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

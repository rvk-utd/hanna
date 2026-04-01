import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { StatusTag, StatusTagColor } from '@reykjavik/hanna-react/StatusTag';
import { capitalize, Equals, Expect } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

export const handle = cssTokens('StatusTag');

const largeOnOff = [undefined, { large: true }];
const lightOnOff = [undefined, { light: 'off' as const }];

const colors = ['none', 'blue', 'green', 'yellow', 'red'] as const;
type _ = Expect<Equals<(typeof colors)[number], StatusTagColor>>;

export default function () {
  return (
    <Minimal>
      {largeOnOff.flatMap((largeProps) =>
        lightOnOff.map((lightOffProps) => (
          <div key={`${!!largeProps}:${!!lightOffProps}`}>
            {colors.flatMap((colorVal) => {
              const color = colorVal === 'none' ? undefined : colorVal;
              return [
                <StatusTag
                  key={color}
                  color={color}
                  {...largeProps}
                  {...lightOffProps}
                  label={
                    capitalize(color || 'default') +
                    (largeProps ? ' large' : '') +
                    (lightOffProps ? ', light off' : '')
                  }
                />,
                ' ',
              ];
            })}
          </div>
        ))
      )}
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  __DEV_FOCUS__: true,
};

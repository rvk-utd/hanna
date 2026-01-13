import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Icon, IconProps } from '@reykjavik/hanna-react/Icon';
import { Equals, Expect } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal.js';
import { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

const sizes = ['small', 'medium', 'large'] as const;
type IconSize = (typeof sizes)[number];

type _ = Expect<Equals<IconSize, NonNullable<IconProps['size']>>>;

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      {sizes.map((size, i) => (
        <div key={i} style={{ margin: '20px 0', display: 'flex', gap: '8px' }}>
          <Icon type="category" size={size} />
          <div style={{ outline: '1px dotted rgba(0,0,0,.33)', paddingRight: '8px' }}>
            <Icon type="logout" size={size} />
            Some Text ({size} icon)
          </div>
        </div>
      ))}
    </Minimal>
  );
}

export const testing: TestingInfo = {};

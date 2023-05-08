import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { ArticleMeta } from '@reykjavik/hanna-react/ArticleMeta';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <ArticleMeta
        items={[
          {
            label: 'Mánudagur, 30. maí 2021',
          },
          {
            label: 'Some random text',
            href: '/',
          },
          {
            label: 'Hover Test',
            href: '/',
          },
        ]}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: 'a:text("Hover Test")',
};

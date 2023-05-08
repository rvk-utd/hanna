/* eslint-disable no-await-in-loop */
import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { RelatedLinkItem, RelatedLinks } from '@reykjavik/hanna-react/RelatedLinks';

import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const links: Array<RelatedLinkItem> = [
  {
    href: '/normal/link',
    label: 'Default icon',
  },
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'Link ',
    type: 'link',
  },
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'External ',
    type: 'external',
  },
  {
    href: '/files/some.pdf',
    label: 'PDF with long title. -- ' + lorem.tiny.slice(0, 33),
  },
  {
    href: '/files/someOtherDocument',
    label: 'Document',
    type: 'document',
  },
];

export default function () {
  return (
    <Minimal>
      <RelatedLinks title={lorem.medium} links={links} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.RelatedLinks__link >> nth=0',
};

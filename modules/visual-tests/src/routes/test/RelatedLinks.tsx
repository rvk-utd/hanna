/* eslint-disable no-await-in-loop */
import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import RelatedLinks, { RelatedLinkItem } from '@reykjavik/hanna-react/RelatedLinks';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: [] };
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
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <RelatedLinks title={lorem.medium} links={links} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.RelatedLinks__link',
};

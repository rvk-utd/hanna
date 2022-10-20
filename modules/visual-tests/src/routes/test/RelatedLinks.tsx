import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import RelatedLinks, { RelatedLinkItem } from '@reykjavik/hanna-react/RelatedLinks';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: [] };
const links: Array<RelatedLinkItem> = [
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'Ábendingavefur',
    type: 'external',
    target: '_blank',
  },
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'Ábendingavefur',
    target: '_blank',
  },
  {
    href: '/files/somepdfFile',
    label: 'Eitthvað PDF skjal',
    type: 'pdf',
  },
  {
    href: '/files/some.pdf',
    label: 'Eitthvað PDF skjal',
  },
  {
    href: '/files/someOtherDocument',
    label: 'Annars konar Skjal með afar langan titil sem brotnar milli lína',
    type: 'document',
  },
  {
    href: '/normal/link',
    label: 'Vefsíða með tengdu efni',
    type: 'link',
  },
];
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <RelatedLinks title="Best title in the world" links={links} />
      <DummyBlock thin />
      <RelatedLinks
        title={'Linebreak title. ' + lorem.medium.slice(0, 120)}
        links={links}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  __DEV_FOCUS__: true,
  extras: async ({ page, localScreenshot }) => {
    const external = page.locator('.RelatedLinks__link[data-type="external"]');
    await external.hover();
    await localScreenshot(external, 'external-hover', { margin: true });
  },
};

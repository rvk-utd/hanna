import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ExtraLinks, {
  ExtraLinksCardProps,
  RelatedLink,
} from '@reykjavik/hanna-react/ExtraLinks';
import range from '@hugsmidjan/qj/range';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';
import { boolean } from '@storybook/addon-knobs';
export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const TITLE = 'Extra links top';
const CARDS = range(1, 8).map(
  (): ExtraLinksCardProps => ({
    title: 'Eignaskiptayfirlýsing',
    href: '',
    summary: 'Lögboðinn skriflegur gerningur um skiptingu fjöleignarhúss.',
  })
);

const relatedTypes = ['pdf', 'text', 'link'] as const;
const RELATED_LINKS = range(1, 6).map(
  (n): RelatedLink => ({
    label: 'Stefna í málefnum eldri borgara til ársins 2022 ' + n,
    href: '',
    type: relatedTypes[(n - 1) % 4],
  })
);

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ExtraLinks title={TITLE} cards={CARDS} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('.ExtraLinks__card >> nth = 0').hover();
  },
};

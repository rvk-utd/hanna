import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import BreadCrumbs from '@reykjavik/hanna-react/BreadCrumbs';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const crumbTrail = [
  { href: '', label: 'Forsíða' },
  { href: undefined, label: 'Sparse' },
  { href: '', label: 'Fundargerðir' },
  { href: '', label: 'Mannréttindaráð' },
];

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <BreadCrumbs title={'Þú ert hér'} trail={crumbTrail} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  // page screenshot in all browsers
  initialHover: '.BreadCrumbs__item:text("Mannréttindaráð")',
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide') {
      return;
    }
    const home = page.locator('.BreadCrumbs__item:text("Forsíða")');
    const child = page.locator('.BreadCrumbs__item:text("Fundargerðir")');

    await home.hover();
    await localScreenshot(home, 'home-hover', { margin: true });

    await child.hover();
    await localScreenshot(child, 'child-hover', { margin: true });
  },
};

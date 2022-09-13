import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ContactBubble, { ContactBubbleItem } from '@reykjavik/hanna-react/ContactBubble';
import { boolean } from '@storybook/addon-knobs';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';
export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const LINKS: Array<ContactBubbleItem> = [
  {
    href: 'https://abendingar.reykjavik.is/',
    target: '_blank',
    label: 'Ábendingar',
    extraLabel: 'Sendu okkur línu',
    icon: 'suggestions',
  },
  {
    label: 'Netspjall',
    extraLabel: 'Opið virka daga kl. 8:30–16:00',
    onClick: () => alert('Netspjall!!'),
    icon: 'livechat',
  },
  {
    href: '/spurt-og-svarad',
    label: 'Spurt og svarað',
    extraLabel: 'Algengar spurningar og svör',
    icon: 'faq',
  },
  {
    href: 'tel:+3544111111',
    label: 'Þjónustuver 411-1111',
    extraLabel: 'Opið virka daga kl. 8:30–16:00',
    icon: 'phone',
  },
  {
    href: 'mailto:upplysingar@reykjavik.is',
    label: 'upplysingar@reykjavik.is',
    extraLabel: 'Sendu okkur línu',
    icon: 'suggestions',
  },
];
export default function () {
  const ssr = !boolean('Show client-side markup', false);
  const alwaysShow = boolean('Set optional "alwaysShow" data-attribute', true);
  const key = '' + ssr;
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ContactBubble key={key} title={'Hafa '} links={LINKS} alwaysShow={alwaysShow} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  prep: async ({ page }) => {
    await page.locator('.ContactBubble__openbtn').hover();
  },
};

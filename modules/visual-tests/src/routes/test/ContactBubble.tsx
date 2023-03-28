import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { ContactBubble, ContactBubbleItem } from '@reykjavik/hanna-react/ContactBubble';
import { boolean } from '@storybook/addon-knobs';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');
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
    <Minimal>
      <ContactBubble key={key} title={'Hafa '} links={LINKS} alwaysShow={alwaysShow} />
    </Minimal>
  );
}

// TODO: Text combination of .ContactBubble and .MainMenu

export const testing: TestingInfo = {
  viewportMinHeight: 700,
  extras: async ({ page, pageScreenshot, localScreenshot, project, setViewportSize }) => {
    const contactBubbleBtn = page.locator('.ContactBubble__openbtn');
    if (project !== 'firefox-netbook') {
      await contactBubbleBtn.hover();
      await localScreenshot(contactBubbleBtn, 'btn-hover', { margin: 25 });
    }

    await contactBubbleBtn.click();
    await page.waitForTimeout(100);
    await page.locator('.ContactBubble__link:has-text("Netspjall")').hover();
    await pageScreenshot('opened');
    if (project === 'firefox-phone') {
      await page.locator('.ContactBubble').evaluate((elm) => {
        elm.scrollTo(0, 1000);
      });
      await pageScreenshot('opened-scrolled');
    }
  },
};

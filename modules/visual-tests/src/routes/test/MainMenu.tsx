import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Layout from '@reykjavik/hanna-react/Layout';
import MainMenu, {
  AuxiliaryPanelProps,
  MainMenuItemList,
  MegaMenuItem,
  MegaMenuPanel,
} from '@reykjavik/hanna-react/MainMenu';
import { getStableRandomItem } from '@reykjavik/hanna-utils';

import { makeStateBridge } from '../../test-helpers/makeStateBridge';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

const showAuxState = makeStateBridge<true | undefined>('showAux');

export const mainMenuItems: MainMenuItemList = [
  {
    label: 'Forsíða',
    href: '',
    modifier: 'home',
  },
  {
    label: 'Íbúar',
    href: '#MegaMenu:Íbúar',
    current: true,
  },
  {
    label: 'Stjórnkerfið',
    href: '#MegaMenu:Stjórnkerfið',
  },
  {
    label: 'Mannlíf',
    href: '#MegaMenu:Mannlíf',
  },
  '---',
  {
    label: 'EN',
    labelLong: 'English',
    lang: 'en',
    href: '/en',
    modifier: 'lang',
  },
  {
    label: 'PL',
    labelLong: 'Polski',
    lang: 'pl',
    href: '/pl',
    modifier: 'lang',
  },
  {
    label: 'Mínar síður',
    href: '',
    modifier: 'mypages',
  },
  {
    label: 'Leita',
    labelLong: 'Leita á vefnum',
    href: '',
    modifier: 'search',
  },
];

const createPanelItems = (title: string, length: number, current?: number) => ({
  title,
  id: 'MegaMenu:' + title,
  items: Array.from({ length }).map(
    (_, i): MegaMenuItem => ({
      label: title + (i === 2 ? ' lorem impsum dolor sit' : '') + ' item ' + (i + 1),
      href: '',
      current: current === i || undefined,
      summary: getStableRandomItem(
        [
          'Lorem impsum dolor sit',
          'Lorem impsum dolor sit dolore amet',
          'Lorem impsum dolor sit dolore amet foo bleargh.',
          undefined,
          undefined,
        ],
        i * 11 + title.slice(0, 1)
      ),
    })
  ),
});

export const megaMenuPanels: Array<MegaMenuPanel> = [
  createPanelItems('Íbúar', 8, 2),
  createPanelItems('Stjórnkerfið', 2),
  createPanelItems('Mannlíf', 4),
];

export const auxiliaryPanel: AuxiliaryPanelProps = {
  ...createPanelItems('Sérvefir', 5),
  image: 'hanna-veitiggi',
};

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

// ---------------------------------------------------------------------------

export default function () {
  const [showAux] = showAuxState.use(true);

  return (
    <Layout
      navChildren={
        <MainMenu
          title="Aðalvalmynd"
          items={mainMenuItems}
          megaPanels={megaMenuPanels}
          auxiliaryPanel={showAux && auxiliaryPanel}
        />
      }
    >
      {''}
    </Layout>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = [
  {
    label: 'topmenu',
    tags: ['firefox-wide', 'firefox-netbook'],
    initialHover: '.MainMenu__link:text("Stjórnkerfið")',
    extras: async ({ page, localScreenshot, pageScreenshot, setViewportSize }) => {
      // open a mega menu panel
      await page.locator('.MainMenu__link:text("Mannlíf")').click();
      await page.waitForTimeout(100);
      const activePanel = page.locator('.PrimaryPanel--active');

      // NOTE: .MainMenu__panelsWrap is the effective page-scroll-container when MainMenu "mega" panel is opn
      const scrollContainer = activePanel.locator('scrollContainer=');
      const menuScrollHeight = await scrollContainer.evaluate((elm) => elm.scrollHeight);

      // test megamenu scroll-overflow on unusually short viewports
      await setViewportSize(0.6 * menuScrollHeight);
      await page.locator('.MainMenu__link:text("Stjórnkerfið")').hover();
      await pageScreenshot('megamenu-overflow');

      // test megamenu scroll-overflow bottom-scrolled on unusually short viewports
      await scrollContainer.evaluate((elm) => elm.scrollBy(0, elm.scrollHeight));
      await page.waitForTimeout(100);
      await pageScreenshot('megamenu-scrolled');

      // resize viewport to more than the minimum required height.
      await setViewportSize(menuScrollHeight + 100);
      await activePanel.locator('.PrimaryPanel__link:has-text("item 3")').hover();
      await pageScreenshot('megamenu');

      await showAuxState.send(page, undefined);
      await pageScreenshot('megamenu-no-aux');
      await showAuxState.send(page, true);

      // test auxiliary menu link hover styling
      const auxPanel = page.locator('.AuxiliaryPanel__items');
      await auxPanel.locator('.AuxiliaryPanel__link:has-text("item 3")').hover();
      await localScreenshot(auxPanel, 'auxlink-hover');

      // Test close button hover
      const closeBtn = page.locator('.MainMenu__megapanel__backtomenu');
      await closeBtn.hover();
      await localScreenshot(closeBtn, 'closebtn-hover', { margin: 40 });
    },
  },

  {
    label: 'hamburger',
    tags: ['firefox-phone', 'firefox-tablet'],
    extras: async ({ page, localScreenshot, pageScreenshot, setViewportSize }) => {
      const hamburgerBtn = page.locator('.Layout__header__skiplink');
      const activePanel = page.locator('.PrimaryPanel--active');
      // NOTE: .MainMenu is the effective page-scroll-container in "hamburger-mode"
      const scrollContainer = page.locator('.MainMenu__items >> scrollContainer=');
      let menuScrollHeight = 0;

      // hover the hamburger icon
      await hamburgerBtn.hover();
      await localScreenshot(hamburgerBtn, 'hamburger-hover', { margin: true });

      // open the menu
      await hamburgerBtn.click();
      menuScrollHeight = await scrollContainer.evaluate((elm) => elm.scrollHeight);
      await setViewportSize(0.6 * menuScrollHeight);
      await page.locator('.MainMenu__link:text("Stjórnkerfið")').hover();
      // test megamenu scroll-overflow
      await pageScreenshot('menu-open-overflow');

      // open the sub-menu
      await page.locator('.MainMenu__link:text("Mannlíf")').click();
      await page.waitForTimeout(100);
      await page.mouse.move(0, 0);

      // test megamenu scroll-overflow bottom-scrolled
      await scrollContainer.evaluate((elm) => {
        // NOTE: Webkit seems to fail to scroll all the way
        // if we scroll by an obscenely large amount, like say 10_000
        elm.scrollBy(0, elm.scrollHeight);
      });
      await page.waitForTimeout(100);
      await pageScreenshot('menu-open-scrolled');

      // resize viewport to more than the minimum required height.
      menuScrollHeight = await scrollContainer.evaluate((elm) => elm.scrollHeight);
      await setViewportSize(menuScrollHeight + 100);
      await activePanel.locator('.PrimaryPanel__link:has-text("item 3")').hover();
      await pageScreenshot('menu-open');

      await showAuxState.send(page, undefined);
      await pageScreenshot('menu-open-no-aux');
      await showAuxState.send(page, true);

      // test auxiliary menu link hover styling
      const auxPanel = page.locator('.AuxiliaryPanel__items');
      await auxPanel.locator('.AuxiliaryPanel__link:has-text("item 3")').hover();
      await localScreenshot(auxPanel, 'auxlink-hover');

      // Test close button hover
      const closeBtn = page.locator('.Layout__header__skiplink');
      await closeBtn.hover();
      await localScreenshot(closeBtn, 'closebtn-hover', { margin: true });
    },
  },
];

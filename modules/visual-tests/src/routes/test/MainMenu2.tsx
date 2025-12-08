import React, { useEffect } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { useSearchParams } from '@remix-run/react';
import { Layout } from '@reykjavik/hanna-react/Layout';
import {
  MainMenu2,
  MainMenu2SubMenu,
  MainMenu2SubMenuItem,
} from '@reykjavik/hanna-react/MainMenu2';
import { getStableRandomItem } from '@reykjavik/hanna-utils';

import { makeStateBridge } from '../../test-helpers/makeStateBridge.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

const showAuxState = makeStateBridge<true | undefined>('showAux');

const createPanelItems = (
  title: string,
  length: number,
  current?: number
): MainMenu2SubMenu => ({
  title,
  subItems: Array.from({ length }).map(
    (_, i): MainMenu2SubMenuItem => ({
      label: `${title + (i === 2 ? ' lorem impsum dolor sit' : '')} item ${i + 1}`,
      href: '',
      current: current === i || undefined,
      descr: getStableRandomItem(
        [
          'Lorem impsum dolor sit dolore amet',
          'Enim ad minim impsum sita met fööt dolore bleargh.',
          'Leebur deroor iehroom, bork bork bork! Enim ad minim chokolat moose flüü.',
          undefined,
          undefined,
        ],
        i * 11 + title.slice(0, 1)
      ),
    })
  ),
});

const hasMainMenu: true | undefined = true;
const hasExtraMenu: true | undefined = true;
const hasRelatedMenu: true | undefined = true;

const startOpen = false as boolean;

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('ButtonPrimary', 'ButtonSecondary');

// ---------------------------------------------------------------------------

export default function () {
  const [showAux] = showAuxState.use(true);
  const ssrOnly =
    (useSearchParams()[0].get('ssrOnly') ?? 'false') === 'false' ? undefined : 'ssr-only';

  useEffect(() => {
    startOpen &&
      setTimeout(() => {
        document.querySelector<HTMLButtonElement>('.MainMenu2__toggler')!.click();
      }, 100);
  }, []);

  return (
    <Layout
      siteName=""
      // siteName="Gagnahlaðborðið í tveimur línum"
      // siteName="Gagnahlaðborðið í tveimur línum þetta er rugl lang"
      mainChildren={
        <>
          {/* * /}
          <style>{`.foo { height: 24vh; border: 2px dotted orange;  border-width: 2px 0 0 2px; }`}</style>
          <div className="foo">...some content 1...</div>
          <div className="foo">...some content … 2...</div>
          <div className="foo">...some content … … 3 ...</div>
          <div className="foo">...some content … … … 4...</div>
          <div className="foo">...some content … … … … 5...</div>
          {/* */}
        </>
      }
      navChildren={
        <MainMenu2
          // variant="light"
          ssr={ssrOnly}
          illustration="born1"
          items={{
            main: hasMainMenu && [
              createPanelItems('Íbúar', 8, 2),
              createPanelItems('Stjórnkerfi', 5),
              createPanelItems('Atvinnulíf', 4),
              { label: 'Hverfið mitt', href: '', target: '_blank', current: false },
            ],
            hot: [
              {
                redhot: true,
                Content: () => {
                  return (
                    <>
                      <a
                        href=""
                        className="ButtonSecondary ButtonSecondary--small MainMenu2__hot__link"
                        aria-label="English"
                        data-icon="user"
                        lang="en"
                        hrefLang="en"
                        onClick={(e) => {
                          e.preventDefault();
                          const extraElm = e.currentTarget
                            .nextElementSibling as HTMLElement | null;
                          if (extraElm) {
                            extraElm.hidden = !extraElm.hidden;
                          }
                        }}
                      >
                        EN
                      </a>
                      <strong
                        hidden
                        style={{
                          position: 'absolute',
                          marginTop: '40px',
                          marginLeft: '-120px',
                        }}
                      >
                        <em>Extra Custom Content</em>
                      </strong>
                    </>
                  );
                },
              },
              // {
              //   label: <span>Yo!</span>,
              //   onClick: (item) => {
              //     console.log('onClick', item);
              //     return true;
              //   },
              // },
              { label: 'Mínar síður', href: '', icon: 'user', target: '_blank' },
            ],
            extra: hasExtraMenu && [
              { label: 'Leita', labelLong: 'Leita á vefnum', href: '', icon: 'search' },
              { label: 'Tilkynningar', href: '', icon: 'alert' },
            ],
            relatedTitle: hasRelatedMenu && 'Sérvefir',
            related: hasRelatedMenu && [
              { label: 'Græna planið', href: '', target: '_blank' },
              // { label: 'With icon', href: '', target: '_blank', icon: 'user' },
              { label: 'Gagnahlaðborðið', href: '', target: '_blank' },
              { label: 'Borgarbókasafnið', href: '', target: '_blank' },
              { label: 'Borgin okkar', href: '', target: '_blank' },
              { label: 'Borgarsögusafn Reykjavíkur ', href: '', target: '_blank' },
              { label: 'Frístundavefurinn', href: '', target: '_blank' },
              { label: 'Listasafn Reykjavíkur', href: '', target: '_blank' },
            ],
          }}
        />
      }
    />
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
      const hamburgerBtn = page.locator('.MainMenuToggler');
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
      const closeBtn = page.locator('.MainMenuToggler');
      await closeBtn.hover();
      await localScreenshot(closeBtn, 'closebtn-hover', { margin: true });
    },
  },
];

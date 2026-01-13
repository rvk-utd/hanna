import React, { Fragment, useState } from 'react';
import type { Locator } from '@playwright/test';
import type { V2_MetaFunction } from '@remix-run/node';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonSecondary } from '@reykjavik/hanna-react/ButtonSecondary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal.js';
import { keyboardFocus } from '../../test-helpers/keyboardFocus.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('ButtonPrimary', 'ButtonSecondary', 'ButtonTertiary');

const buttons = (
  buttonSize: 'small' | 'wide' | 'normal',
  variantType: 'normal' | 'destructive',
  modeToggler?: () => void
) => {
  return (
    <Fragment>
      {ObjectEntries({
        Primary: ButtonPrimary,
        Secondary: ButtonSecondary,
        Tertiary: ButtonTertiary,
      }).map(([name, ButtonComponent], i) => {
        const supportsWide = ButtonComponent !== ButtonTertiary;
        const variantName = variantType === 'normal' ? '' : 'Destructive';
        const sizeName =
          buttonSize === 'wide' ? 'Wide' : buttonSize === 'small' ? 'Small' : '';

        const sizeValue = {
          normal: undefined,
          small: 'small',
          wide: supportsWide ? 'wide' : undefined,
        }[buttonSize] as never;

        return (
          <div className={name} key={i}>
            <p>
              {ButtonComponent !== ButtonTertiary && (
                <ButtonPrimary
                  size={sizeValue}
                  variant={variantType}
                  onClick={modeToggler}
                  icon="language"
                >
                  {sizeName} {variantName} {name} Button
                </ButtonPrimary>
              )}{' '}
              <ButtonComponent
                size={sizeValue}
                variant={variantType}
                onClick={modeToggler}
              >
                {sizeName} {variantName} {name} Button
              </ButtonComponent>{' '}
              <ButtonComponent size={sizeValue} variant={variantType} disabled>
                Disabled
              </ButtonComponent>{' '}
              <ButtonComponent size={sizeValue} variant={variantType} aria-pressed="true">
                Pressed!
              </ButtonComponent>
            </p>
            <p>
              <ButtonComponent size={sizeValue} variant={variantType} href="/">
                {sizeName} {variantName} {name} Link
              </ButtonComponent>{' '}
            </p>
            <p>
              {' '}
              {variantType !== 'destructive' && (
                <ButtonComponent size={sizeValue} variant={variantType} icon="go-back">
                  Go Back
                </ButtonComponent>
              )}
              {variantType !== 'destructive' && (
                <ButtonComponent
                  size={sizeValue}
                  variant={variantType}
                  icon={'go-forward' as unknown as undefined}
                >
                  Go Forward
                </ButtonComponent>
              )}
            </p>
            <br />{' '}
          </div>
        );
      })}
    </Fragment>
  );
};

export default function () {
  const [isolationMode, setIsolationMode] = useState(false);
  const toggleIsolationMode = () => setIsolationMode((isolationMode) => !isolationMode);

  return (
    <Minimal bare>
      {buttons('normal', 'normal', toggleIsolationMode)}
      <hr />
      {buttons('small', 'normal')}
      <hr />
      {buttons('wide', 'normal')}
      <hr />
      {buttons('normal', 'destructive')}

      {isolationMode && (
        <style>{`
          div.Tertiary .ButtonTertiary {
            margin-right: 32px;
            margin-bottom: 32px;
          }
        `}</style>
      )}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, mediaFormat, expandViewport }) => {
    if (!mediaFormat('wide') && !mediaFormat('phone')) {
      return;
    }

    type BTCfg = {
      name: string;
      loc: Locator;
      click?: boolean;
      focus?: boolean;
      tertiary?: boolean;
    };
    const buttons: Array<BTCfg> = [
      // Primary buttons (default variant)
      {
        name: 'primaryButton',
        loc: page.locator('.ButtonPrimary >> nth=0'),
        click: true,
      },
      {
        name: 'primaryDisabled',
        loc: page.locator('.ButtonPrimary:text("Disabled") >> nth=0'),
        focus: false,
      },
      {
        name: 'primaryPressed',
        loc: page.locator('.ButtonPrimary:text("Pressed") >> nth=0'),
      },
      { name: 'primaryLink', loc: page.locator('.ButtonPrimary:text("Link") >> nth=0') },
      // Secondary buttons (default variant)
      {
        name: 'secondaryButton',
        loc: page.locator('.ButtonSecondary >> nth=0'),
        click: true,
      },
      {
        name: 'secondaryDisabled',
        loc: page.locator('.ButtonSecondary:text("Disabled") >> nth=0'),
        focus: false,
      },
      {
        name: 'secondaryPressed',
        loc: page.locator('.ButtonSecondary:text("Pressed") >> nth=0'),
      },
      {
        name: 'secondaryLink',
        loc: page.locator('.ButtonSecondary:text("Link") >> nth=0'),
      },
      // Tertiary buttons (default variant)
      {
        name: 'tertiaryButton',
        loc: page.locator('.ButtonTertiary >> nth=0'),
        click: true,
        tertiary: true,
      },
      {
        name: 'tertiaryDisabled',
        loc: page.locator('.ButtonTertiary:text("Disabled") >> nth=0'),
        focus: false,
        tertiary: true,
      },
      {
        name: 'tertiaryPressed',
        loc: page.locator('.ButtonTertiary:text("Pressed")>> nth=0'),
        tertiary: true,
      },
      {
        name: 'tertiaryLink',
        loc: page.locator('.ButtonTertiary:text("Link") >> nth=0'),
        tertiary: true,
      },
      // // destructive primary butttons
      {
        name: 'destr-Primary',
        loc: page.locator('.ButtonPrimary--destructive >> nth=0'),
        click: true,
      },
      {
        name: 'destr-PrimaryDisabled',
        loc: page.locator('.ButtonPrimary--destructive:text("Disabled")>> nth=0'),
        focus: false,
      },
      {
        name: 'destr-PrimaryPressed',
        loc: page.locator('.ButtonPrimary--destructive:text("Pressed")>> nth=0'),
      },
      {
        name: 'destr-PrimaryLink',
        loc: page.locator('.ButtonPrimary--destructive:text("Link") >> nth=0'),
      },

      {
        name: 'destr-Secondary',
        loc: page.locator('.ButtonSecondary--destructive >> nth=0'),
        click: true,
      },
      {
        name: 'destr-SecondaryDisabled',
        loc: page.locator('.ButtonSecondary--destructive:text("Disabled")>> nth=0'),
        focus: false,
      },
      {
        name: 'destr-SecondaryPressed',
        loc: page.locator('.ButtonSecondary--destructive:text("Pressed")>> nth=0'),
      },
      {
        name: 'destr-SecondaryLink',
        loc: page.locator('.ButtonSecondary--destructive:text("Link") >> nth=0'),
      },

      {
        name: 'destr-Tertiary',
        loc: page.locator('.ButtonTertiary--destructive >> nth=0'),
        click: true,
        tertiary: true,
      },
      {
        name: 'destr-TertiaryDisabled',
        loc: page.locator('.ButtonTertiary--destructive:text("Disabled")>> nth=0'),
        focus: false,
        tertiary: true,
      },
      {
        name: 'destr-TertiaryPressed',
        loc: page.locator('.ButtonTertiary--destructive:text("Pressed")>> nth=0'),
        tertiary: true,
      },
      {
        name: 'destr-TertiaryLink',
        loc: page.locator('.ButtonTertiary--destructive:text("Link") >> nth=0'),
        tertiary: true,
      },
    ];

    // toggleIsolationMode on
    await page.locator('.ButtonPrimary >> nth=0').click();
    await expandViewport();

    let cfg: (typeof buttons)[number] | undefined;

    let i = 0;
    /* eslint-disable no-await-in-loop */
    while ((cfg = buttons[i++])) {
      const { loc, name, click, focus = true, tertiary } = cfg;
      await loc.hover({ force: true });
      await localScreenshot(loc, `${name}-hover`, { margin: true });
      if (click) {
        await page.mouse.down();
        await localScreenshot(loc, `${name}-mousedown`, { margin: true });
        await page.mouse.move(0, 0);
        await page.mouse.up();
      }
      if (focus) {
        await keyboardFocus(loc);
        await localScreenshot(loc, `${name}-focus`, { margin: tertiary ? 20 : true });
        await page.mouse.click(0, 0);
      }
    }
    /* eslint-enable no-await-in-loop */
  },
};

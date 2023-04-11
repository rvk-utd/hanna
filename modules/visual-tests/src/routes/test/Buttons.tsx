import React, { Fragment, useState } from 'react';
import { Locator } from '@playwright/test';
import type { V2_MetaFunction } from '@remix-run/node';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonSecondary } from '@reykjavik/hanna-react/ButtonSecondary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal.js';
import { keyboardFocus } from '../../test-helpers/keyboardFocus.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route';

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
                  icon={'go-forward' as 'none'}
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
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }

    // Primary buttons (default variant)
    const primaryButton = page.locator('.ButtonPrimary >> nth=0');
    const primaryDisabled = page.locator('.ButtonPrimary:text("Disabled") >> nth=0');
    const primaryPressed = page.locator('.ButtonPrimary:text("Pressed") >> nth=0');
    const primaryLink = page.locator('.ButtonPrimary:text("Link") >> nth=0');
    // Secondary buttons (default variant)
    const secondaryButton = page.locator('.ButtonSecondary >> nth=0');
    const secondaryDisabled = page.locator('.ButtonSecondary:text("Disabled") >> nth=0');
    const secondaryPressed = page.locator('.ButtonSecondary:text("Pressed") >> nth=0');
    const secondaryLink = page.locator('.ButtonSecondary:text("Link") >> nth=0');
    // Tertiary buttons (default variant)
    const tertiaryButton = page.locator('.ButtonTertiary >> nth=0');
    const tertiaryDisabled = page.locator('.ButtonTertiary:text("Disabled") >> nth=0');
    const tertiaryPressed = page.locator('.ButtonTertiary:text("Pressed")>> nth=0');
    const tertiaryLink = page.locator('.ButtonTertiary:text("Link") >> nth=0');

    // Destructive Buttons
    const destrPrimary = page.locator('.ButtonPrimary--destructive >> nth=0');
    const destrPrimaryDisabled = page.locator(
      '.ButtonPrimary--destructive:text("Disabled")>> nth=0'
    );
    const destrPrimaryPressed = page.locator(
      '.ButtonPrimary--destructive:text("Pressed")>> nth=0'
    );
    const destrPrimaryLink = page.locator(
      '.ButtonPrimary--destructive:text("Link") >> nth=0'
    );

    const destrSecondary = page.locator('.ButtonSecondary--destructive >> nth=0');
    const destrSecondaryDisabled = page.locator(
      '.ButtonSecondary--destructive:text("Disabled")>> nth=0'
    );
    const destrSecondaryPressed = page.locator(
      '.ButtonSecondary--destructive:text("Pressed")>> nth=0'
    );
    const destrSecondaryLink = page.locator(
      '.ButtonSecondary--destructive:text("Link") >> nth=0'
    );

    const destrTertiary = page.locator('.ButtonTertiary--destructive >> nth=0');
    const destrTertiaryDisabled = page.locator(
      '.ButtonTertiary--destructive:text("Disabled")>> nth=0'
    );
    const destrTertiaryPressed = page.locator(
      '.ButtonTertiary--destructive:text("Pressed")>> nth=0'
    );
    const destrTertiaryLink = page.locator(
      '.ButtonTertiary--destructive:text("Link") >> nth=0'
    );

    // toggleIsolationMode on
    await primaryButton.click();

    type BTCfg = {
      loc: Locator;
      name: string;
      click?: boolean;
      focus?: boolean;
      tertiary?: boolean;
    };
    const buttons: Array<BTCfg> = [
      { loc: primaryButton, name: 'primaryButton', click: true },
      { loc: primaryDisabled, name: 'primaryDisabled', focus: false },
      { loc: primaryPressed, name: 'primaryPressed' },
      { loc: primaryLink, name: 'primaryLink' },

      { loc: secondaryButton, name: 'secondaryButton', click: true },
      { loc: secondaryDisabled, name: 'secondaryDisabled', focus: false },
      { loc: secondaryPressed, name: 'secondaryPressed' },
      { loc: secondaryLink, name: 'secondaryLink' },

      { loc: tertiaryButton, name: 'tertiaryButton', click: true, tertiary: true },
      {
        loc: tertiaryDisabled,
        name: 'tertiaryDisabled',
        focus: false,
        tertiary: true,
      },
      { loc: tertiaryPressed, name: 'tertiaryPressed', tertiary: true },
      { loc: tertiaryLink, name: 'tertiaryLink', tertiary: true },

      // // destructive butttons
      { loc: destrPrimary, name: 'destr-Primary', click: true },
      { loc: destrPrimaryDisabled, name: 'destr-PrimaryDisabled', focus: false },
      { loc: destrPrimaryPressed, name: 'destr-PrimaryPressed' },
      { loc: destrPrimaryLink, name: 'destr-PrimaryLink' },

      { loc: destrSecondary, name: 'destr-Secondary', click: true },
      { loc: destrSecondaryDisabled, name: 'destr-SecondaryDisabled', focus: false },
      { loc: destrSecondaryPressed, name: 'destr-SecondaryPressed' },
      { loc: destrSecondaryLink, name: 'destr-SecondaryLink' },

      { loc: destrTertiary, name: 'destr-Tertiary', click: true, tertiary: true },
      {
        loc: destrTertiaryDisabled,
        name: 'destr-TertiaryDisabled',
        focus: false,
        tertiary: true,
      },
      { loc: destrTertiaryPressed, name: 'destr-TertiaryPressed', tertiary: true },
      { loc: destrTertiaryLink, name: 'destr-TertiaryLink', tertiary: true },
    ];

    let cfg: (typeof buttons)[number] | undefined;

    let i = 0;
    /* eslint-disable no-await-in-loop */
    while ((cfg = buttons[i++])) {
      const { loc, name, click, focus = true, tertiary } = cfg;
      await loc.hover({ force: true });
      await localScreenshot(loc, name + '-hover', { margin: true });
      if (click) {
        await page.mouse.down();
        await localScreenshot(loc, name + '-mousedown', { margin: true });
        await page.mouse.move(0, 0);
        await page.mouse.up();
      }
      if (focus) {
        await keyboardFocus(loc);
        await localScreenshot(loc, name + '-focus', { margin: tertiary ? 20 : true });
        await page.mouse.click(0, 0);
      }
    }
    /* eslint-enable no-await-in-loop */
  },
};

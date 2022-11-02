import React, { Fragment } from 'react';
import { Locator } from '@playwright/test';
import type { MetaFunction } from '@remix-run/node';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonSecondary from '@reykjavik/hanna-react/ButtonSecondary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal';
import { keyboardFocus } from '../../test-helpers/keyboardFocus';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = {
  cssTokens: ['ButtonPrimary', 'ButtonSecondary', 'ButtonTertiary'],
};
const buttons = (
  buttonSize: 'small' | 'wide' | 'normal',
  variantType: 'normal' | 'destructive'
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
        }[buttonSize] as any;

        return (
          <div key={i}>
            <p>
              <ButtonComponent size={sizeValue} variant={variantType}>
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
              ) }
              {variantType !== 'destructive' && (
                <ButtonComponent
                  size={sizeValue}
                  variant={variantType}
                  icon={'go-forward' as 'none'}
                >
                  Go Forward
                </ButtonComponent>
              ) }
            </p>
            <br />{' '}
          </div>
        );
      })}
    </Fragment>
  );
};

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal bare>
      {buttons('normal', 'normal')}
      <hr />
      {buttons('small', 'normal')}
      <hr />
      {buttons('wide', 'normal')}
      <hr />
      {buttons('normal', 'destructive')}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox_wide' && project !== 'firefox_phone') {
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
      '.ButtonPrimary--destructive:test("Link") >> nth=0'
    );

    const destrSecondary = page.locator('.ButtonSecondary--destructive >> nth=0');
    const destrSecondaryDisabled = page.locator(
      '.ButtonSecondary--destructive:text("Disabled")>> nth=0'
    );
    const destrSecondaryPressed = page.locator(
      '.ButtonSecondary--destructive:text("Pressed")>> nth=0'
    );
    const destrSecondaryLink = page.locator(
      '.ButtonSecondary--destructive:test("Link") >> nth=0'
    );

    const destrTertiary = page.locator('.ButtonTertiary--destructive >> nth=0');
    const destrTertiaryDisabled = page.locator(
      '.ButtonTertiary--destructive:text("Disabled")>> nth=0'
    );
    const destrTertiaryPressed = page.locator(
      '.ButtonTertiary--destructive:text("Pressed")>> nth=0'
    );
    const destrTertiaryLink = page.locator(
      '.ButtonTertiary--destructive:test("Link") >> nth=0'
    );

    type BTCfg = {
      loc: Locator;
      name: string;
      click?: boolean;
      focus?: boolean;
      margin?: boolean;
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

      { loc: tertiaryButton, name: 'tertiaryButton', click: true, margin: false },
      { loc: tertiaryDisabled, name: 'tertiaryDisabled', focus: false, margin: false },
      { loc: tertiaryPressed, name: 'tertiaryPressed', margin: false },
      { loc: tertiaryLink, name: 'tertiaryLink', margin: false },

      // // destructive butttons
      { loc: destrPrimary, name: 'destr-Primary', click: true },
      { loc: destrPrimaryDisabled, name: 'destr-PrimaryDisabled', focus: false },
      { loc: destrPrimaryPressed, name: 'destr-PrimaryPressed' },
      { loc: destrPrimaryLink, name: 'destr-PrimaryLink' },

      { loc: destrSecondary, name: 'destr-Secondary', click: true },
      { loc: destrSecondaryDisabled, name: 'destr-SecondaryDisabled', focus: false },
      { loc: destrSecondaryPressed, name: 'destr-SecondaryPressed' },
      { loc: destrSecondaryLink, name: 'destr-SecondaryLink' },

      { loc: destrTertiary, name: 'destr-Tertiary', click: true, margin: false },
      {
        loc: destrTertiaryDisabled,
        name: 'destr-TertiaryDisabled',
        focus: false,
        margin: false,
      },
      { loc: destrTertiaryPressed, name: 'destr-TertiaryPressed', margin: false },
      { loc: destrTertiaryLink, name: 'destr-TertiaryLink', margin: false },
    ];

    let cfg: typeof buttons[number] | undefined;

    let i = 0;
    /* eslint-disable no-await-in-loop */
    while ((cfg = buttons[i++])) {
      const { loc, name, click, margin = true, focus = true } = cfg;
      await loc.hover({ force: true });
      await localScreenshot(loc, name + '-hover', { margin });
      if (click) {
        await page.mouse.down();
        await localScreenshot(loc, name + '-mousedown', { margin });
        await page.mouse.move(0, 0);
        await page.mouse.up();
      }
      if (focus) {
        await keyboardFocus(loc);
        await localScreenshot(loc, name + '-focus', { margin });
        await page.mouse.click(0, 0);
      }
    }
    /* eslint-enable no-await-in-loop */
  },
};

/* eslint-disable no-await-in-loop */
/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import { Locator } from '@playwright/test';
import type { MetaFunction } from '@remix-run/node';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonSecondary from '@reykjavik/hanna-react/ButtonSecondary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal';
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
              <ButtonComponent size={sizeValue} variant={variantType} href="">
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
  tags: ['firefox'],
  __DEV_FOCUS__:true,
  extras: async ({ page, localScreenshot }) => {
    // Primary buttons
    const primaryButton = page.locator('.ButtonPrimary >> nth = 0');
    const disabledPrimary = page.locator('.ButtonPrimary:text("Disabled") >> nth =0');
    const pressedPrimary = page.locator('.ButtonPrimary:text("Pressed") >> nth =0');
    // Secondary buttons
    const secondaryButton = page.locator('.ButtonSecondary >> nth = 0');
    const disabledSecondary = page.locator('.ButtonSecondary:text("Disabled") >> nth =0');
    const pressedSecondary = page.locator('.ButtonSecondary:text("Pressed") >> nth = 0');
    // Tertiary Buttons
    const tertiaryButton = page.locator('.ButtonTertiary >> nth=0');
    const disabledTertiary = page.locator('.ButtonTertiary:text("Disabled") >> nth=0');
    const pressedTertiary = page.locator('.ButtonTertiary:text("Pressed")>> nth=0');

    // Destructive Buttons
    const destrPrimary = page.locator('.ButtonPrimary--destructive >> nth =0');
    const destrDisabledPrim = page.locator(
      '.ButtonPrimary--destructive:text("Disabled")>> nth =0'
    );
    const destrPressedPrim = page.locator(
      '.ButtonPrimary--destructive:text("Pressed")>> nth =0'
    );
    const destrSecondary = page.locator('.ButtonSecondary--destructive >> nth =0');
    const destrDisabledSec = page.locator(
      '.ButtonSecondary--destructive:text("Disabled")>> nth =0'
    );
    const destrPressedSec = page.locator(
      '.ButtonSecondary--destructive:text("Pressed")>> nth =0'
    );
    const destrTertiary = page.locator('.ButtonTertiary--destructive >> nth=0');
    const destrDisabledTer = page.locator(
      '.ButtonTertiary--destructive:text("Disabled")>> nth =0'
    );
    const destrPressedTer = page.locator(
      '.ButtonTertiary--destructive:text("Pressed")>> nth =0'
    );

    type BTCfg = {
      loc: Locator;
      name: string;
      click?: boolean;
      margin?: boolean;
    };

    const buttonTest = async (cfg: BTCfg) => {
      const { loc, name, click, margin = true } = cfg;
      await loc.hover({ force: true });
      await localScreenshot(loc, name + '-hover', { margin });
      if (click) {
        await loc.hover();
        await page.mouse.down();
        await localScreenshot(loc, name + '-click', { margin });
      }
    };

    const buttons: Array<BTCfg> = [
      { loc: primaryButton, name: 'primaryButton', click: true },
      { loc: disabledPrimary, name: 'disabledPrimary' },
      { loc: pressedPrimary, name: 'pressedPrimary' },
      { loc: secondaryButton, name: 'secondaryButton', click: true },
      { loc: disabledSecondary, name: 'disabledSecondary' },
      { loc: pressedSecondary, name: 'pressedSecondary' },
      { loc: tertiaryButton, name: 'tertiaryButton', click: true, margin: false },
      { loc: disabledTertiary, name: 'disabledTertiary', margin: false },
      { loc: pressedTertiary, name: 'pressedTertiary', margin: false },

      // destructive butttons
      { loc: destrPrimary, name: 'destructivePrimary', click: true },
      { loc: destrDisabledPrim, name: 'destructiveDisabledPrim' },
      { loc: destrPressedPrim, name: 'destructivePressedPrim' },
      { loc: destrSecondary, name: 'destructiveSecondary', click: true },
      { loc: destrDisabledSec, name: 'destructiveDisabledSec' },
      { loc: destrPressedSec, name: 'destructivePressedSec' },
      { loc: destrTertiary, name: 'destructiveTertiary', click: true, margin: false },
      { loc: destrDisabledTer, name: 'destructiveDisabledTer', margin: false },
      { loc: destrPressedTer, name: 'destructivePressedTer', margin: false },
    ];
    let i = 0;
    let cfg: typeof buttons[number] | undefined;
    while ((cfg = buttons[i++])) {
      await buttonTest(cfg);
    }
  },
};

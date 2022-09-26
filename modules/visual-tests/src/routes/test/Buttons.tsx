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
              {variantType !== 'destructive' ? (
                <ButtonComponent size={sizeValue} variant={variantType} icon="go-back">
                  Go Back
                </ButtonComponent>
              ) : (
                ''
              )}
              {variantType !== 'destructive' ? (
                <ButtonComponent
                  size={sizeValue}
                  variant={variantType}
                  icon={'go-forward' as 'none'}
                >
                  Go Forward
                </ButtonComponent>
              ) : (
                ''
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
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
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
    const destructivePrimary = page.locator('.ButtonPrimary--destructive >> nth =0');
    const destructiveDisabledPrim = page.locator('.ButtonPrimary--destructive:text("Disabled")>> nth =0');
    const destructivePressedPrim = page.locator('.ButtonPrimary--destructive:text("Pressed")>> nth =0');
    const destructiveSecondary = page.locator('.ButtonSecondary--destructive >> nth =0');
    const destructiveDisabledSec = page.locator('.ButtonSecondary--destructive:text("Disabled")>> nth =0');
    const destructivePressedSec = page.locator('.ButtonSecondary--destructive:text("Pressed")>> nth =0');
    const destructiveTertiary = page.locator('.ButtonTertiary--destructive >> nth=0');
    const destructiveDisabledTer = page.locator('.ButtonTertiary--destructive:text("Disabled")>> nth =0');
    const destructivePressedTer = page.locator('.ButtonTertiary--destructive:text("Pressed")>> nth =0');

    const buttonTest = async (button: Locator, imgName: string, click: boolean) => {
      await button.hover({ force: true });
      await localScreenshot(button, imgName + '-hover', { margin: true });
      // if (click) {
      //   await button.hover();
      //   await page.mouse.down();
      //   await localScreenshot(button, imgName + '-click', { margin: true });
      // }
    };
    const clickTest =async (button: Locator, imgName: string) =>{
        await button.hover();
        await page.mouse.down();
        await localScreenshot(button, imgName + '-click', { margin: true });
    }

    const buttons = [
      { loc: primaryButton, imgName: 'primaryButton', clickTest: true },
      { loc: disabledPrimary, imgName: 'disabledPrimary', clickTest: false },
      { loc: pressedPrimary, imgName: 'pressedPrimary', clickTest: false },
      { loc: secondaryButton, imgName: 'secondaryButton', clickTest: true },
      { loc: disabledSecondary, imgName: 'disabledSecondary', clickTest: false },
      { loc: pressedSecondary, imgName: 'pressedSecondary', clickTest: false },
      { loc: tertiaryButton, imgName: 'tertiaryButton', clickTest: true },
      { loc: disabledTertiary, imgName: 'disabledTertiary', clickTest: false },
      { loc: pressedTertiary, imgName: 'pressedTertiary', clickTest: false },

      // destructive butttons
      { loc: destructivePrimary, imgName: 'destructivePrimary', clickTest: true },
      { loc: destructiveDisabledPrim, imgName: 'destructiveDisabledPrim', clickTest: false },
      { loc: destructivePressedPrim, imgName: 'destructivePressedPrim', clickTest: false },
      { loc: destructiveSecondary, imgName: 'destructiveSecondary', clickTest: true },
      { loc: destructiveDisabledSec, imgName: 'destructiveDisabledSec', clickTest: false },
      { loc: destructivePressedSec, imgName: 'destructivePressedSec', clickTest: false },
      { loc: destructiveTertiary, imgName: 'destructiveTertiary', clickTest: true },
      { loc: destructiveDisabledTer, imgName: 'destructiveDisabledTer', clickTest: false },
      { loc: destructivePressedTer, imgName: 'destructivePressedTer', clickTest: false },
    ];
    let i = 0;
    let button: typeof buttons[number] | undefined;
    while ((button = buttons[i++])) {
      // eslint-disable-next-line no-await-in-loop
      await buttonTest(button.loc, button.imgName, true);
      // eslint-disable-next-line no-await-in-loop
      if(button.clickTest)
      {await clickTest(button.loc,button.imgName)}
    }
  },
};

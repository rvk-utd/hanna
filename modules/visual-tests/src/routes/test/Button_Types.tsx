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
          <Fragment key={i}>
            <p>
              <ButtonComponent size={sizeValue} variant={variantType}>
                {sizeName} {variantName} {name} Button
              </ButtonComponent>{' '}
              <ButtonComponent size={sizeValue} variant={variantType} disabled>
                Disabled
              </ButtonComponent>{' '}
              <ButtonComponent
                size={buttonSize === 'wide' ? 'normal' : buttonSize}
                variant={variantType}
                aria-pressed="true"
              >
                Pressed
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
                <ButtonComponent
                  size={buttonSize === 'wide' ? 'normal' : buttonSize}
                  variant={variantType}
                  icon="go-back"
                >
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
          </Fragment>
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
  __DEV_FOCUS__: true,
  skipScreenshot: true,
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
    const disabledTertiary = page.locator('.ButtonTertiary >>nth=1');
    const pressedTertiary = page.locator('.ButtonTertiary:text("Pressed")>> nth=0');

    const buttons = [
      primaryButton,
      disabledPrimary,
      pressedPrimary,
      secondaryButton,
      disabledSecondary,
      pressedSecondary,
      tertiaryButton,
      disabledTertiary,
      pressedTertiary,
    ];
    const names = [
      'primaryButton',
      'disabledPrimary',
      'pressedPrimary',
      'secondaryButton',
      'disabledSecondary',
      'pressedSecondary',
      'tertiaryButton',
      'disabledTertiary',
      'pressedTertiary',
    ];

    //Click doesn't want to work in async .map()
    await primaryButton.hover();
    await page.mouse.down();
    await localScreenshot(primaryButton, 'primaryButton-click', { margin: true });

    await secondaryButton.hover();
    await page.mouse.down();
    await localScreenshot(secondaryButton, 'secondaryButton-click', {
      margin: true,
    });

    await tertiaryButton.hover();
    await page.mouse.down();
    await localScreenshot(tertiaryButton, 'tertiaryButton-click', { margin: true });

    const buttonTest = async (button: Locator, imgName: string) => {
      // Hover buttons
      await button.hover({ force: true });
      await localScreenshot(button, imgName + '-hover', { margin: true });
    };

    await Promise.all(
      buttons.map(async (button, i) => {
        await buttonTest(button, names[i] + '-');
      })
    );
  },
};

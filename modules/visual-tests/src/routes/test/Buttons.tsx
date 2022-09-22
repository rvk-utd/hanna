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
  //  tags: ['firefox'],
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
    const tertiaryButton = page.locator(
      '.ButtonTertiary:text("Tertiary Button") >> nth=0'
    );
    const disabledTertiary = page.locator('.ButtonTertiary >>nth=1');
    const pressedTertiary = page.locator('.ButtonTertiary:text("Pressed")>> nth=0');

    const buttonTest = async (button: Locator, imgName: string, click: boolean) => {
      await button.hover({ force: true });
      await localScreenshot(button, imgName + '-hover', { margin: true });
      if (click) {
        await button.hover();
        await page.mouse.down();
        await localScreenshot(button, imgName + '-click', { margin: true });
      }
    };

    await Promise.all([
      await buttonTest(primaryButton, 'primaryButton', true),
      await buttonTest(disabledPrimary, 'disabledPrimary', false),
      await buttonTest(pressedPrimary, 'pressedPrimary', false),
      await buttonTest(secondaryButton, 'secondaryButton', true),
      await buttonTest(disabledSecondary, 'disabledSecondary', false),
      await buttonTest(pressedSecondary, 'pressedSecondary', false),
      await buttonTest(tertiaryButton, 'tertiaryButton', true),
      await buttonTest(disabledTertiary, 'disabledTertiary', false),
      await buttonTest(pressedTertiary, 'pressedTertiary', false),
    ]);
  },
};

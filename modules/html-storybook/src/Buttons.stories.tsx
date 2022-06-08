import React, { Fragment } from 'react';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonSecondary from '@reykjavik/hanna-react/ButtonSecondary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import { ObjectEntries } from '@reykjavik/hanna-utils';
import { optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Buttons',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

// ===========================================================================

export const Buttons: StoryComponent = () => {
  const size = optionsKnob(
    'Size',
    {
      Normal: '',
      'Small size': 'small',
      'Wide variant': 'wide',
    },
    '',
    { display: 'inline-radio' }
  );

  const variant =
    optionsKnob(
      'Variant',
      {
        Normal: '',
        Destructive: 'destructive',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const variantName = variant === 'destructive' ? 'Destructive' : '';
  const sizeName = size === 'wide' ? 'Wide' : size === 'small' ? 'Small' : '';

  return (
    <>
      {ObjectEntries({
        Primary: ButtonPrimary,
        Secondary: ButtonSecondary,
        Tertiary: ButtonTertiary,
      }).map(([name, ButtonComponent], i) => {
        const supportsWide = ButtonComponent !== ButtonTertiary;
        const sizeValue = {
          '': undefined,
          small: 'small',
          wide: supportsWide ? 'wide' : undefined,
        }[size] as any;

        return (
          <Fragment key={i}>
            <p>
              <ButtonComponent size={sizeValue} variant={variant}>
                {sizeName} {variantName} {name} Button
              </ButtonComponent>{' '}
              <ButtonComponent size={sizeValue} variant={variant} disabled>
                Disabled
              </ButtonComponent>{' '}
              <ButtonComponent size={sizeValue} variant={variant} aria-pressed="true">
                Pressed
              </ButtonComponent>
            </p>
            <p>
              <ButtonComponent size={sizeValue} variant={variant} href="">
                {sizeName} {variantName} {name} Link
              </ButtonComponent>{' '}
            </p>
            <p>
              {' '}
              <ButtonComponent size={sizeValue} variant={variant} icon="go-back">
                Go Back
              </ButtonComponent>{' '}
              {/** /}
                {ButtonComponent !== ButtonTertiary && (
                  <ButtonComponent
                    size={sizeValue}
                    variant={variant}
                    icon={'edit' as never}
                  >
                    Icon
                  </ButtonComponent>
                )}{' '}
                {/**/}
              {ButtonComponent !== ButtonTertiary && (
                <ButtonComponent
                  size={sizeValue}
                  variant={variant}
                  icon={'go-forward' as 'none'}
                >
                  Go Forward
                </ButtonComponent>
              )}{' '}
            </p>
            <br />{' '}
          </Fragment>
        );
      })}

      {/** /}
			<HiddenTiger>
				<p>
					Here's how super long Tertiary Buttons line-wrap:
					<ButtonTertiary>
						Purr when being pet terrorize the hundred-and-twenty-pound rottweiler and
						steal his bed, not sorry hiss at vacuum cleaner. Walk on keyboard always
						hungry or cough hairball
					</ButtonTertiary>
					<ButtonTertiary href="">
						(link) Purr when being pet terrorize the hundred-and-twenty-pound rottweiler
						and steal his bed, not sorry hiss at vacuum cleaner. Walk on keyboard always
						hungry or cough hairball
					</ButtonTertiary>
				</p>
			</HiddenTiger>
			{/**/}
    </>
  );
};
Buttons.story = {
  parameters: {
    css: { tokens: 'ButtonPrimary,ButtonSecondary,ButtonTertiary' },
  },
};

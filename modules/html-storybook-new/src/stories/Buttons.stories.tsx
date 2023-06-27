import React, { Fragment } from 'react';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonSecondary } from '@reykjavik/hanna-react/ButtonSecondary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ObjectEntries } from '@reykjavik/hanna-utils';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const sizeOptions = ['normal', 'small', 'wide'] as const;
type Size = (typeof sizeOptions)[number];

const variantOptions = ['normal', 'destructive'] as const;
type Variant = (typeof variantOptions)[number];

type ControlProps = {
  size: Size;
  variant: Variant;
};

type Story = StoryObj<ControlProps>;

const meta: Meta = {
  title: 'buttons/Buttons',
  parameters: {
    css: { tokens: 'ButtonPrimary,ButtonSecondary,ButtonTertiary' },
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

const ButtonsStory: React.FC<ControlProps> = ({ size, variant }) => {
  const _size = size !== 'normal' ? size : '';

  const _variant = variant === 'destructive' ? variant : undefined;

  const variantName = _variant === 'destructive' ? 'Destructive' : '';
  const sizeName = _size === 'wide' ? 'Wide' : _size === 'small' ? 'Small' : '';
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
        }[_size] as any;
        // TODO: Fix any. Could be fixed with: as TertiarySize | undefined ?

        return (
          <Fragment key={i}>
            <p>
              <ButtonComponent size={sizeValue} variant={_variant}>
                {sizeName} {variantName} {name} Button
              </ButtonComponent>{' '}
              <ButtonComponent size={sizeValue} variant={_variant} disabled>
                Disabled
              </ButtonComponent>{' '}
              <ButtonComponent size={sizeValue} variant={_variant} aria-pressed="true">
                Pressed
              </ButtonComponent>
            </p>
            <p>
              <ButtonComponent size={sizeValue} variant={_variant} href="">
                {sizeName} {variantName} {name} Link
              </ButtonComponent>{' '}
            </p>
            <p>
              {' '}
              <ButtonComponent size={sizeValue} variant={_variant} icon="go-back">
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
                  variant={_variant}
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

export const _Buttons: Story = {
  render: (args: ControlProps) => <ButtonsStory {...args} />,
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
        labels: {
          normal: 'Normal',
          small: 'Small size',
          wide: 'Wide variant',
        } satisfies Record<Size, string>,
      },
      options: sizeOptions,
      name: 'Size',
    },
    variant: {
      control: {
        type: 'inline-radio',
        labels: {
          normal: 'Normal',
          destructive: 'Destructive',
        } satisfies Record<Variant, string>,
      },
      options: variantOptions,
      name: 'Variant',
    },
  },
  args: {
    size: 'normal',
    variant: 'normal',
  },
};

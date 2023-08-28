import React, { ReactNode } from 'react';

import { Button, ButtonProps, ButtonVariantProps } from './_abstract/_Button.js';

type TertiarySize = Extract<ButtonVariantProps['size'], 'normal' | 'small'>;

const sizes = {
  normal: 'normal',
  small: 'small',
} as const;

type TertiaryIcon = Extract<ButtonVariantProps['icon'], 'none' | 'go-back'>;

const icons = {
  none: 'none',
  'go-back': 'go-back',
} as const;

export type ButtonTertiaryProps = ButtonProps &
  Omit<ButtonVariantProps, 'icon' | 'size'> & {
    size?: TertiarySize;
    icon?: TertiaryIcon;
  };

// NOTE: As a `_abstract/_Button.tsx`-derived component, all `<button/>` and
// `<a/>` props are allowed directly, so adding `wrapperProps` makes no sense.

export const ButtonTertiary = (props: ButtonTertiaryProps & { children?: ReactNode }) => {
  const { size = 'normal', icon = 'none' } = props;

  return <Button bem="ButtonTertiary" {...props} size={sizes[size]} icon={icons[icon]} />;
};

export default ButtonTertiary;

import React, { ReactNode } from 'react';
import { OpenRecord } from '@reykjavik/hanna-utils';

import { Button, ButtonProps, ButtonVariantProps } from './_abstract/_Button.js';

type TertiarySize = Extract<ButtonVariantProps['size'], 'normal' | 'small'>;

const sizes = {
  normal: 'normal',
  small: 'small',
} as const;

type TertiaryIcon = Extract<ButtonVariantProps['icon'], 'go-back'>;

const icons: OpenRecord<string, TertiaryIcon> = {
  'go-back': 'go-back',
};

export type ButtonTertiaryProps = ButtonProps &
  Omit<ButtonVariantProps, 'icon' | 'size'> & {
    size?: TertiarySize;
    icon?: TertiaryIcon;
  };

// NOTE: As a `_abstract/_Button.tsx`-derived component, all `<button/>` and
// `<a/>` props are allowed directly, so adding `wrapperProps` makes no sense.

export const ButtonTertiary = (props: ButtonTertiaryProps & { children?: ReactNode }) => {
  const { size = 'normal', icon = '' } = props;

  return <Button bem="ButtonTertiary" {...props} size={sizes[size]} icon={icons[icon]} />;
};

export default ButtonTertiary;

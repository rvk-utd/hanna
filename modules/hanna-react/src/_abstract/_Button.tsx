import React, { ReactNode } from 'react';
import { BemProps, BemPropsModifier } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { OpenStringMap } from '@reykjavik/hanna-utils';

import { Link } from './_Link';

type ButtonElmProps = {
  href?: never;
} & BemPropsModifier &
  Omit<JSX.IntrinsicElements['button'], 'className' | 'style'>;

type AnchorElmProps = {
  href: string;
  type?: never;
  name?: never;
  value?: never;
} & BemPropsModifier &
  Omit<JSX.IntrinsicElements['a'], 'className' | 'style'>;

export type ButtonProps = {
  /** Label takes preference over `children` */
  label?: string | JSX.Element;
} & (ButtonElmProps | AnchorElmProps);

// ---------------------------------------------------------------------------

const sizes = {
  normal: '',
  small: 'small',
  wide: 'wide',
} as const;
type ButtonSize = keyof typeof sizes;

// ---------------------------------------------------------------------------

const variants = {
  normal: '',
  destructive: 'destructive',
} as const;
type ButtonVariant = keyof typeof variants;

// ---------------------------------------------------------------------------

type NavigationFlag = 'none' | 'go-back' | 'go-forward';
const navigationFlags: OpenStringMap<NavigationFlag, string> = {
  none: '',
  'go-back': 'go--back',
  'go-forward': 'go--forward',
};

// ---------------------------------------------------------------------------

// type ButtonIcon = never;
type ButtonIcon = 'edit';
const icons: OpenStringMap<ButtonIcon> = {
  // TODO: insert icons
  edit: 'edit',
};

// ---------------------------------------------------------------------------

export type ButtonVariantProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ButtonIcon | NavigationFlag;

  /** @deprecated (Will be removed in v0.11) */
  small?: boolean;
};

type _ButtonProps = ButtonProps &
  ButtonVariantProps &
  BemProps & { children?: ReactNode };

const Button = (props: _ButtonProps) => {
  const {
    bem,
    small,
    size = 'normal',
    modifier,
    children,
    variant = 'normal',
    icon = 'none',
    label = children,
    ...buttonProps
  } = props;

  const className =
    bem &&
    getBemClass(bem, [modifier, variants[variant], sizes[size], navigationFlags[icon]]);

  const iconProp = icons[icon] && { 'data-icon': icons[icon] };

  if (buttonProps.href != null) {
    return (
      <Link className={className} {...buttonProps} style={undefined} {...iconProp}>
        {label}
      </Link>
    );
  } else {
    return (
      <button
        className={className}
        type="button"
        {...(buttonProps as ButtonElmProps)}
        style={undefined}
        {...iconProp}
      >
        {label}
      </button>
    );
  }
};

export default Button;

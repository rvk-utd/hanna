import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { OpenStringMap } from '@reykjavik/hanna-utils';

import { BemModifierProps, BemProps } from '../utils/types.js';

import { Link } from './_Link.js';

type ButtonElmProps = {
  href?: never;
} & BemModifierProps &
  JSX.IntrinsicElements['button'];

type AnchorElmProps = {
  href: string;
  type?: never;
  name?: never;
  value?: never;
} & BemModifierProps &
  JSX.IntrinsicElements['a'];

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

  /** @deprecated Use `size="small"` instead  (Will be removed in v0.11) */
  small?: boolean;
};

type _ButtonProps = ButtonProps &
  ButtonVariantProps &
  BemProps & { children?: ReactNode };

// NOTE: As this component already accepts all `<button/>` and `<a/>` props
// directly, it makes little sense to add support for `wrapperProps` on top.

export const Button = (props: _ButtonProps) => {
  const {
    bem,
    small, // eslint-disable-line deprecation/deprecation
    size = small ? 'small' : 'normal',
    modifier,
    children,
    variant = 'normal',
    icon = 'none',
    label = children,
    ...buttonProps
  } = props;

  const className =
    bem &&
    modifiedClass(
      bem,
      [modifier, variants[variant], sizes[size], navigationFlags[icon]],
      props.className
    );

  const iconProp = icons[icon] && { 'data-icon': icons[icon] };

  if (buttonProps.href != null) {
    return (
      <Link {...buttonProps} className={className} {...iconProp}>
        {label}
      </Link>
    );
  } else {
    return (
      <button
        type="button"
        {...(buttonProps as ButtonElmProps)}
        className={className}
        {...iconProp}
      >
        {label}
      </button>
    );
  }
};

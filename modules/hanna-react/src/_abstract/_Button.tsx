import React, { ComponentProps, ReactElement, ReactNode } from 'react';
import { IconToken } from '@reykjavik/hanna-css';
import { modifiedClass, OpenStringMap } from '@reykjavik/hanna-utils';

import { BemModifierProps, BemProps } from '../utils/types.js';

import { Link } from './_Link.js';

type ButtonElmProps = {
  href?: never;
} & BemModifierProps &
  ComponentProps<'button'>;

type AnchorElmProps = {
  href: string;
  type?: never;
  name?: never;
  value?: never;
} & BemModifierProps &
  ComponentProps<'a'>;

export type ButtonProps = {
  /** Label takes preference over `children` */
  label?: string | ReactElement;
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

type NavigationFlag = 'go-back' | 'go-forward';
const navigationFlags: OpenStringMap<NavigationFlag, string> = {
  'go-back': 'go--back',
  'go-forward': 'go--forward',
};

// ---------------------------------------------------------------------------

/** @deprecated (Will be removed in v0.11) */
export type ButtonIcon = 'edit';

// ---------------------------------------------------------------------------

export type ButtonVariantProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: NavigationFlag | IconToken;

  /** @deprecated Use `size="small"` instead  (Will be removed in v0.11) */
  small?: boolean;
};

type _ButtonProps = ButtonProps &
  ButtonVariantProps &
  BemProps & { children?: ReactNode; as?: 'summary' };

// NOTE: As this component already accepts all `<button/>` and `<a/>` props
// directly, it makes little sense to add support for `wrapperProps` on top.

export const Button = (props: _ButtonProps) => {
  const {
    as: CustomTag,
    bem,
    small, // eslint-disable-line deprecation/deprecation
    size = small ? 'small' : 'normal',
    modifier,
    children,
    variant = 'normal',
    icon,
    label = children,
    ...buttonProps
  } = props;

  const className =
    bem &&
    modifiedClass(
      bem,
      [modifier, variants[variant], sizes[size], navigationFlags[icon || '']],
      props.className
    );

  const iconProp: IconToken | undefined =
    icon && !(icon in navigationFlags)
      ? (icon as IconToken)
      : (props['data-icon' as keyof ButtonProps] as IconToken);

  if (CustomTag) {
    return (
      <CustomTag {...buttonProps} className={className} data-icon={iconProp}>
        {label}
      </CustomTag>
    );
  }
  if (buttonProps.href != null) {
    return (
      <Link {...buttonProps} className={className} data-icon={iconProp}>
        {label}
      </Link>
    );
  } else {
    return (
      <button
        type="button"
        {...(buttonProps as ButtonElmProps)}
        className={className}
        data-icon={iconProp}
      >
        {label}
      </button>
    );
  }
};

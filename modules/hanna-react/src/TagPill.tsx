import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { EitherObj } from '@reykjavik/hanna-utils';

import { Button, ButtonProps } from './_abstract/_Button';

const colors = {
  normal: '',
  green: 'color--green',
  yellow: 'color--yellow',
  orange: 'color--orange',
  red: 'color--red',
} as const;
export type TagPillColor = keyof typeof colors;

export type TagPillProps = ButtonProps & {
  children?: ReactNode;
  large?: boolean;
  color?: TagPillColor;
} & EitherObj<
    {
      removable?: false;
    },
    {
      removable: true;
      onRemove?: () => void;
      removeLabel?: string;
      removeLabelLong?: string;
    }
  >;

export const TagPill = (props: TagPillProps) => {
  const {
    modifier,
    large,
    removable,
    onRemove,
    children,
    color = 'normal',
    label = children,
    removeLabel = 'x',
    removeLabelLong = removeLabel,
    ...buttonProps
  } = props;
  const isStatic = !('href' in props || 'type' in props || props.onClick);

  process.env.NODE_ENV !== 'production' &&
    removable &&
    isStatic &&
    !onRemove &&
    console.warn(
      'Removable static (non-button) `TagPill`s ' +
        'must have an `onRemove` handler defined'
    );

  const modifiers = [modifier, large && 'large', colors[color]];
  const removeBtn = removable && (
    <button
      className="TagPill__remove"
      onClick={onRemove && (() => onRemove())}
      aria-label={removeLabelLong}
      type="button"
    >
      {removeLabel}
    </button>
  );

  return isStatic ? (
    <span className={getBemClass('TagPill', modifiers)} {...buttonProps}>
      {label} {removeBtn}
    </span>
  ) : onRemove ? (
    <span className={getBemClass('TagPill', modifiers)}>
      <Button bem="TagPill__button" {...buttonProps}>
        {label}
      </Button>{' '}
      {removeBtn}
    </span>
  ) : (
    <Button bem="TagPill" {...buttonProps} modifier={modifiers}>
      {label}{' '}
      {removable && (
        <span className="TagPill__remove" aria-label={removeLabelLong}>
          {removeLabel}
        </span>
      )}
    </Button>
  );
};

export default TagPill;

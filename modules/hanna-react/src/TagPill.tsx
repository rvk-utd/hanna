import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import Button, { ButtonProps } from './_abstract/Button';

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
} & (
    | {
        removable?: false;
        onRemove?: never;
        removeLabel?: never;
        removeLabelLong?: never;
      }
    | {
        removable: true;
        onRemove?: () => void;
        removeLabel?: string;
        removeLabelLong?: string;
      }
  );

const TagPill = (props: TagPillProps) => {
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
    console.warn('static (non-button) `TagPill`s must not be removable');

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
    <span className={getBemClass('TagPill', modifiers)}>
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

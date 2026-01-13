import React from 'react';
import { classes } from '@reykjavik/hanna-utils';

import { IconToken } from '../../hanna-css/src/iconfontTokens.js';

import { HTMLProps } from './utils.js';

export type IconProps = {
  type: IconToken;
  size?: 'small' | 'normal' | 'large';
} & HTMLProps<'span'>;

export const Icon = (props: IconProps) => {
  const { className, type, size = 'normal', ...rest } = props;

  return (
    <span
      {...rest}
      className={classes('Icon', props.className)}
      data-icon={type}
      data-icon-size={size !== 'normal' ? size : undefined}
    />
  );
};

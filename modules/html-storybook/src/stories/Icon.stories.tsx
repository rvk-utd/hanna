import React, { Fragment } from 'react';
import { Icon, IconProps } from '@reykjavik/hanna-react/Icon';
import { Equals, Expect } from '@reykjavik/hanna-utils';
import { Meta, StoryObj } from '@storybook/react';

const sizeOptions = ['small', 'medium', 'large'] as const;

type IconSize = (typeof sizeOptions)[number];

type _ = Expect<Equals<IconSize, NonNullable<IconProps['size']>>>;

type ControlProps = {
  size: IconSize;
};

const meta: Meta<ControlProps> = {
  title: 'Icon',
};
export default meta;

export const _Icon: StoryObj<ControlProps> = {
  render: (props) => (
    <Fragment>
      <Icon type="category" size={props.size} />
      <div>
        <Icon type="logout" size={props.size} />
        Some Text
      </div>
    </Fragment>
  ),
  argTypes: {
    size: {
      name: 'Size',
      options: sizeOptions,
      control: {
        type: 'inline-radio',
      },
    },
  },
  args: {
    size: 'medium',
  },
};

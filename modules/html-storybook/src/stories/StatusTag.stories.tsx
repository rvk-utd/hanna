import React, { Fragment } from 'react';
import { StatusTag, StatusTagColor } from '@reykjavik/hanna-react/StatusTag';
import { capitalize, Equals, Expect } from '@reykjavik/hanna-utils';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  lightOff: boolean;
  large: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'StatusTag',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const colors = [undefined, 'blue', 'green', 'yellow', 'red'] as const;
type _ = Expect<
  Equals<(typeof colors)[number], Exclude<StatusTagColor, 'none'> | undefined>
>;

export const _StatusTag: StoryObj<ControlProps> = {
  render: (args) => {
    const { lightOff, large } = args;

    return (
      <Fragment key={`${lightOff}:${large}`}>
        {colors.map((color) => (
          <StatusTag
            key={color}
            color={color}
            light={lightOff ? 'off' : undefined}
            large={large}
            label={capitalize(color || 'default')}
          />
        ))}
      </Fragment>
    );
  },
  argTypes: {
    lightOff: { name: 'Turn off "lightbulp"' },
    large: { name: 'Large variant' },
  },
  args: {
    lightOff: false,
    large: false,
  },
};

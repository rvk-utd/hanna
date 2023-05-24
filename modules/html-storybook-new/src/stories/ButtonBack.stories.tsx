import React from 'react';
import { ButtonBack } from '@reykjavik/hanna-react/ButtonBack';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonBack> = {
  title: 'buttons/ButtonBack',
  component: ButtonBack,
};
export default meta;

type Story = StoryObj<typeof ButtonBack>;

const Component = () => {
  return (
    <>
      <p>
        <ButtonBack>Button Back</ButtonBack>
        <ButtonBack disabled>Disabled</ButtonBack>
      </p>
      <br />
      <p>
        <ButtonBack href="">Link Back</ButtonBack>{' '}
      </p>
    </>
  );
};

export const _ButtonBack: Story = {
  render: () => <Component />,
  name: 'ButtonBack',
};

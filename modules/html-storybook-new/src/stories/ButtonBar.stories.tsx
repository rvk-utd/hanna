import React from 'react';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonSecondary } from '@reykjavik/hanna-react/ButtonSecondary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Meta, StoryObj } from '@storybook/react';

type ButtonBarControlProps = {
  rightAlignedButtons: boolean;
};
type Story = StoryObj<ButtonBarControlProps>;

const meta: Meta<ButtonBarControlProps> = {
  title: 'buttons/ButtonBar',
  parameters: {
    css: { tokens: 'ButtonBar,ButtonPrimary,ButtonSecondary,ButtonTertiary' },
  },
};
export default meta;

const ButtonBarStory: React.FC<ButtonBarControlProps> = ({ rightAlignedButtons }) => {
  const align = rightAlignedButtons ? 'right' : undefined;
  return (
    <>
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>

      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonBar.Split />
        <ButtonTertiary>To the Right</ButtonTertiary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>

      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary>To the Left</ButtonTertiary>
        <ButtonBar.Split />
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>

      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
      </ButtonBar>

      <hr />

      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonSecondary>Middle</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonPrimary>To the Right</ButtonPrimary>
      </ButtonBar>

      <hr />

      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        <span>Random content</span>
        <ButtonBar.Split />
        <ButtonSecondary>Middle …ish</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonPrimary>To the Right</ButtonPrimary>
      </ButtonBar>

      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary>Eins</ButtonPrimary>
        <ButtonSecondary>Zwei</ButtonSecondary>
        <ButtonTertiary>Drei</ButtonTertiary>
      </ButtonBar>

      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
        <ButtonBar.Split />
        <ButtonSecondary>Uno</ButtonSecondary>
        <ButtonSecondary>Dos</ButtonSecondary>
        <ButtonSecondary>Tres</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonSecondary>Cuatro</ButtonSecondary>
      </ButtonBar>

      {/* Testing Dev Warnings * /}
      <hr />
      <ButtonBar align={align}>
        <span>Should Warn</span>
      </ButtonBar>
      <ButtonBar align={align}>
        <span>This</span>
        <ButtonBar.Split />
        <span>Should Warn</span>
      </ButtonBar>
      <ButtonBar align={align}>
        <ButtonBar.Split />
        <ButtonSecondary>OK</ButtonSecondary>
      </ButtonBar>
      <ButtonBar align={align}>
        <ButtonBar.Split />
        <ButtonTertiary>OK</ButtonTertiary>
      </ButtonBar>
      {/**/}
    </>
  );
};

export const _ButtonBar: Story = {
  render: (args: ButtonBarControlProps) => <ButtonBarStory {...args} />,
  argTypes: {
    rightAlignedButtons: {
      control: 'boolean',
      name: 'Right-aligned buttons',
    },
  },
  args: {
    rightAlignedButtons: false,
  },
};

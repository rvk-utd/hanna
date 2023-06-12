import React, { useState } from 'react';
import { Bling } from '@reykjavik/hanna-react/Bling';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Modal } from '@reykjavik/hanna-react/Modal';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { Meta, StoryObj } from '@storybook/react';

const widthOptions = ['auto', 'narrow', 'medium', 'wide'] as const;
type Width = (typeof widthOptions)[number];

type ModalControlProps = {
  width: Width;
  blingDecoration: boolean;
  open: boolean;
};
type ModalDynamicsControlProps = Omit<ModalControlProps, 'open'>;

type ModalStory = StoryObj<ModalControlProps>;
type ModalDynamicsStory = StoryObj<ModalDynamicsControlProps>;

const meta: Meta<ModalControlProps> = {
  title: 'Modal',
};
export default meta;

const renderBling = () => (
  <Bling type="circle-waves-vertical" align="right" parent="top" vertical="down" />
);

const getKnobValues = (blingDecoration: boolean, width: Width) => {
  const bling = blingDecoration || undefined;
  let modifier: 'w6' | 'w8' | 'w10' | undefined;
  switch (width) {
    case 'auto':
      modifier = undefined;
      break;
    case 'narrow':
      modifier = 'w6';
      break;
    case 'medium':
      modifier = 'w8';
      break;
    case 'wide':
      modifier = 'w10';
      break;
  }
  return { modifier, bling };
};

const ModalStory: React.FC<ModalControlProps> = ({ width, open, blingDecoration }) => {
  const { modifier, bling } = getKnobValues(blingDecoration, width);

  const key = open + (modifier || '');
  return (
    <Modal
      key={key}
      modifier={modifier}
      open={open}
      startOpen={open}
      onClosed={() => undefined}
      portal={false}
      bling={bling && renderBling()}
    >
      <p>Modal content...</p>
    </Modal>
  );
};

const sharedArgTypes = {
  width: {
    control: {
      type: 'inline-radio',
      labels: {
        auto: 'Auto',
        narrow: 'Narrow',
        medium: 'Medium',
        wide: 'Wide',
      },
    },
    options: widthOptions,
    name: 'Width',
  },
  blingDecoration: {
    control: 'boolean',
    name: 'Bling decoration',
  },
};

export const _Modal: ModalStory = {
  render: (args: ModalControlProps) => <ModalStory {...args} />,
  argTypes: {
    ...sharedArgTypes,
    open: {
      control: 'boolean',
      name: 'Open',
    },
  },
  args: {
    width: 'wide',
    blingDecoration: false,
    open: true,
  },
};

const ModalDynamicsStory: React.FC<ModalDynamicsControlProps> = ({
  blingDecoration,
  width,
}) => {
  const { modifier, bling } = getKnobValues(blingDecoration, width);
  const [open, setOpen] = useState(true);
  const openModal = () => setOpen(true);
  // FIXME: fadeout is missing if closed by external triggers
  const closeModal = () => setOpen(false);
  return (
    <>
      <ButtonPrimary onClick={() => openModal()}>Opna modal</ButtonPrimary>

      <Modal
        modifier={modifier}
        open={open}
        onClosed={closeModal}
        startOpen
        portal={false}
        fickle={false}
        bling={bling && renderBling()}
        render={({ closeModal }) => {
          return (
            <>
              <Heading>Ertu viss?</Heading>
              <TextBlock>
                <p>
                  Athugið að þegar hætt er við umsókn mun hún ekki vistast og þú munt
                  þurfa að byrja upp á nýtt.
                </p>
              </TextBlock>
              <ButtonBar>
                <ButtonPrimary onClick={closeModal}>
                  Nei, halda áfram með umsókn
                </ButtonPrimary>{' '}
                <ButtonTertiary onClick={closeModal}>
                  Ég er viss, hætta við umsókn
                </ButtonTertiary>
              </ButtonBar>
              {'\n\n'}
            </>
          );
        }}
      />
    </>
  );
};

export const _ModalDynamics: ModalDynamicsStory = {
  render: (args: ModalDynamicsControlProps) => <ModalDynamicsStory {...args} />,
  argTypes: {
    ...sharedArgTypes,
  },
  args: {
    width: 'wide',
    blingDecoration: false,
  },
  parameters: {
    css: {
      tokens: 'Modal,ButtonPrimary,ButtonTertiary,Heading,TextBlock,Bling',
    },
  },
};

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

const renderBling = () => (
  <Bling type="circle-waves-vertical" align="right" parent="top" vertical="down" />
);

type ControlProps = {
  width: Width;
  blingDecoration: boolean;
} /* & ThemeControlProps */;

// ==================== Modal ===========================================

const meta: Meta<ControlProps> = {
  title: 'Modal',
  argTypes: {
    width: {
      name: 'Width',
      options: widthOptions,
      control: {
        type: 'inline-radio',
        labels: {
          auto: 'Auto',
          narrow: 'Narrow',
          medium: 'Medium',
          wide: 'Wide',
        } satisfies Record<ControlProps['width'], string>,
      },
    },
    blingDecoration: { name: 'Bling decoration' },
    // ...themeArgTypes,
  },
  args: {
    width: 'wide',
    blingDecoration: false,
  },
};
export default meta;

// ---------------------------------------------------------------------------

type ModalControlProps = ControlProps & { open: boolean };

const ModalStory = (props: ModalControlProps) => {
  const { width, blingDecoration, open } = props;
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

export const _Modal: StoryObj<ModalControlProps> = {
  render: (args) => <ModalStory {...args} />,
  argTypes: {
    open: { name: 'Open' },
  },
  args: {
    open: true,
  },
};

// ==================== Modal Dynamics ===========================================

type ModalDynamicsControlProps = ControlProps;

const ModalDynamicsStory = (props: ModalDynamicsControlProps) => {
  const { modifier, bling } = getKnobValues(props.blingDecoration, props.width);
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

export const _ModalDynamics: StoryObj<ModalDynamicsControlProps> = {
  render: (args) => <ModalDynamicsStory {...args} />,
  argTypes: {},
  args: {},
  parameters: {
    css: { tokens: 'Modal,ButtonPrimary,ButtonTertiary,Heading,TextBlock,Bling' },
  },
};

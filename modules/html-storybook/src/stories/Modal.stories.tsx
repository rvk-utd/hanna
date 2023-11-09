import React, { useState } from 'react';
import { Bling } from '@reykjavik/hanna-react/Bling';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Modal, ModalProps } from '@reykjavik/hanna-react/Modal';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { Meta, StoryObj } from '@storybook/react';

const widthOptions = ['auto', 'narrow', 'medium', 'wide'] as const;
type Width = (typeof widthOptions)[number];

const modifiers = {
  auto: undefined,
  narrow: 'w6',
  medium: 'w8',
  wide: 'w10',
} satisfies Record<Width, ModalProps['modifier']>;

const getKnobValues = (args: ControlProps) => ({
  modifier: modifiers[args.width],
  noCloseButton: args.noCloseButton,
  bling: args.bling || undefined,
});

const renderBling = () => (
  <Bling type="circle-waves-vertical" align="right" parent="top" vertical="down" />
);

type ControlProps = {
  width: Width;
  noCloseButton: boolean;
  bling: boolean;
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
    noCloseButton: { name: 'No close button' },
    bling: { name: 'Bling decoration' },
    // ...themeArgTypes,
  },
  args: {
    width: 'wide',
    noCloseButton: false,
    bling: false,
  },
};
export default meta;

// ---------------------------------------------------------------------------

type ModalControlProps = ControlProps & { open: boolean };

export const _Modal: StoryObj<ModalControlProps> = {
  render: (args) => {
    const { open } = args;
    const { bling, modifier, noCloseButton } = getKnobValues(args);

    const key = [open, modifier, noCloseButton].join('|');
    return (
      <Modal
        key={key}
        modifier={modifier}
        open={open}
        startOpen={open}
        noCloseButton={noCloseButton}
        onClosed={() => undefined}
        portal={false}
        bling={bling && renderBling()}
      >
        <p>Modal content...</p>
      </Modal>
    );
  },
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
  const { bling, modifier, noCloseButton } = getKnobValues(props);
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
        noCloseButton={noCloseButton}
        portal={false}
        stable
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

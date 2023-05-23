import React, { useState } from 'react';
import { Bling } from '@reykjavik/hanna-react/Bling';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Modal } from '@reykjavik/hanna-react/Modal';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'components/Modal',
  component: Modal,
};
export default meta;

type Story = StoryObj<typeof Modal>;

const renderBling = () => (
  <Bling type="circle-waves-vertical" align="right" parent="top" vertical="down" />
);

const getKnobValues = () => ({
  modifier:
    optionsKnob(
      'Width',
      {
        Auto: '',
        Narrow: 'w6',
        Medium: 'w8',
        Wide: 'w10',
      },
      'w10',
      {
        display: 'inline-radio',
      }
    ) || undefined,
  bling: boolean('"Bling" decoration', false) || undefined,
});

const ModalComponent = () => {
  const { modifier, bling } = getKnobValues();
  const open = boolean('Open', true);

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

export const _Modal: Story = {
  render: () => <ModalComponent />,
};

const ModalDynamicsComponent = () => {
  const { modifier, bling } = getKnobValues();
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

export const _ModalDynamics: Story = {
  render: () => <ModalComponent />,
};

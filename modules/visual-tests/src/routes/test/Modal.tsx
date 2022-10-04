import React, { Fragment, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import ButtonBar from '@reykjavik/hanna-react/ButtonBar';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import Heading from '@reykjavik/hanna-react/Heading';
import Modal, { ModalProps } from '@reykjavik/hanna-react/Modal';
import TextBlock from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;
// // Use `handle` if you're using multiple Hanna compnents
export const handle = {
  cssTokens: ['Modal,ButtonPrimary,ButtonTertiary,Heading,TextBlock,Bling'],
};

const mod: ModalProps['modifier'] = 'w8';
export default function () {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [value, setValue] = useState(mod);

  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <Fragment>
        <ButtonPrimary
          onClick={() => {
            setValue('w8');
            openModal();
          }}
        >
          Opna modal
        </ButtonPrimary>
        <ButtonPrimary
          onClick={() => {
            setValue('w6');
            openModal();
          }}
        >
          Opna modal narrow
        </ButtonPrimary>
        <ButtonPrimary
          onClick={() => {
            setValue('w10');
            openModal();
          }}
        >
          Opna modal wide
        </ButtonPrimary>
        <Modal
          modifier={value}
          open={open}
          onClosed={closeModal}
          startOpen
          portal={false}
          fickle={false}
          render={({ closeModal }) => {
            return (
              <Fragment>
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
              </Fragment>
            );
          }}
        />
      </Fragment>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  skipScreenshot: true,
  extras: async ({ page, localScreenshot, setViewportSize }) => {
    const button = page.locator('.ButtonPrimary:text("Opna modal") >> nth=0');
    const buttonNarrow = page.locator('.ButtonPrimary:text("Opna modal narrow")');
    const buttonWide = page.locator('.ButtonPrimary:text("Opna modal wide")');
    const modal = page.locator('.Layout');
    const modalCloseBtn = page.locator('.Modal__closebutton');

    await setViewportSize(1000);
    await button.click();
    await localScreenshot(modal, 'open-modal', { margin: 100 });
    await modalCloseBtn.click();

    await page.waitForTimeout(800);
    await buttonNarrow.click();
    await localScreenshot(modal, 'open-narrow-modal', { margin: 100 });

    await modalCloseBtn.click();

    await page.waitForTimeout(800);
    await buttonWide.click();
    await localScreenshot(modal, 'open-wide-modal', { margin: 100 });
  },
};

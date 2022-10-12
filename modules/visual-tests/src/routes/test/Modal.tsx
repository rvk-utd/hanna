import React, { Fragment, useState } from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import Bling from '@reykjavik/hanna-react/Bling';
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
  cssTokens: ['Modal,ButtonPrimary,ButtonTertiary,Heading,TextBlock, Bling'],
};
const renderBling = () => (
  <Bling type="circle-waves-vertical" align="right" parent="top" vertical="down" />
);
const mod: ModalProps['modifier'] = 'w8';
export default function () {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [value, setValue] = useState(mod);

  const buttonText = ['Open modal', 'Open narrow modal', 'Open wide modal'];
  const render = value === 'w8';
  const buttons = range(0, 2).map((i) => {
    return (
      <span key={i}>
        <ButtonPrimary
          onClick={() => {
            i === 0 ? setValue('w8') : i === 1 ? setValue('w6') : setValue('w10');
            openModal();
          }}
        >
          {buttonText[i]}
        </ButtonPrimary>
      </span>
    );
  });

  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <Fragment>
        {buttons}
        <Modal
          modifier={value}
          open={open}
          onClosed={closeModal}
          startOpen
          portal={false}
          fickle={false}
          bling={render ? renderBling() : undefined}
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
  extras: async ({ page, localScreenshot, setViewportSize }) => {
    const button = page.locator('.ButtonPrimary:text("Open Modal") >> nth=0');
    const buttonNarrow = page.locator('.ButtonPrimary:text("Open narrow modal")');
    const buttonWide = page.locator('.ButtonPrimary:text("Open wide modal")');
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

import React, { Fragment, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import Bling from '@reykjavik/hanna-react/Bling';
import ButtonBar from '@reykjavik/hanna-react/ButtonBar';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import Heading from '@reykjavik/hanna-react/Heading';
import Modal, { ModalProps } from '@reykjavik/hanna-react/Modal';
import TextBlock from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../../layout/Minimal';
import { loremRT } from '../../test-helpers/dummyData';
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

export default function () {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [widthModifier, setWidth] = useState<ModalProps['modifier']>('w8');

  const buttons = ['Open modal', 'Open narrow modal', 'Open wide modal'].map(
    (buttonText, i) => {
      return (
        <span key={i}>
          <ButtonPrimary
            onClick={() => {
              i === 0 ? setWidth('w8') : i === 1 ? setWidth('w6') : setWidth('w10');
              openModal();
            }}
          >
            {buttonText}
          </ButtonPrimary>
        </span>
      );
    }
  );

  return (
    <Minimal>
      <Fragment>
        {buttons}
        <Modal
          modifier={widthModifier}
          open={open}
          onClosed={closeModal}
          startOpen
          bling={widthModifier === 'w8' ? renderBling() : undefined}
          render={({ closeModal }) => {
            return (
              <Fragment>
                <Heading>Ertu viss?</Heading>
                <TextBlock>
                  <p>
                    Athugið að þegar hætt er við umsókn mun hún ekki vistast og þú munt
                    þurfa að byrja upp á nýtt.
                  </p>
                  {widthModifier === 'w10' && <p>{loremRT.long(true)}</p>}
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
  viewportMinHeight: 1000,
  skipScreenshot: true,
  extras: async ({ page, pageScreenshot }) => {
    const button = page.locator('.ButtonPrimary:text-is("Open Modal")');
    const buttonNarrow = page.locator('.ButtonPrimary:text-is("Open narrow modal")');
    const buttonWide = page.locator('.ButtonPrimary:text-is("Open wide modal")');

    const modalCloseBtn = page.locator('.Modal__closebutton');

    await button.click();
    await pageScreenshot('medium');

    await modalCloseBtn.click();
    await page.waitForTimeout(800);

    await buttonNarrow.click();
    await pageScreenshot('narrow');

    await modalCloseBtn.click();
    await page.waitForTimeout(800);

    await buttonWide.click();
    await pageScreenshot('wide');
  },
};

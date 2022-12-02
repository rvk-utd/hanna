import React, { Fragment, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Bling } from '@reykjavik/hanna-react/Bling';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import { ButtonSecondary } from '@reykjavik/hanna-react/ButtonSecondary';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Modal, ModalProps } from '@reykjavik/hanna-react/Modal';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../../layout/Minimal';
import { loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;
// // Use `handle` if you're using multiple Hanna compnents
export const handle = {
  cssTokens: ['Modal,ButtonSecondary,ButtonTertiary,Heading,TextBlock, Bling'],
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
          <ButtonSecondary
            size="small"
            onClick={() => {
              i === 0 ? setWidth('w8') : i === 1 ? setWidth('w6') : setWidth('w10');
              openModal();
            }}
          >
            {buttonText}
          </ButtonSecondary>
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
                  <ButtonSecondary onClick={closeModal}>
                    Nei, halda áfram með umsókn
                  </ButtonSecondary>{' '}
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
  extras: async ({ page, pageScreenshot, localScreenshot, project }) => {
    const button = page.locator('.ButtonSecondary:text-is("Open modal")');
    const buttonNarrow = page.locator('.ButtonSecondary:text-is("Open narrow modal")');
    const buttonWide = page.locator('.ButtonSecondary:text-is("Open wide modal")');

    const modalCloseBtn = page.locator('.Modal__closebutton');

    await button.click();
    await page.mouse.move(0, 0);
    await pageScreenshot('medium');

    await modalCloseBtn.click();
    await page.waitForTimeout(800);

    await buttonNarrow.click();
    await page.mouse.move(0, 0);
    await pageScreenshot('narrow');

    await modalCloseBtn.click();
    await page.waitForTimeout(800);

    await buttonWide.click();
    await page.mouse.move(0, 0);
    await pageScreenshot('wide');

    if (project === 'firefox-wide' || project === 'firefox-phone') {
      await modalCloseBtn.hover();
      await localScreenshot(modalCloseBtn, 'closebutton-hover', { margin: true });
    }
  },
};

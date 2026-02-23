import React, { Fragment, useState } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Bling } from '@reykjavik/hanna-react/Bling';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import { ButtonSecondary } from '@reykjavik/hanna-react/ButtonSecondary';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Modal, ModalProps } from '@reykjavik/hanna-react/Modal';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../../layout/Minimal.js';
import { loremRT } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens(
  'Modal',
  'ButtonSecondary',
  'ButtonTertiary',
  'Heading',
  'TextBlock',
  'Bling'
);

type ModalData = {
  id: string;
  buttonText: string;
  width: ModalProps['modifier'];
  bling?: true;
};

const modals: Array<ModalData> = [
  {
    id: 'medium',
    buttonText: 'Open modal',
    width: 'w8',
    bling: true,
  },
  {
    id: 'narrow',
    buttonText: 'Open narrow modal',
    width: 'w6',
  },
  {
    id: 'wide',
    buttonText: 'Open wide modal',
    width: 'w10',
  },
];

const renderBling = () => (
  <Bling type="circle-waves-vertical" align="right" parent="top" vertical="down" />
);

export default function () {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const handleModalClosed = () => {
    setModalData(undefined);
    setOpen(false);
  };

  const buttons = modals.map((data) => {
    return (
      <span key={data.id}>
        <ButtonSecondary
          size="small"
          onClick={() => {
            setModalData(data);
            setOpen(true);
          }}
        >
          {data.buttonText}
        </ButtonSecondary>
      </span>
    );
  });

  const { width, bling } = modalData || {};

  return (
    <Minimal>
      {buttons}

      <Modal
        modifier={width}
        open={open}
        onClosed={handleModalClosed}
        // startOpen
        // stable
        // noCloseButton
        bling={bling && renderBling()}
      >
        {({ closeModal }) => {
          return (
            <Fragment>
              <Heading>Ertu viss?</Heading>
              <TextBlock>
                <p>
                  Athugið að þegar hætt er við umsókn mun hún ekki vistast og þú munt
                  þurfa að byrja upp á nýtt.
                </p>
                {width === 'w10' && <p>{loremRT.long(true)}</p>}
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
      </Modal>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  viewportMinHeight: 1000,
  skipScreenshot: true,
  extras: async ({ page, pageScreenshot, localScreenshot, mediaFormat }) => {
    const modalCloseBtn = page.locator('.Modal__closebutton');

    /* eslint-disable no-await-in-loop */
    for (const { id, buttonText, bling } of modals) {
      await page.locator(`.ButtonSecondary:text-is('${buttonText}')`).click();
      await page.mouse.move(0, 0);
      if (bling) {
        await page.locator('.Bling svg >> nth = 0').waitFor({ state: 'attached' });
      }
      await pageScreenshot(id);

      if ((id === 'wide' && mediaFormat('wide')) || mediaFormat('phone')) {
        await modalCloseBtn.hover();
        await localScreenshot(modalCloseBtn, 'closebutton-hover', { margin: true });
      }

      await modalCloseBtn.click();
      await page.waitForTimeout(800);
    }
    /* eslint-enable no-await-in-loop */
  },
};

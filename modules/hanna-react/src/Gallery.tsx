import React, { useState } from 'react';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { AbstractCarousel } from './_abstract/_AbstractCarousel.js';
import { GalleryItem, GalleryItemProps } from './Gallery/_GalleryItem.js';
import { GalleryModal } from './Gallery/_GalleryModal.js';
import { GalleryModalContext } from './Gallery/_GalleryModalContext.js';
import { SeenProp } from './utils/seenEffect.js';
import { SSRSupport } from './utils.js';

export type { GalleryItemProps } from './Gallery/_GalleryItem.js';

export type GalleryI18n = {
  modalNextLabel: string;
  modalPrevLabel: string;
  modalCloseLabel: string;
};

const defaultTexts: DefaultTexts<GalleryI18n> = {
  en: {
    modalNextLabel: 'Next image',
    modalPrevLabel: 'Previous image',
    modalCloseLabel: 'Back to article',
  },
  is: {
    modalNextLabel: 'Næsta mynd',
    modalPrevLabel: 'Fyrri mynd',
    modalCloseLabel: 'Til baka í grein',
  },
};

// ---------------------------------------------------------------------------

export type GalleryProps = {
  items: Array<GalleryItemProps>;
  texts?: GalleryI18n;
  lang?: string;
  ssr?: SSRSupport;
} & SeenProp;

export const Gallery = (props: GalleryProps) => {
  const { items, ssr, startSeen } = props;
  const texts = getTexts(props, defaultTexts);
  const [modalImage, setModalImage] = useState<GalleryItemProps | undefined>(undefined);

  return (
    <GalleryModalContext.Provider
      value={{ items, setCurrentImage: setModalImage, currentImage: modalImage }}
    >
      <AbstractCarousel
        bem="Gallery"
        items={items}
        Component={GalleryItem}
        ssr={ssr}
        startSeen={startSeen}
      />
      <GalleryModal {...modalImage} texts={texts} />
    </GalleryModalContext.Provider>
  );
};

export default Gallery;

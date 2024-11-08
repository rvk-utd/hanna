import React, { useMemo, useState } from 'react';
import { DefaultTexts, getTexts, HannaLang } from '@reykjavik/hanna-utils/i18n';

import { AbstractCarousel } from './_abstract/_AbstractCarousel.js';
import { GalleryItem, GalleryItemProps } from './Gallery/_GalleryItem.js';
import { GalleryModal } from './Gallery/_GalleryModal.js';
import { GalleryModalContext } from './Gallery/_GalleryModalContext.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { SSRSupportProps, WrapperElmProps } from './utils.js';

export type { GalleryItemProps } from './Gallery/_GalleryItem.js';

export type GalleryI18n = {
  modalNextLabel: string;
  modalPrevLabel: string;
  modalCloseLabel: string;
};

const defaultTexts: DefaultTexts<GalleryI18n> = {
  is: {
    modalNextLabel: 'Næsta mynd',
    modalPrevLabel: 'Fyrri mynd',
    modalCloseLabel: 'Loka mynd',
  },
  en: {
    modalNextLabel: 'Next image',
    modalPrevLabel: 'Previous image',
    modalCloseLabel: 'Close image',
  },
  pl: {
    modalNextLabel: 'Następne zdjęcie',
    modalPrevLabel: 'Poprzednie zdjęcie',
    modalCloseLabel: 'Zamknij zdjęcie',
  },
};

// ---------------------------------------------------------------------------

export type GalleryProps = {
  items: Array<GalleryItemProps>;
  contextual?: string;
  texts?: GalleryI18n;
  lang?: HannaLang;
} & SSRSupportProps &
  WrapperElmProps &
  DeprecatedSeenProp;

export const Gallery = (props: GalleryProps) => {
  const { items, ssr, contextual } = props;
  const texts = getTexts(props, defaultTexts);
  const [currentImage, setCurrentImage] = useState<GalleryItemProps | undefined>(
    undefined
  );
  const galleryState = useMemo(
    () => ({ items, setCurrentImage, currentImage }),
    [items, currentImage]
  );

  return (
    <GalleryModalContext.Provider value={galleryState}>
      <AbstractCarousel
        bem="Gallery"
        items={items}
        contextual={contextual}
        Component={GalleryItem}
        ssr={ssr}
        wrapperProps={props.wrapperProps}
      />
      <GalleryModal {...currentImage} texts={texts} />
    </GalleryModalContext.Provider>
  );
};

export default Gallery;

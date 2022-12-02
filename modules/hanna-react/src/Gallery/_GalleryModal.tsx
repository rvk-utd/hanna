import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { objectClean, objectIsSame } from '@hugsmidjan/qj/object';
import CarouselPaging from '@hugsmidjan/react/CarouselPaging';
import Modal from '@hugsmidjan/react/Modal';

import { GalleryI18n } from '../Gallery';

import { GalleryModalContext } from './_GalleryModalContext';
import { GalleryModalItem } from './_GalleryModalItem';

type GalleryModalProps = { texts: Readonly<GalleryI18n> };

export const GalleryModal = (props: GalleryModalProps) => {
  const { texts } = props;

  const { currentImage, items, setCurrentImage } = useContext(GalleryModalContext);
  const [image, setImage] = useState(currentImage);
  const [animated, setAnimated] = useState(false);
  const updateImage = (index: number) => {
    setAnimated(!animated);
    setTimeout(() => {
      setCurrentImage(items[index]);
    }, 200);
  };

  useEffect(() => {
    if (image !== currentImage) {
      const imgSource = currentImage?.largeImageSrc || currentImage?.src;
      if (imgSource) {
        const imageToLoad = new window.Image();
        imageToLoad.src = imgSource;
        imageToLoad.onload = () => {
          setImage(currentImage);
        };
      } else {
        setImage(undefined);
      }
    }
  }, [image, currentImage]);

  if (!image) {
    return null;
  }

  const imageIndex = items.findIndex((item) =>
    // FIXME: This if weirdly inefficient. Either memoize,
    // or do a simpler single-property comparison.
    objectIsSame(objectClean(image), objectClean(item))
  );

  return (
    <Modal
      open={true}
      onClosed={() => {
        setCurrentImage(undefined);
      }}
      startOpen={false}
      bem="GalleryModal"
      texts={{ closeButton: texts.modalCloseLabel }}
    >
      <>
        <CSSTransition
          in={animated}
          timeout={200}
          onEntered={() => {
            setAnimated(!animated);
          }}
          classNames="GalleryModalItem--"
        >
          <GalleryModalItem {...image} />
        </CSSTransition>

        <CarouselPaging
          bem="GalleryModalPager"
          itemCount={items.length}
          current={imageIndex}
          setCurrent={updateImage}
          texts={{
            next: texts.modalNextLabel,
            prev: texts.modalPrevLabel,
          }}
        />
      </>
    </Modal>
  );
};

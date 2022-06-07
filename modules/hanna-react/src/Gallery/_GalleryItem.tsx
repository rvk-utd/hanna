import React, { useContext } from 'react';

import Button from '../_abstract/Button';
import Image, { ImageProps } from '../_abstract/Image';

import GalleryModalContext from './_GalleryModalContext';

// ---------------------------------------------------------------------------

export type GalleryItemProps = {
  caption?: string;
  description?: string;
  largeImageSrc?: string;
} & ImageProps;

const GalleryItem = (props: GalleryItemProps) => {
  const { caption, description, largeImageSrc, ...image } = props;
  const { setCurrentImage } = useContext(GalleryModalContext);

  return (
    <figure className="GalleryItem">
      <figcaption className="GalleryItem__caption">{caption}</figcaption>
      {largeImageSrc ? (
        <Button
          bem="GalleryItem__button"
          href={largeImageSrc}
          onClick={(e) => {
            e.preventDefault();
            setCurrentImage({ ...image, caption, description, largeImageSrc });
          }}
        >
          {' '}
          <Image className="GalleryItem__image" {...image} />{' '}
        </Button>
      ) : (
        <Image className="GalleryItem__image" {...image} />
      )}
      {description && <div className="GalleryItem__description">{description}</div>}
    </figure>
  );
};

export default GalleryItem;

import React, { useContext } from 'react';

import { Button } from '../_abstract/_Button.js';
import { Image, ImageProps } from '../_abstract/_Image.js';

import { GalleryModalContext } from './_GalleryModalContext.js';

// ---------------------------------------------------------------------------

export type GalleryItemProps = {
  caption?: string;
  contextual?: string;
  description?: string;
  largeImageSrc?: string;
} & ImageProps;

export const GalleryItem = (props: GalleryItemProps) => {
  const { caption, contextual, description, largeImageSrc, ...image } = props;
  const { setCurrentImage } = useContext(GalleryModalContext);
  return (
    <figure className="GalleryItem">
      {contextual && (
        <div
          className="GalleryItem__contextual"
          dangerouslySetInnerHTML={{ __html: contextual }}
        />
      )}
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
          <Image bem="GalleryItem__image" {...image} />{' '}
        </Button>
      ) : (
        <Image bem="GalleryItem__image" {...image} />
      )}
      {description && <div className="GalleryItem__description">{description}</div>}
    </figure>
  );
};

import React from 'react';

import Image from '../_abstract/Image';

import { GalleryItemProps } from './_GalleryItem';

const GalleryModalItem = (props: GalleryItemProps) => {
  const { caption, description, ...image } = props;

  return (
    <div className="GalleryModalItem">
      {(caption || description) && (
        <div className="GalleryModalItem__text">
          <div className="GalleryModalItem__caption">{caption}</div>
          <div className="GalleryModalItem__description">{description}</div>
        </div>
      )}
      <Image className="GalleryModalItem__image" src={image.largeImageSrc || image.src} />
    </div>
  );
};

export default GalleryModalItem;

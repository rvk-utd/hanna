import React from 'react';

import { GalleryProps } from '../Gallery';

import { GalleryItemProps } from './_GalleryItem';

type ModalContextProps = {
  setCurrentImage: (item: GalleryItemProps | undefined) => void;
  currentImage: GalleryItemProps | undefined;
} & GalleryProps;

const GalleryModalContext = React.createContext<ModalContextProps>(
  {} as ModalContextProps
);

export default GalleryModalContext;

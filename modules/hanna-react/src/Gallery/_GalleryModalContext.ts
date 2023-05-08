import { createContext } from 'react';

import { GalleryProps } from '../Gallery.js';

import { GalleryItemProps } from './_GalleryItem.js';

type ModalContextProps = {
  setCurrentImage: (item: GalleryItemProps | undefined) => void;
  currentImage: GalleryItemProps | undefined;
} & GalleryProps;

export const GalleryModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps
);

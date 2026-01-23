import React from 'react';

import { Image, ImageProps } from './_abstract/_Image.js';
import { WrapperElmProps } from './utils.js';

export type PictureProps = ImageProps & {
  contain?: boolean;
  className?: string;
} & WrapperElmProps;

export const Picture = (props: PictureProps) => (
  <Image
    {...props}
    bem="Picture"
    modifier={[
      props.contain && 'contain',
      props.inline && /\.svg(?:\?|$)/i.test(props.src) && 'inlined',
    ]}
  />
);

export default Picture;

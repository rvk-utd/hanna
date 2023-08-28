import React from 'react';

import { Image, ImagePropsLinked } from './_abstract/_Image.js';

export type PictureProps = ImagePropsLinked & {
  contain?: boolean;
  className?: string;
};

export const Picture = (props: PictureProps) => (
  <Image {...props} bem="Picture" modifier={props.contain && 'contain'} />
);

export default Picture;

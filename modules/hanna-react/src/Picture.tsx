import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { Image, ImagePropsLinked } from './_abstract/_Image.js';

export type PictureProps = ImagePropsLinked & {
  contain?: boolean;
  className?: string;
};

export const Picture = (props: PictureProps) => {
  const { contain, className } = props;
  return (
    <Image
      {...props}
      className={getBemClass('Picture', contain && 'contain', className)}
    />
  );
};

export default Picture;

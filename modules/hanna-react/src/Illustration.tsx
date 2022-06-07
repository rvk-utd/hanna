import React from 'react';
import {
  getIllustrationUrl,
  Illustration as IllustrationName,
} from '@reykjavik/hanna-utils/assets';

import Image, { ImageProps } from './_abstract/Image';

type IllustrationProps = { children?: undefined } & (
  | { type: IllustrationName; image?: undefined }
  | { image: ImageProps; type?: undefined }
);

const Illustration = (props: IllustrationProps) => {
  const imgProps = props.type ? { src: getIllustrationUrl(props.type) } : props.image;

  return <Image className="Illustration" {...imgProps} />;
};

export default Illustration;

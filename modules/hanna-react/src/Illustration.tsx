import React from 'react';
import { EitherObj } from '@reykjavik/hanna-utils';
import {
  getIllustrationUrl,
  Illustration as IllustrationName,
} from '@reykjavik/hanna-utils/assets';

import { Image, ImageProps } from './_abstract/_Image';

type IllustrationProps = EitherObj<{ type: IllustrationName }, { image: ImageProps }>;

const Illustration = (props: IllustrationProps) => {
  const imgProps = props.type ? { src: getIllustrationUrl(props.type) } : props.image;

  return <Image className="Illustration" {...imgProps} />;
};

export default Illustration;

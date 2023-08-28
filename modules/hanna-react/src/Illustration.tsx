import React from 'react';
import { EitherObj } from '@reykjavik/hanna-utils';
import {
  getIllustrationUrl,
  Illustration as IllustrationName,
} from '@reykjavik/hanna-utils/assets';

import { Image, ImageProps } from './_abstract/_Image.js';
import { WrapperElmProps } from './utils.js';

type IllustrationProps = EitherObj<{ type: IllustrationName }, { image: ImageProps }> &
  WrapperElmProps;

export const Illustration = (props: IllustrationProps) => {
  const imgProps = props.type ? { src: getIllustrationUrl(props.type) } : props.image;

  return <Image bem="Illustration" {...imgProps} wrapperProps={props.wrapperProps} />;
};

export default Illustration;

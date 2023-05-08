import React from 'react';
import { EitherObj } from '@reykjavik/hanna-utils';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';

import { Block, BlockItem } from './_abstract/_Block.js';
import { ImageProps } from './_abstract/_Image.js';
import { SeenProp } from './utils/seenEffect.js';
import { Alignment, aligns } from './constants.js';

const types = {
  largebox: true,
  largeimage: true,
};

export type CityBlockProps = {
  align?: Alignment;
  type?: keyof typeof types;
  content: BlockItem;
} & EitherObj<{ illustration: Illustration }, { image: ImageProps }> &
  SeenProp;

export const CityBlock = (props: CityBlockProps) => {
  const align = props.align || 'right';
  const type = !props.illustration && props.type; // The presence of illustration prop suppresses type
  const modifier = [aligns[align] && 'align--' + align, type && types[type] && type];
  const imageProps =
    props.illustration != null
      ? { src: getIllustrationUrl(props.illustration) }
      : props.image;

  return (
    <Block
      bem="CityBlock"
      modifier={modifier}
      content={props.content}
      image={imageProps}
      startSeen={props.startSeen}
    />
  );
};

export default CityBlock;

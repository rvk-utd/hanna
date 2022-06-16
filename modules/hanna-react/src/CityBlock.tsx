import React from 'react';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';

import Block, { BlockItem } from './_abstract/_Block';
import { ImageProps } from './_abstract/_Image';
import { SeenProp } from './utils/seenEffect';
import { Alignment, aligns } from './constants';

const types = {
  largebox: true,
  largeimage: true,
};

type CityBlockImageProps =
  | { illustration: Illustration; image?: never }
  | { image: ImageProps; illustration?: never };

export type CityBlockProps = {
  align?: Alignment;
  type?: keyof typeof types;
  content: BlockItem;
} & CityBlockImageProps &
  SeenProp;

const CityBlock = (props: CityBlockProps) => {
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

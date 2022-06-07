import React from 'react';
import { Formheimur, getFormheimurUrl } from '@reykjavik/hanna-utils/assets';

import Block, { BlockItem } from './_abstract/_Block';
import { ImageProps } from './_abstract/Image';
import { SeenProp } from './utils/seenEffect';
import { Alignment, aligns } from './constants';

type IslandBaseBlockProps = {
  align?: Alignment;
};

type IslandImageBlock = {
  content: BlockItem;
} & (
  | { shapes: Formheimur; image?: undefined }
  | { image: ImageProps; shapes?: undefined }
);

type IslandContentBlocks = {
  content: Array<BlockItem>;
  shapes?: undefined;
  image?: undefined;
};

export type IslandBlockProps = IslandBaseBlockProps &
  (IslandContentBlocks | IslandImageBlock) &
  SeenProp;

const IslandBlock = (props: IslandBlockProps) => {
  const { align, content, shapes, image, startSeen } = props;
  const alignment = align && aligns[align] ? align : 'right';

  const blockProps = Array.isArray(content)
    ? { content }
    : {
        content,
        image: shapes ? { src: getFormheimurUrl(shapes), inline: true } : image || {},
      };

  return (
    <Block
      bem="IslandBlock"
      modifier={'align--' + alignment}
      {...blockProps}
      startSeen={startSeen}
    />
  );
};

export default IslandBlock;

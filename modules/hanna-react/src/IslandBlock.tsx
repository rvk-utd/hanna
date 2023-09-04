import React from 'react';
import { Formheimur, getFormheimurUrl } from '@reykjavik/hanna-utils/assets';

import { Block, BlockItem } from './_abstract/_Block.js';
import { ImageProps } from './_abstract/_Image.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { Alignment, aligns } from './constants.js';
import { WrapperElmProps } from './utils.js';

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
  WrapperElmProps &
  DeprecatedSeenProp;

export const IslandBlock = (props: IslandBlockProps) => {
  const { align, content, shapes, image, wrapperProps } = props;
  const alignment = align && aligns[align] ? align : 'right';

  const blockProps = Array.isArray(content)
    ? { content }
    : {
        content,
        image: shapes ? { src: getFormheimurUrl(shapes), inline: true } : image || {},
      };

  return (
    <Block
      wrapperProps={wrapperProps}
      bem="IslandBlock"
      modifier={'align--' + alignment}
      {...blockProps}
    />
  );
};

export default IslandBlock;

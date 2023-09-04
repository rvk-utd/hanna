import React from 'react';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';

import { Block, BlockItem } from './_abstract/_Block.js';
import { ImageProps } from './_abstract/_Image.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { Alignment, aligns } from './constants.js';
import { WrapperElmProps } from './utils.js';

const backgrounds = {
  none: undefined,
  gray: 'gray',
  secondary: 'secondary',
};
type Background = keyof typeof backgrounds;

type IslandPageImageProps =
  | { illustration: Illustration; image?: undefined }
  | { illustration?: undefined; image: ImageProps };

export type IslandPageBlockProps = BlockItem &
  IslandPageImageProps & {
    align?: Alignment;
    background?: Background;
  } & WrapperElmProps &
  DeprecatedSeenProp;

export const IslandPageBlock = (props: IslandPageBlockProps) => {
  const {
    title,
    summary,
    buttons,
    illustration,
    image,
    align,
    background,
    wrapperProps,
  } = props;
  const alignment = align && aligns[align] ? align : 'right';
  const bg = backgrounds[background || 'none'];

  return (
    <Block
      wrapperProps={wrapperProps}
      bem="IslandPageBlock"
      modifier={['align--' + alignment, bg && 'background--' + bg]}
      content={{ title, summary, buttons }}
      image={illustration ? { src: getIllustrationUrl(illustration) } : image || {}}
    />
  );
};

export default IslandPageBlock;

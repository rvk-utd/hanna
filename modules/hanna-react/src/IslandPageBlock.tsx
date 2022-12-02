import React from 'react';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';

import { Block, BlockItem } from './_abstract/_Block';
import { ImageProps } from './_abstract/_Image';
import { SeenProp } from './utils/seenEffect';
import { Alignment, aligns } from './constants';

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
  IslandPageImageProps & { align?: Alignment; background?: Background } & SeenProp;

const IslandPageBlock = (props: IslandPageBlockProps) => {
  const { title, summary, buttons, illustration, image, align, background, startSeen } =
    props;
  const alignment = align && aligns[align] ? align : 'right';
  const bg = backgrounds[background || 'none'];

  return (
    <Block
      bem="IslandPageBlock"
      modifier={['align--' + alignment, bg && 'background--' + bg]}
      content={{ title, summary, buttons }}
      image={illustration ? { src: getIllustrationUrl(illustration) } : image || {}}
      startSeen={startSeen}
    />
  );
};

export default IslandPageBlock;

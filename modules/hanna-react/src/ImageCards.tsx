import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import {
  CardList,
  ImageCardListProps,
  ImageCardProps as ICP,
} from './_abstract/_CardList';
import { SeenProp, useSeenEffect } from './utils/seenEffect';

export type ImageCardProps = ICP;

type _ImageCardProps = ImageCardListProps & { background?: boolean } & SeenProp;

const ImageCards = (props: _ImageCardProps) => {
  const { background, startSeen, ...cardListProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div className={getBemClass('ImageCards', background && 'background')} ref={ref}>
      <CardList
        {...cardListProps}
        bemPrefix="ImageCards"
        imgPlaceholder={props.imgPlaceholder || true}
      />
    </div>
  );
};

export default ImageCards;

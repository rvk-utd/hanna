import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { Image, ImageProps } from './_abstract/_Image.js';
import { WrapperElmProps } from './utils.js';

export type ContentImageProps = {
  image?: ImageProps;
  caption?: string | JSX.Element;
  credit?: string | JSX.Element;
} & WrapperElmProps;

export const ContentImage = (props: ContentImageProps) => {
  const { image, caption, credit, wrapperProps } = props;

  return (
    <figure
      {...wrapperProps}
      className={modifiedClass('ContentImage', null, (wrapperProps || {}).className)}
    >
      {(caption || credit) && (
        <figcaption className="ContentImage__caption">
          {caption && <span className="ContentImage__text"> {caption} </span>}{' '}
          {credit && <small className="ContentImage__credit"> {credit} </small>}
        </figcaption>
      )}
      <Image bem="ContentImage__image" {...image} />
    </figure>
  );
};

export default ContentImage;

import React from 'react';

import Image, { ImageProps } from './_abstract/_Image';

export type ContentImageProps = {
  image?: ImageProps;
  caption?: string | JSX.Element;
  credit?: string | JSX.Element;
};

const ContentImage = (props: ContentImageProps) => {
  const { image, caption, credit } = props;

  return (
    <figure className="ContentImage">
      {(caption || credit) && (
        <figcaption className="ContentImage__caption">
          {caption && <span className="ContentImage__text"> {caption} </span>}{' '}
          {credit && <small className="ContentImage__credit"> {credit} </small>}
        </figcaption>
      )}
      <Image className="ContentImage__image" {...image} />
    </figure>
  );
};

export default ContentImage;

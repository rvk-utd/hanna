import React from 'react';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';

import { ButtonProps } from './_abstract/Button';
import Image, { ImageProps } from './_abstract/Image';
import { SeenProp, useSeenEffect } from './utils/seenEffect';
import ButtonPrimary from './ButtonPrimary';
import ButtonTertiary from './ButtonTertiary';

type HeroBlockImageProps =
  | { illustration: Illustration; image?: undefined }
  | { image: ImageProps; illustration?: undefined };

export type HeroBlockProps = {
  title: string;
  summary: string | JSX.Element;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
} & HeroBlockImageProps &
  SeenProp;

const HeroBlock = (props: HeroBlockProps) => {
  const {
    title,
    summary,
    illustration,
    image,
    primaryButton,
    secondaryButton,
    startSeen,
  } = props;
  const hasButtons = Boolean(primaryButton || secondaryButton);
  const imgProps = illustration ? { src: getIllustrationUrl(illustration) } : image;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div className="HeroBlock" ref={ref}>
      <h1 className="HeroBlock__title">{title}</h1>
      <Image className="HeroBlock__image" {...imgProps} />
      <div className="HeroBlock__summary">{summary}</div>
      {hasButtons && (
        <div className="HeroBlock__buttons">
          {primaryButton && <ButtonPrimary {...primaryButton} />}{' '}
          {secondaryButton && <ButtonTertiary {...secondaryButton} />}
        </div>
      )}
    </div>
  );
};
export default HeroBlock;

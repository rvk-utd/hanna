import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';

import { ButtonProps } from './_abstract/_Button.js';
import { Image, ImageProps } from './_abstract/_Image.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import ButtonPrimary from './ButtonPrimary.js';
import ButtonTertiary from './ButtonTertiary.js';
import { WrapperElmProps } from './utils.js';

type HeroBlockImageProps =
  | { illustration: Illustration; image?: undefined }
  | { image: ImageProps; illustration?: undefined };

export type HeroBlockProps = {
  title: string;
  summary: string | JSX.Element;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
} & HeroBlockImageProps &
  WrapperElmProps &
  SeenProp;

export const HeroBlock = (props: HeroBlockProps) => {
  const {
    title,
    summary,
    illustration,
    image,
    primaryButton,
    secondaryButton,
    startSeen,
    wrapperProps,
  } = props;
  const hasButtons = Boolean(primaryButton || secondaryButton);
  const imgProps = illustration ? { src: getIllustrationUrl(illustration) } : image;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('HeroBlock', null, (wrapperProps || {}).className)}
      ref={ref}
    >
      <h1 className="HeroBlock__title">{title}</h1>
      <Image bem="HeroBlock__image" {...imgProps} />
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

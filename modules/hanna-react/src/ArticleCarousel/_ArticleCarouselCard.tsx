import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import type { HannaColorTheme } from '@reykjavik/hanna-css';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';

import { Image, ImageProps } from '../_abstract/_Image';
import { Link } from '../_abstract/_Link';
import { colorFamilies, ColorFamily, themeOptions } from '../constants';

export type ArticleCarouselImageProps = ImageProps & { photo?: boolean };

export type ArticleCarouselCardProps = {
  date?: string;
  title: string;
  summary: string;
  href: string;
  target?: string;
  color?: ColorFamily;
  /** NOTE: if both `color` and `theme` are specified
   * then `color` takes precedence.
   */
  theme?: HannaColorTheme;
} & (
  | {
      illustration: Illustration;
      image?: undefined;
    }
  | {
      illustration?: undefined;
      image: ArticleCarouselImageProps | undefined;
    }
);

export const ArticleCarouselCard = (
  props: ArticleCarouselCardProps & { moreLabel?: string }
) => {
  const {
    date,
    title,
    summary,
    href,
    target,
    moreLabel,
    color,
    theme,
    illustration,
    image,
  } = props;

  const photo = image?.photo;
  const imageProps = illustration ? { src: getIllustrationUrl(illustration) } : image;

  return (
    <div
      className="ArticleCarouselCard"
      data-color={color && colorFamilies[color]}
      data-color-theme={!color ? theme && themeOptions[theme] : undefined} // color takes precedence over "theme"
    >
      <Link className="ArticleCarouselCard__link" href={href} target={target}>
        {' '}
        <Image
          placeholder
          className={getBemClass('ArticleCarouselCard__illustration', photo && 'photo')}
          {...imageProps}
        />
        <h3 className="ArticleCarouselCard__title">{title}</h3>{' '}
      </Link>{' '}
      {date && <span className="ArticleCarouselCard__date">{date}</span>}
      <div className="ArticleCarouselCard__summary">{summary}</div>
      {moreLabel && (
        <Link
          className="ArticleCarouselCard__morelink"
          href={href}
          target={target}
          aria-label={title}
        >
          {' '}
          {moreLabel}{' '}
        </Link>
      )}
    </div>
  );
};

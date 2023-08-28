import React, { CSSProperties } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { BemProps } from '../utils/types.js';
import { useGetSVGtext } from '../utils/useGetSVGtext.js';

export type Source = {
  srcset: string;
  media: string;
};

export type ImagePropsLinked = {
  altText?: string;
  sources?: Array<Source>;
  /** The default image source to (lazy) load */
  src?: string;
  /** Eagerly-loaded placeholder/thunbnail to use until a `sources` item has been picked.  */
  preloadSrc?: string;
  inline?: false;
  focalPoint?: string;
};
export type ImagePropsInlinedSvg = {
  altText?: string;
  /** Should the image be fetched and inlined as <svg/> */
  inline: true;
  src: string;
  sources?: undefined;
  preloadSrc?: undefined;
  focalPoint?: undefined;
};

export type ImageProps = ImagePropsLinked | ImagePropsInlinedSvg;

type _ImageProps = {
  /** Controls if the container is rendered when image is missing/undefined.
   * (With a `--missing` className modifier added.)
   *
   * Accepts a function that defines a default content for the container.
   */
  placeholder?: boolean | (() => JSX.Element);
  /** Extra, custom className in addition to the `bem` base */
  className?: string | undefined;
  bem: string | undefined;
} & BemProps;

export const Image = (props: ImageProps & _ImageProps) => {
  const {
    src,
    altText = '',
    sources = [],
    preloadSrc,
    modifier,
    bem,
    inline,
    placeholder,
    focalPoint,
    className,
  } = props;
  const _src = (sources.length && preloadSrc) || src;
  const imageSrc =
    _src || (sources[0] != null ? sources[0].srcset.split(' ')[0] : undefined);
  const imgLoading = preloadSrc ? 'eager' : 'lazy';

  const inlineSvg = useGetSVGtext(inline ? imageSrc : undefined, altText);

  const classNames = bem
    ? modifiedClass(bem, [modifier, !imageSrc && 'missing'], className)
    : className;

  if (!imageSrc) {
    return placeholder ? (
      <span className={classNames}>{placeholder !== true && placeholder()}</span>
    ) : null;
  }

  if (inline && inlineSvg) {
    const __html = inlineSvg.imageSrc === imageSrc ? inlineSvg.code : '';
    return <span className={classNames} dangerouslySetInnerHTML={{ __html }} />;
  }

  return (
    <picture
      className={classNames}
      style={focalPoint ? ({ '--focalPoint': focalPoint } as CSSProperties) : undefined}
    >
      {' '}
      {sources.map((source, i) => (
        <>
          <source key={i} srcSet={source.srcset} media={source.media} />{' '}
        </>
      ))}{' '}
      <img src={imageSrc} alt={altText} loading={imgLoading} />
      {'  '}
    </picture>
  );
};

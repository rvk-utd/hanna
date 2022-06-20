import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { useGetSVGtext } from '../utils/useGetSVGtext';

export type Source = {
  srcset: string;
  media: string;
};

export type ImageProps = {
  altText?: string;
} & (
  | {
      sources?: Array<Source>;
      /** The default image source to (lazy) load */
      src?: string;
      /** Eagerly-loaded placeholder/thunbnail to use until a `sources` item has been picked.  */
      preloadSrc?: string;
      inline?: false;
    }
  | {
      /** Should the image be fetched and inlined as <svg/> */
      inline: true;
      src: string;
      sources?: undefined;
      preloadSrc?: undefined;
    }
);

type _ImageProps = {
  /** container className */
  className: string | undefined;
  /** Controls if the container is rendered when image is missing/undefined.
   * (With a `--missing` className modifier added.)
   *
   * Accepts a function that defines a default content for the container.
   */
  placeholder?: boolean | (() => JSX.Element);
};

// eslint-disable-next-line complexity
const Image = (props: ImageProps & _ImageProps) => {
  const {
    src,
    altText = '',
    sources = [],
    preloadSrc,
    className,
    inline,
    placeholder,
  } = props;
  const _src = (sources.length && preloadSrc) || src;
  const imageSrc =
    _src || (sources[0] != null ? sources[0].srcset.split(' ')[0] : undefined);
  const imgLoading = preloadSrc ? 'eager' : 'lazy';

  const inlineSvg = useGetSVGtext(inline ? imageSrc : undefined);

  if (!imageSrc) {
    return placeholder ? (
      <span className={className && getBemClass(className, 'missing')}>
        {placeholder !== true && placeholder()}
      </span>
    ) : null;
  }

  if (inline && inlineSvg) {
    const __html = inlineSvg.imageSrc === imageSrc ? inlineSvg.code : '';
    return <span className={className} dangerouslySetInnerHTML={{ __html }} />;
  }

  return (
    <picture className={className}>
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

export default Image;

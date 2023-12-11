import React from 'react';

import { Image } from '../_abstract/_Image.js';
import { Link } from '../_abstract/_Link.js';

type MetaValue = string | (() => JSX.Element | string | number);

export type SearchResultsItemProps = {
  /** Plain text title */
  title: string;
  /** Simple HTML-encoded summary (excluding any layout)  */
  summary: string;
  href: string;
  meta?: MetaValue | ReadonlyArray<MetaValue>;
  /**
   * URL to the image to display with the result item.
   * Should ideally be approximately 600-700px wide
   */
  image?: string;
  /** Should this search-result item be displayed as a "major"/"main" result at the top */
  highlight?: boolean;
};

export const SearchResultsItem = (props: SearchResultsItemProps) => {
  const { highlight, title, summary, href, meta, image } = props;
  const bem = highlight ? 'SearchResultsHighlightItem' : 'SearchResultsItem';
  const metaArr = (Array.isArray(meta) ? meta : [meta]) as ReadonlyArray<MetaValue>;

  return (
    <li className={bem}>
      <Link className={`${bem}__link`} href={href}>
        <h3 className={`${bem}__title`}>{title}</h3>
        {metaArr.length > 0 && (
          <span className={`${bem}__meta`}>
            {metaArr.map((item, i) =>
              typeof item === 'function' ? item() : item && <span key={i}>{item}</span>
            )}
          </span>
        )}
        {highlight && image && <Image bem={`${bem}__image`} src={image} />}
        <div
          className={`${bem}__summary`}
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </Link>
    </li>
  );
};

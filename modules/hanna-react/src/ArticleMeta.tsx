import React, { Fragment } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { Link } from './_abstract/_Link.js';
import { WrapperElmProps } from './utils.js';

export type ArticleMetaItem = {
  label: string;
  href?: string;
};

export type ArticleMetaProps = {
  items: Array<ArticleMetaItem>;
  small?: boolean;
} & WrapperElmProps;

export const ArticleMeta = (props: ArticleMetaProps) => {
  const { items, small, wrapperProps } = props;

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'ArticleMeta',
        small && 'small',
        (wrapperProps || {}).className
      )}
    >
      {items.map(({ label, href }, i) => (
        <Fragment key={i}>
          {href == null ? (
            <span className="ArticleMeta__item"> {label} </span>
          ) : (
            <Link className="ArticleMeta__item" href={href}>
              {' '}
              {label}{' '}
            </Link>
          )}{' '}
        </Fragment>
      ))}
    </div>
  );
};

export default ArticleMeta;

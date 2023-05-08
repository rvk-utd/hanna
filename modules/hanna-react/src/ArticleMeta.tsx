import React, { Fragment } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { Link } from './_abstract/_Link.js';

export type ArticleMetaItem = {
  label: string;
  href?: string;
};

export type ArticleMetaProps = {
  items: Array<ArticleMetaItem>;
  small?: boolean;
};

export const ArticleMeta = (props: ArticleMetaProps) => {
  const { items, small } = props;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={getBemClass('ArticleMeta', small && 'small')}>
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

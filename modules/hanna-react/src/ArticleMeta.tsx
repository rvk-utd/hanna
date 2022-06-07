import React, { Fragment } from 'react';

import { Link } from './_abstract/Link';

export type ArticleMetaItem = {
  label: string;
  href?: string;
};

export type ArticleMetaProps = {
  items: Array<ArticleMetaItem>;
};

const ArticleMeta = (props: ArticleMetaProps) => {
  const { items } = props;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="ArticleMeta">
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

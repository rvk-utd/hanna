import React, { ReactNode } from 'react';
import { EitherObj } from '@reykjavik/hanna-utils';

import { Link } from './_Link';

export type QuoteProps = {
  children: ReactNode;
} & EitherObj<object, { by: string | JSX.Element; byHref?: string }>;

export const _Quote = (props: { bem: string } & QuoteProps) => {
  const { bem, children, by, byHref } = props;

  return (
    <figure className={bem}>
      <blockquote className={bem + '__quote'}>{children}</blockquote>
      {by && (
        <figcaption className={bem + '__by'}>
          {byHref ? (
            <Link href={byHref}>{by}</Link>
          ) : typeof by === 'string' ? (
            <span>{by}</span>
          ) : (
            by
          )}
        </figcaption>
      )}
    </figure>
  );
};

import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from '../utils.js';

import { Link } from './_Link.js';

export type QuoteProps = {
  children: ReactNode;
} & WrapperElmProps &
  EitherObj<object, { by: string | JSX.Element; byHref?: string }>;

export const _Quote = (props: { bem: string } & QuoteProps) => {
  const { bem, children, by, byHref, wrapperProps } = props;

  return (
    <figure
      {...wrapperProps}
      className={modifiedClass(bem, null, (wrapperProps || {}).className)}
    >
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

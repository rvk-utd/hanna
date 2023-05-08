import React from 'react';

import { Link } from './_abstract/_Link.js';

export type BreadCrumb = { href?: string; label: string };
export type BreadCrumbTrail = Array<BreadCrumb>;

// ---------------------------------------------------------------------------

type BreadCrumbs__itemProps = {
  link: BreadCrumb;
  current?: boolean;
};

const BreadCrumbs__item = (props: BreadCrumbs__itemProps) => {
  const { link, current } = props;
  return link.href != null ? (
    <Link
      className="BreadCrumbs__item"
      href={link.href}
      aria-current={current || undefined}
    >
      {link.label}
    </Link>
  ) : (
    <span className="BreadCrumbs__item" aria-current={current || undefined}>
      {link.label}
    </span>
  );
};

// ===========================================================================

export type BreadCrumbsProps = {
  title: string;
  trail: BreadCrumbTrail;
};

export const BreadCrumbs = (props: BreadCrumbsProps) => {
  const { title, trail } = props;

  if (trail.length === 0) {
    return null;
  }
  const ancestors = trail.slice(0, -1);
  const current = trail[trail.length - 1]!;

  return (
    <nav className="BreadCrumbs" aria-label={title}>
      <span className="BreadCrumbs__title">{title}:</span>{' '}
      {ancestors.map((link, i) => {
        return (
          <React.Fragment key={i}>
            <BreadCrumbs__item link={link} />{' '}
            <span className="BreadCrumbs__separator" aria-label="">
              &gt;
            </span>{' '}
          </React.Fragment>
        );
      })}
      <BreadCrumbs__item link={current} current />
    </nav>
  );
};

export default BreadCrumbs;

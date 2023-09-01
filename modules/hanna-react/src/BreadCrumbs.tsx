import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { Link } from './_abstract/_Link.js';
import { WrapperElmProps } from './utils.js';

export type BreadCrumb = { href?: string; label: string };
export type BreadCrumbTrail = Array<BreadCrumb>;

export const defaultBreadCrumbsTexts: DefaultTexts<{ title: string }> = {
  is: { title: 'Þú ert hér' },
  en: { title: 'You are here' },
  pl: { title: 'Jesteś tutaj' },
};

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
  title?: string;
  lang?: string;
  trail: BreadCrumbTrail;
} & WrapperElmProps<null, 'aria-label'>;

export const BreadCrumbs = (props: BreadCrumbsProps) => {
  const { trail, title, lang, wrapperProps } = props;
  const texts = getTexts(
    { texts: title ? { title } : undefined, lang },
    defaultBreadCrumbsTexts
  );

  if (trail.length === 0) {
    return null;
  }
  const ancestors = trail.slice(0, -1);
  const current = trail[trail.length - 1]!;

  return (
    <nav
      {...wrapperProps}
      className={modifiedClass('BreadCrumbs', null, (wrapperProps || {}).className)}
      aria-label={texts.title}
    >
      <span className="BreadCrumbs__title">{texts.title}:</span>{' '}
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

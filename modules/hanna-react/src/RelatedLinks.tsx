import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { Link } from './_abstract/_Link.js';
import { WrapperElmProps } from './utils.js';

const types = {
  external: 1,
  document: 1,
  pdf: 1,
  link: 0,
} as const;

export type RelatedLinkType = keyof typeof types;

export type RelatedLinkItem = {
  href: string;
  label: string;
  target?: React.HTMLAttributeAnchorTarget;
  type?: RelatedLinkType;
};

export type RelatedLinksProps = {
  title?: string;
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5';
  links: Array<RelatedLinkItem>;
} & WrapperElmProps;

export const RelatedLinks = (props: RelatedLinksProps) => {
  const { title, links, wrapperProps } = props;

  if (links.length === 0) {
    return null;
  }

  const TitleTag = props.titleTag || 'h3';

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('RelatedLinks', null, (wrapperProps || {}).className)}
    >
      {title && <TitleTag className="RelatedLinks__title">{title}</TitleTag>}
      <ul className="RelatedLinks__list">
        {links.map(({ href, label, type, target }, i) => {
          type = type && types[type] ? type : undefined;
          return (
            <li key={i} className="RelatedLinks__item">
              <Link
                className="RelatedLinks__link"
                href={href}
                data-type={type}
                target={target}
              >
                {' '}
                {label}{' '}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedLinks;

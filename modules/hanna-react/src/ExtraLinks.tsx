import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { CardList, CardListProps, TextCardProps } from './_abstract/_CardList.js';
import { Link } from './_abstract/_Link.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type RelatedLink = {
  href: string;
  label: string;
  blank?: boolean;
  type?: 'link' | 'pdf' | 'text';
};

type RelatedProps = {
  relatedTitle?: string;
  relatedLinks?: Array<RelatedLink>;
};
const ExtraLinks__related = (props: RelatedProps) => {
  const { relatedTitle, relatedLinks } = props;

  return (
    <div className="ExtraLinks__related">
      {relatedTitle && <h3 className="ExtraLinks__related__title">{relatedTitle}</h3>}
      <ul className="ExtraLinks__related__list">
        {relatedLinks &&
          relatedLinks.map(({ href, label, blank = false, type }, i) => (
            <li className="ExtraLinks__related__item" key={i}>
              <Link
                className={modifiedClass('ExtraLinks__related__link', type)}
                href={href}
                target={blank ? '_blank' : ''}
                rel={blank ? 'noreferrer noopener' : ''}
              >
                {label}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export type ExtraLinksCardProps = Omit<TextCardProps, 'meta'>;

export type ExtraLinksProps = CardListProps<ExtraLinksCardProps> &
  RelatedProps & { className?: string } & WrapperElmProps &
  DeprecatedSeenProp;

export const ExtraLinks = (props: ExtraLinksProps) => {
  const { relatedTitle, relatedLinks, className, wrapperProps, ...cardListProps } = props;
  const hasRelated = !!(relatedLinks && relatedLinks.length);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'ExtraLinks',
        hasRelated && 'related',
        // Prefer `className` over `wrapperProps.className`
        className || (wrapperProps || {}).className
      )}
    >
      <div className="ExtraLinks__main">
        <CardList {...cardListProps} bemPrefix="ExtraLinks" />
      </div>
      {hasRelated && (
        <ExtraLinks__related relatedTitle={relatedTitle} relatedLinks={relatedLinks} />
      )}
    </div>
  );
};

export default ExtraLinks;

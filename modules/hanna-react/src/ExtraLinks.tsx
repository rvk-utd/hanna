import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { CardList, CardListProps, TextCardProps } from './_abstract/_CardList.js';
import { Link } from './_abstract/_Link.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';

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
  RelatedProps & { className?: string } & SeenProp;

export const ExtraLinks = (props: ExtraLinksProps) => {
  const { relatedTitle, relatedLinks, className, startSeen, ...cardListProps } = props;
  const hasRelated = !!(relatedLinks && relatedLinks.length);
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      className={modifiedClass('ExtraLinks', hasRelated && 'related', className)}
      ref={ref}
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

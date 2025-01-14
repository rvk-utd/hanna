import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { Link } from './_abstract/_Link.js';
import { WrapperElmProps } from './utils.js';

export type FooterBadgesProps = {
  badges: Array<{
    altText: string;
    src: string;
    href?: string;
  }>;
} & WrapperElmProps<'ul'>;

export const FooterBadges = (props: FooterBadgesProps) => {
  if (!props.badges.length) {
    return null;
  }
  return (
    <ul
      {...props.wrapperProps}
      className={modifiedClass(
        'FooterBadges',
        null,
        (props.wrapperProps || {}).className
      )}
    >
      {props.badges.map(({ altText, src, href }, i) => (
        <li key={i} className="FooterBadges__badge">
          {href ? (
            <Link href={href}>
              {' '}
              <img src={src} alt={altText} />{' '}
            </Link>
          ) : (
            <img src={src} alt={altText} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default FooterBadges;

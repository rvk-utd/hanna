import React from 'react';

import { Link } from './_abstract/_Link';

export type FooterBadgesProps = {
  badges: Array<{
    altText: string;
    src: string;
    href?: string;
  }>;
};

export const FooterBadges = (props: FooterBadgesProps) => {
  if (!props.badges.length) {
    return null;
  }
  return (
    <ul className="FooterBadges">
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

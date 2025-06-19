import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';
import { getRvkLogoUrl } from '@reykjavik/hanna-utils/assets';

import { Image } from './_Image.js';
import { Link } from './_Link.js';

// ---------------------------------------------------------------------------

export const renderLayoutHomeLink = (
  bem: string,
  logoLink: string,
  siteName?: string,
  customLogo?: { src: string; altText: string }
) => {
  if (!siteName) {
    customLogo = undefined;
  }
  return (
    <Link className={`${bem}__header__homelink`} href={logoLink}>
      {' '}
      <Image
        bem={undefined}
        className={modifiedClass(`${bem}__header__logo`, customLogo && 'custom')}
        src={
          customLogo?.src ||
          getRvkLogoUrl(siteName ? 'reykjavik-logo-notext.svg' : 'reykjavik-logo.svg')
        }
        altText={customLogo?.altText || 'Reykjavík'}
        inline={true}
      />{' '}
      {siteName && <span className={`${bem}__header__sitename`}>{siteName}</span>}{' '}
    </Link>
  );
};

// ---------------------------------------------------------------------------

export const issueSiteNameWarningInDev = (props: { siteName?: string }): void => {
  if (process.env.NODE_ENV !== 'production') {
    if (!('siteName' in props)) {
      console.warn(
        'Layout: Prop `siteName` is missing.\n',
        'If this is intentional, please pass `undefined` or the empty string.'
      );
    } else if (
      props.siteName &&
      ['Reykjavík', 'Reykjavik', 'Reykjavíkurborg', 'Reykjavík City'].includes(
        props.siteName.trim()
      )
    ) {
      console.warn(
        'Layout: `siteName` should not be set to "Reykjavík" (or something equally generic).\n',
        'If you are making a website for Reykjavíkurborg, then you should leave `siteName` empty, ',
        'as the SVG logo already says "Reykjavík".\n'
      );
    }
  }
};

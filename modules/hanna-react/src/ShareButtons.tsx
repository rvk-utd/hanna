import React, { useEffect, useState } from 'react';
import { SSRSupport } from '@hugsmidjan/react/hooks';
import { DEFAULT_LANG } from '@reykjavik/hanna-utils/i18n';
import {
  DocMeta,
  getDocMeta,
  getShareButtonLabel,
  openInPopup,
  ShareButtonI18n,
  ShareButtonPlatforms,
  shareButtonTexts,
  shareButtonTypes,
} from '@reykjavik/hanna-utils/shareButtonsUtils';

import { Link } from './_abstract/_Link';

const generateTypeList = (
  facebook: boolean | undefined,
  twitter: boolean | undefined,
  linkedin: boolean | undefined,
  email: boolean | undefined
) => {
  const listStr = (
    (facebook ? 'facebook,' : '') +
    (twitter ? 'twitter,' : '') +
    (linkedin ? 'linkedin,' : '') +
    (email ? 'email,' : '')
  ).slice(0, -1);
  return (listStr !== 'facebook,twitter' && listStr) || undefined;
};

// FIXME: see other FIXME below for details
// TODO: Also figure out if/why the truthyness of document.location would be in doubt here
const docLoc = typeof document !== 'undefined' ? document.location : { href: undefined };

// ===========================================================================

type SBP = {
  type: ShareButtonPlatforms;
  label: string;
  href: string;
};

const ShareButtons__item = (props: SBP) => {
  const { label, type, href } = props;

  const buttonText = getShareButtonLabel(type, label);
  const popup = type !== 'email';
  return (
    <li className="ShareButtons__item">
      <Link
        className={'ShareButtons__link ShareButtons__link--' + type}
        href={href}
        title={buttonText}
        rel="noopener noreferrer"
        target={popup ? '_blank' : undefined}
        onClick={popup ? openInPopup : undefined}
      >
        {buttonText}
      </Link>
    </li>
  );
};

// ============================================================

export type ShareButtonsProps = {
  ssr?: SSRSupport;
  texts?: Readonly<ShareButtonI18n>;
  lang?: string;
} & Partial<Record<ShareButtonPlatforms, boolean>>;

export const ShareButtons = (props: ShareButtonsProps) => {
  const {
    texts,
    lang,
    ssr,

    facebook = true,
    twitter = true,
    linkedin,
    email,
  } = props;

  const [docMeta, setDocMeta] = useState<DocMeta>();
  const href = docLoc.href; // assign to local variable to silence `react-hooks/exhaustive-deps`
  useEffect(() => {
    // FIXME: Drop dependency on _loc.href and set up proper
    // location/route monitoring event handler, with unsubscribe on unmount
    setDocMeta(
      getDocMeta({
        lang,
        emailSubject: texts && texts.emailSubject,
      })
    );
  }, [texts, lang, href]);

  if (!facebook && !twitter && !linkedin && !email) {
    // no place to share
    return null;
  }

  const txt =
    texts ||
    (docMeta && (shareButtonTexts[docMeta.lang] || shareButtonTexts[DEFAULT_LANG])) ||
    {};

  const { label, buttonLabel, emailSubject } = txt;

  if (!docMeta || ssr === 'ssr-only') {
    // Generate SSR markup for hanna-sprinkles to pick up on.
    return (
      <div
        className="ShareButtons"
        data-button-types={generateTypeList(facebook, twitter, linkedin, email)}
        data-label={label}
        data-buttonlabel={buttonLabel}
        data-emailsubject={emailSubject || undefined}
      />
    );
  }

  const showTypes = {
    facebook,
    twitter,
    linkedin,
    email,
  };

  return (
    <div className="ShareButtons" aria-label={label} data-sprinkled="true">
      {label && <strong className="ShareButtons__label">{label}</strong>}
      <ul className="ShareButtons__list">
        {shareButtonTypes.map(
          (type) =>
            showTypes[type] && (
              <ShareButtons__item
                key={type}
                type={type}
                label={buttonLabel || ''}
                href={docMeta.hrefs[type]}
              />
            )
        )}
      </ul>
    </div>
  );
};

export default ShareButtons;

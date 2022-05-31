import addUrlParams from '@hugsmidjan/qj/addUrlParams';
import htmlLang from '@hugsmidjan/qj/htmlLang';

import { ObjectKeys } from './_/ObjectHelpers';

const shareButtonPlatforms = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  email: 'E-mail',
};
export type ShareButtonPlatforms = keyof typeof shareButtonPlatforms;

export const shareButtonTypes = ObjectKeys(shareButtonPlatforms);

export type ShareButtonI18n = {
  label?: string;
  buttonLabel?: string;
  emailSubject?: string;
};

// ===========================================================================

let _lastLabel: string | undefined;
let _lastValue: [string, string] = ['', ''];
const _token = '${name}';
export const getShareButtonLabel = (
  type: ShareButtonPlatforms,
  label: string
): string => {
  if (label !== _lastLabel) {
    _lastLabel = label;
    if (!label.includes(_token)) {
      label = label + ' ' + _token;
    }
    label = label.trim();
    const tokenIdx = label.indexOf(_token);
    _lastValue = [label.slice(0, tokenIdx), label.slice(tokenIdx + _token.length)];
  }
  return _lastValue[0] + shareButtonPlatforms[type] + _lastValue[1];
};

// ===========================================================================

type MaybeElm<E extends Element> = E | Record<keyof E, undefined>;

function getElm<S extends keyof HTMLElementTagNameMap>(
  selectors: S
): MaybeElm<HTMLElementTagNameMap[S]>;
function getElm<S extends keyof SVGElementTagNameMap>(
  selectors: S
): MaybeElm<SVGElementTagNameMap[S]>;
function getElm<E extends Element>(selector: string): MaybeElm<E>;

function getElm<E extends Element>(selector: string): MaybeElm<E> {
  return document.querySelector<E>(selector) || ({} as Record<keyof E, undefined>);
}
const getAttr = (selector: string, prop: string) => {
  const elm = document.querySelector(selector);
  return elm && elm.getAttribute(prop);
};

// ---------------------------------------------------------------------------

export const i18n: {
  en: ShareButtonI18n;
  [x: string]: ShareButtonI18n;
} = {
  en: {
    label: 'Share this page via',
    // buttonLabel: '',
    emailSubject: 'Kíktu á þetta!',
  },
  is: {
    label: 'Deila síðu á',
    // buttonLabel: '',
    emailSubject: 'Check this out!',
  },
};

export type DocMeta = {
  hrefs: Record<ShareButtonPlatforms, string>;
  url: string;
  title: string;
  description: string;
  lang: string;
};

type DocMetaConfig = {
  emailSubject?: string;
};

export const getDocMeta = (cfg?: DocMetaConfig): DocMeta => {
  const { emailSubject } = cfg || {};

  const url =
    getElm<HTMLLinkElement>('link[rel="canonical"]').href ||
    document.location.href.split('#')[0]!.replace(/[?&]fb_action_ids=.+/, '');
  const title =
    getAttr('meta[property="og:title"]', 'content') ||
    getElm('h1').textContent ||
    document.title;
  const description =
    getAttr('meta[property="og:description"]', 'content') ||
    getAttr('meta[name="description"]', 'content') ||
    '';
  const lang = htmlLang() || '';

  return {
    hrefs: {
      facebook: addUrlParams('https://www.facebook.com/sharer.php', {
        u: url,
      }),
      twitter: addUrlParams('https://twitter.com/intent/tweet', {
        url,
        text: title,
      }),
      linkedin: addUrlParams('https://www.linkedin.com/shareArticle?mini=true', {
        url,
        title,
        summary: description,
      }),
      email: addUrlParams('mailto:', {
        subject: emailSubject || (i18n[lang] || i18n.en).emailSubject,
        body: title + '\n' + url + '\n\n',
      }),
    },
    url,
    title,
    description,
    lang,
  };
};

export const openInPopup = (e: { target: EventTarget; preventDefault: () => void }) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.preventDefault();
    window.open(e.target.href, undefined, 'toolbar=0,status=0,width=626,height=436 ');
  }
};

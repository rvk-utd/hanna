import addUrlParams from '@hugsmidjan/qj/addUrlParams';
import htmlLang from '@hugsmidjan/qj/htmlLang';

import { ObjectKeys } from './_/ObjectHelpers';
import { DEFAULT_LANG } from './i18n';

const shareButtonPlatforms = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  email: 'E-mail',
};
/**
 * List of supported social media platforms
 */
export type ShareButtonPlatforms = keyof typeof shareButtonPlatforms;

/**
 * List of supported social media platforms
 */
export const shareButtonTypes = ObjectKeys(shareButtonPlatforms);

/**
 * Texts for the social media sharing UI
 */
export type ShareButtonI18n = {
  label?: string;
  buttonLabel?: string;
  emailSubject?: string;
};

// ===========================================================================

let _lastLabel: string | undefined;
let _lastValue: [string, string] = ['', ''];
const _token = '${name}';

/**
 * Generates a sharing button/link label for a given social media
 * platform type.
 *
 * Interpolates the platform name, if the provided label contains
 * a `${name}` token.
 */
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

/**
 * Translation strings for social media sharing
 */
export const shareButtonTexts: {
  en: ShareButtonI18n;
  is: ShareButtonI18n;
  pl: ShareButtonI18n;
  [x: string]: ShareButtonI18n;
} = {
  is: {
    label: 'Deila síðu á',
    // buttonLabel: '',
    emailSubject: 'Kíktu á þetta!',
  },
  en: {
    label: 'Share this page via',
    // buttonLabel: '',
    emailSubject: 'Check this out!',
  },
  pl: {
    label: 'Udostępnij tę stronę przez',
    // buttonLabel: '',
    emailSubject: 'Spójrz na to!',
  },
};

/**
 * MetaData for the current page, including fully constructed sharing
 * URLs for all `ShareButtonPlatforms`
 */
export type DocMeta = {
  hrefs: Record<ShareButtonPlatforms, string>;
  url: string;
  title: string;
  description: string;
  lang: string;
};

type DocMetaConfig = {
  emailSubject?: string;
  lang?: string;
};

/**
 * Runs in the browser and parses the open-graph <meta/> tags
 * of the current page.
 *
 * Returns the canonical `url`, `title`, `description` and page `lang`
 * as well as ready-made "share this page" URLs for all
 * `ShareButtonPlatforms`.
 */
export const getDocMeta = (cfg: DocMetaConfig = {}): DocMeta => {
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
  const lang = cfg.lang || htmlLang() || '';

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
        subject:
          cfg.emailSubject ||
          (shareButtonTexts[lang] || shareButtonTexts[DEFAULT_LANG]).emailSubject,
        body: title + '\n' + url + '\n\n',
      }),
    },
    url,
    title,
    description,
    lang,
  };
};

/**
 * An event handler, ready to be assigned to sharing links (with `href=""`s)
 * that opens the link in a small popup window.
 */
export const openInPopup = (e: { target: EventTarget; preventDefault: () => void }) => {
  if (e.target instanceof HTMLAnchorElement) {
    e.preventDefault();
    window.open(e.target.href, undefined, 'toolbar=0,status=0,width=626,height=436 ');
  }
};

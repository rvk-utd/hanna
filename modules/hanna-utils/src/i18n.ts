/** The base default language that's always supported. */
const _BASE_DEFAULT_LANG = 'is';
/**
 * The language we fall back to when an attempt is made to set an unsupported
 * (i.e. foreign) language.
 */
const _BASE_FALLBACK_LANG = 'en';

/** The languages officially supported by Hanna */
export type HannaLang = 'is' | 'en' | 'pl';

const langs = new Set<HannaLang>(['is', 'en', 'pl']);

/**
 * The current language/locale used by all Hanna components if a custom lang=""
 * prop is not set on the component itself.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#default_lang
 */
export let DEFAULT_LANG: HannaLang = _BASE_DEFAULT_LANG;

const _history: Array<HannaLang> = [];

/**
 * This sets the value of Hanna `currentLang` variable globally. Use it at the
 * top of your application to match its locale.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#setdefaultlanguage
 */
export const setDefaultLanguage = (newLang: HannaLang | undefined) => {
  DEFAULT_LANG = !newLang
    ? _BASE_DEFAULT_LANG
    : langs.has(newLang)
    ? newLang
    : _BASE_FALLBACK_LANG;

  _history[0] = DEFAULT_LANG;
};

/**
 * This function pushes a new language onto a simple stack. Use
 * `setDefaultLanguage.pop()` to revert back to the previous one.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#setdefaultlanguagepush
 */
setDefaultLanguage.push = (newLang: HannaLang | undefined) => {
  _history.unshift(DEFAULT_LANG);
  setDefaultLanguage(newLang);
};

/**
 * Unsets the last language set by `setDefaultLanguage.push(…)`.
 */
setDefaultLanguage.pop = () => {
  _history.shift();
  DEFAULT_LANG = _history[0] || _BASE_DEFAULT_LANG;
};

/**
 * Returns the passed `defaultTexts` in "production" mode.
 *
 * In development mode it emits an error message to the console
 */
const langMissing = <T extends Record<string, unknown>>(
  lang: string,
  defaultTexts: T
): T => {
  if (process.env.NODE_ENV === 'production') {
    console.error(`language '${lang}' not supported`);
  }
  return defaultTexts;
};

export type DefaultTexts<Texts extends Record<string, unknown>> = {
  [x in HannaLang]: Texts;
} & Record<string, Texts | undefined>;

/**
 * Helper for components that expose (optional) `texts` and `lang` props
 * for customizing their UI texts,
 *
 * Returns `texts` when available, but otherwise it resolves the correct
 * texts object from within `defaultTexts` to use based on `lang`
 * (falling back on default language texts when all else fails).
 *
 * In dev-mode it emits an error to the console if an unsupported `lang`
 * is passed.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#gettexts
 */
export const getTexts = <Texts extends Readonly<Record<string, unknown>>>(
  props: { texts?: Texts; lang?: string },
  defaultTexts: DefaultTexts<Texts>
): Readonly<Texts> => {
  const lang = props.lang || DEFAULT_LANG;
  return (
    props.texts || defaultTexts[lang] || langMissing(lang, defaultTexts[DEFAULT_LANG])
  );
};

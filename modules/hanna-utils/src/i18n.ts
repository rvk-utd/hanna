import { ObjectKeys } from './_/ObjectHelpers';

/**
 * Returns the passed `defaultTexts` in "production" mode.
 *
 * In development mode it emits an error message to the console
 * and returns a texts object full of `???` values
 */
const langMissing = <T extends Record<string, unknown>>(
  lang: string,
  defaults: T
): T | Record<keyof T, string> => {
  if (process.env.NODE_ENV === 'production') {
    return defaults;
  } else {
    console.error(`language '${lang}' not supported`);
    return ObjectKeys(defaults).reduce((texts, key) => {
      texts[key] = '???';
      return texts;
    }, {} as Record<keyof T, string>);
  }
};

export const DEFAULT_LANG = 'is';

type DefaultLang = typeof DEFAULT_LANG;

export type DefaultTexts<T extends Record<string, unknown>, L extends string = string> = {
  [x in DefaultLang]: T;
} & Record<L, T | undefined>;

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
export const getTexts = <T extends Record<string, unknown>, L extends string>(
  props: { texts?: T; lang?: L },
  defaultTexts: DefaultTexts<T, L>
): T | Record<keyof T, string> => {
  const lang = props.lang || DEFAULT_LANG;
  return (
    props.texts ||
    (defaultTexts[lang] as T | undefined) ||
    langMissing(lang, defaultTexts[DEFAULT_LANG])
  );
};

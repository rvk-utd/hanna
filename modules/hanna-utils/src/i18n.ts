import { ObjectKeys } from './ObjectHelpers';

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

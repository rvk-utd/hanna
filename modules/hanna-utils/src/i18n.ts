export const DEFAULT_LANG = 'is';
type DefaultLang = typeof DEFAULT_LANG;

/**
 * Returns the passed `defaultTexts` in "production" mode.
 *
 * In development mode it emits an error message to the console
 * and returns a texts object full of `???` values
 */
const langMissing = <T extends Record<string, unknown>>(
  lang: string,
  defaultTexts: T
): T => {
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production') {
    console.error(`language '${lang}' not supported`);
  }
  return defaultTexts;
};

export type DefaultTexts<
  Texts extends Record<string, unknown>,
  Lang extends string = string
> = {
  [x in DefaultLang]: Texts;
} & Record<Lang, Texts | undefined>;

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
export const getTexts = <
  Texts extends Readonly<Record<string, unknown>>,
  Lang extends string
>(
  props: { texts?: Texts; lang?: Lang },
  defaultTexts: DefaultTexts<Texts, Lang>
): Texts => {
  const lang = props.lang || DEFAULT_LANG;
  return (
    props.texts ||
    (defaultTexts[lang] as Texts | undefined) ||
    langMissing(lang, defaultTexts[DEFAULT_LANG])
  );
};

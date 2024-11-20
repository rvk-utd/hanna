import { DEFAULT_LANG, HannaLang } from '@reykjavik/hanna-utils/i18n';

const langs: Record<string, HannaLang> = { is: 'is', en: 'en', pl: 'pl' };

export const getLang = (elm?: Element): HannaLang => {
  let elmLang = (elm?.closest<HTMLElement>('[lang]') || document.documentElement).lang;
  elmLang = elmLang.slice(0, 2).toLowerCase();
  return langs[elmLang] || DEFAULT_LANG;
};

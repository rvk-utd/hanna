import htmlLang from '@hugsmidjan/qj/htmlLang';
import { DEFAULT_LANG, HannaLang } from '@reykjavik/hanna-utils/i18n';

const langs: Record<string, HannaLang> = { is: 'is', en: 'en', pl: 'pl' };

export const getLang = (elm?: Element): HannaLang =>
  langs[htmlLang(elm) || DEFAULT_LANG] || DEFAULT_LANG;

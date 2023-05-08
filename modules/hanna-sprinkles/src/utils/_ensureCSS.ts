import qq from '@hugsmidjan/qj/qq';
import { CssModuleToken, getCssBundleUrl } from '@reykjavik/hanna-css';

const ensureCSS = (...tokens: Array<CssModuleToken>): Promise<void> => {
  const cssBundleUrlPrefix = getCssBundleUrl('');
  const cssBundleLinks = qq<HTMLLinkElement>(`link[href^="${cssBundleUrlPrefix}"]`);
  const bundleUrls = cssBundleLinks
    .flatMap((elm) => elm.href.slice(cssBundleUrlPrefix.length).split(','))
    .filter((n) => !!n);

  const missingTokens = tokens.filter((token) => !bundleUrls.includes(token));

  if (missingTokens.length) {
    return new Promise((resolve) => {
      const linkElm = document.createElement('link');
      linkElm.rel = 'stylesheet';
      linkElm.onload = linkElm.onerror = () => resolve();
      linkElm.href = getCssBundleUrl(missingTokens);
      document.head.append(linkElm);
    });
  }
  return Promise.resolve();
};

export default ensureCSS;

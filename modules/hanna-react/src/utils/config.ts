import { SSRSupport } from '@hugsmidjan/react/hooks';

export type { LinkRenderer } from '../_abstract/_Link.js';
export { setLinkRenderer } from '../_abstract/_Link.js';

// ---------------------------------------------------------------------------

export { setDefaultSSR } from '@hugsmidjan/react/hooks';
export type SSRSupportProps = {
  /**
   * Indicates whether server-side rendering is supported or not.
   *
   * The `ssr-only` value is useful for cases where you need
   * to demo the server-rendered version in a browser.
   */
  ssr?: SSRSupport;
};
export type { SSRSupport };

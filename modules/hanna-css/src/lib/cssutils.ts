import { styleServerUrl } from '@reykjavik/hanna-utils/assets';
import { makeVariables, VariableOptions, VariableStyles } from 'es-in-css';

import {
  CssModuleToken,
  cssVersion as fullCssVersion,
  CssVersionToken,
  majorCssVersion,
} from './style-server-info.js';

// ---------------------------------------------------------------------------

/**
 * Convenience shorthand for process.env.NODE_ENV !== 'production',
 * used internally in some of the exported mixins, etc.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#isdevmode
 */
export const isDevMode = process.env.NODE_ENV !== 'production';

/** Extract the CSS major version from the curent target version constant */
type CssMajorVersion = typeof fullCssVersion extends `0.${infer PreMajor}.${string}`
  ? `0.${PreMajor}`
  : typeof fullCssVersion extends `${infer Major}.${string}`
  ? Major
  : never;

/**
 * The current MAJOR version of the Hanna style-server CSS files this version of
 * `@reyjkjavik/hanna-css` package targets.
 *
 * Primary use is for debugging/informational purposes.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#targetcssversion
 */
export const targetCssVersion = majorCssVersion as CssMajorVersion;

/** @deprecated use `targetCssVersion` instead.  (Will be removed in v0.4) */
export const cssVersion = targetCssVersion;

// ---------------------------------------------------------------------------

const variableOptions: Partial<VariableOptions> = {
  nameRe: /^[a-z0-9$_-]+$/i,
  // .Tabs$$tab__borderWidth  -->  var(--Tabs__tab--borderWidth)
  toCSSName: (name) => name.replace(/_/g, '-').replace(/\$/g, '_'),
  // NOTE: Set the namespace to 'hanna--' before next MAJOR release
  // namespace: 'hanna--',
  namespace: '',
};

/**
 * Limited version of the `makeVariables` helper from `es-in-css`,
 * configured specifically for the Hanna project.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#buildvariables
 */
export const buildVariables = <T extends string>(
  input: Array<T>,
  /**
   * Custom prefix that gets prepended to the generated CSS variable names.
   *
   * (NOTE: Namespaces are internally normalized to end with either `--` or `__`.)
   */
  namespace?: string
): VariableStyles<T> => {
  let options = variableOptions;
  if (namespace) {
    namespace = namespace.trim().replace(/-+$/, '').replace(/_+$/, '__');
    if (!/_$/.test(namespace)) {
      namespace += '--';
    }

    options = {
      ...options,
      namespace: variableOptions.namespace + namespace,
    };
  }
  return makeVariables(input, options);
};

// Using destructuring, rather than direct assignment, as it seems to reduce
// the chance of bundlers (e.g. Rollup) treating getting the methods on
// `makeVariables` as a side-effect
const { isVar, join } = makeVariables;
buildVariables.isVar = isVar;
buildVariables.join = join;

// ---------------------------------------------------------------------------

export { setStyleServerUrl, styleServerUrl } from '@reykjavik/hanna-utils/assets';

const cssCurrentVersionFolder =
  process.env.NODE_ENV === 'production'
    ? 'v' + targetCssVersion
    : styleServerUrl.indexOf('://localhost') === -1
    ? 'dev-v' + targetCssVersion
    : 'dev'; // Use "live" compilation results during local dev.

type CssBundleOpts<AcceptNewerVersion extends boolean = false> = {
  /** If you want to pin your CSS files to a specific version */
  version?:
    | CssVersionToken
    | (AcceptNewerVersion extends true
        ? `v${CssMajorVersion}.${number}${string}`
        : never);

  /** @deprecated Use `setStyleServerUrl()` instead. (will be removed in v0.6) */
  testingServer?: string;
};

export type {
  /** CSS tokens to use with `getCssBundleUrl()` */
  CssModuleToken,
};

/**
 * This methods generates a URL to load a correctly versioned CSS bundle from the Hanna Style Server.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#getcssbundleurl
 */
export const getCssBundleUrl = <AcceptNewerVersion extends boolean = false>(
  cssTokens: string | Array<CssModuleToken>,
  options?: CssBundleOpts<AcceptNewerVersion>
): string => {
  options = options || {};
  // eslint-disable-next-line deprecation/deprecation
  const host = (options.testingServer || styleServerUrl).replace(/\/$/, '');
  const versionFolder = options.version || cssCurrentVersionFolder;
  const tokens = typeof cssTokens === 'string' ? cssTokens : cssTokens.join(',');

  return `${host}/bundle/${versionFolder}?m=${tokens.replace(/\s/g, '')}`;
};

// ===========================================================================

/**
 * Apple's insitent failure to support `overflow-x: hidden` on the `<html/>`
 * element (alone) in Safari is causing us much grief.
 *
 * In Safari 16+ `overflow-x: clip` works as a workaround but that leaves
 * all older versions still affected.
 *
 * Long story short, having weighed all other options, We're forced to add a
 * heavy-handed scroll-event listener that insta-resets any horizontal scrolling
 * on the <html/> element.
 *
 * The obvious solution (put `overflow-x: hidden;` on <body/> instead) has
 * the side-effect of completely preventing the use of `position: sticky`
 * anywhere on the page — making it a complete "no-go" solution.
 *
 * The only other solution[^1] is to make <body/> the page scroll container...
 *
 * ```css
 * body {
 *   height: 100vh;
 *   overflow-x: hidden;
 *   overflow-y: scroll;
 * }
 * ```
 *
 * [^1]: Which works great until you start working with any 3rd-party script
 * solutions that blindly assume <html/> is the scroll-container,
 * giving us lots of borked behavior.
 *
 * Thus we end up with this abomination:
 */
const safariSidescrollFix = `
  (function (d, u, h) {
    u.indexOf('Chrome') < 0 && u.indexOf('Safari') > 0 &&
    d.addEventListener("scroll", function () {
      (h = d.documentElement).scrollLeft > 0 &&
        (h.scrollLeft = 0);
    });
  })(document, navigator.userAgent);
`;

/**
 * Usees JavaScript to instantly set a class-name on the <html/> element to
 * help the CSS suppress Flicker of Unstyled Content (FOUC)
 * on server-side-rendered HTML before client-side hydration/sprinkling
 * has had chance to do their Progressive Enhancements.
 *
 * In case the client-side sprinkling fails for some reason, the class-name
 * will be removed after a few seconds.
 */
const noFlickerSnippet = `
  (function (c, n) {
    c.add(n);
    setTimeout(function () {
      c.remove(n);
    }, 6000);
  })(document.documentElement.classList, 'before-sprinkling');
`;

/**
 * Removes all whitespace from script-snippets, except non-breaking spaces
 * which get turned into real spaces.
 */
const cmprss = (script: string) =>
  script
    .replace(/[\t \n]/g, '') // remove all whitespace
    .replace(/ /g, ' '); // convert non-breaking spaces to real spaces.

/**
 * Essential Hanna styling assisting scripts. These provide flicker-free
 * progressive enhancement for server-rendered dynamic Hanna UI compoennts,
 * and fix some Safari-related styling issues.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#getessentialhannascripts
 */
export const getEssentialHannaScripts = () =>
  cmprss(safariSidescrollFix + noFlickerSnippet);

/**
 * @deprecated  Use `getEssentialHannaScripts` instead  (Will be removed in v0.5)
 */
export const getEssentialHannaScripts_MultiPage = getEssentialHannaScripts;

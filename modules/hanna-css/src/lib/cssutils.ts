import { styleServerUrl } from '@reykjavik/hanna-utils/assets';
import { makeVariables, VariableOptions, VariableStyles } from 'es-in-css';

import { cssVersion as fullCssVersion } from './style-server-info';

// ---------------------------------------------------------------------------

/**
 * Convenience shorthand for process.env.NODE_ENV !== 'production',
 * used internally in some of the exported mixins, etc.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#isdevmode
 */
export const isDevMode = process.env.NODE_ENV !== 'production';

/**
 * The current version of the Hanna style-server CSS files this version of
 * `@reyjkjavik/hanna-css` package targets.
 *
 * Primary use is for debugging/informational purposes.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#targetcssversion
 */
export const targetCssVersion =
  (fullCssVersion.match(/^(?:0\.\d+|[1-9]\d*)/) || [''])[0] || '';

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
      ...variableOptions,
      namespace: variableOptions.namespace + namespace,
    };
  }
  return makeVariables(input, options);
};
buildVariables.isVar = makeVariables.isVar;
buildVariables.join = makeVariables.join;

// ---------------------------------------------------------------------------

export { setStyleServerUrl, styleServerUrl } from '@reykjavik/hanna-utils/assets';

const cssCurrentVersionFolder =
  process.env.NODE_ENV === 'production'
    ? 'v' + targetCssVersion
    : styleServerUrl.indexOf('://localhost') === -1
    ? 'dev-v' + targetCssVersion.replace(/\..+/, '') // only the MAJOR version
    : 'dev'; // Use "live" compilation results during local dev.

type CssBundleOpts = {
  /** If you want to pin your CSS files to a specific version */
  version?: string;

  /** @deprecated Use `setStyleServerUrl()` instead. (will be removed in v0.6) */
  testingServer?: string;
};

/**
 * This methods generates a URL to load a correctly versioned CSS bundle from the Hanna Style Server.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#getcssbundleurl
 */
export const getCssBundleUrl = (
  cssTokens: string | Array<string>,
  options?: CssBundleOpts
): string => {
  options = options || {};
  const host = (options.testingServer || styleServerUrl).replace(/\/$/, '');
  const versionFolder = options.version || cssCurrentVersionFolder;
  const tokens = typeof cssTokens === 'string' ? cssTokens : cssTokens.join(',');

  return host + '/bundle/' + versionFolder + '?m=' + tokens;
};

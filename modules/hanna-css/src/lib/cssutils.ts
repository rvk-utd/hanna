import { makeVariables, VariableOptions, VariableStyles } from 'es-in-css';

import { cssVersion as fullCssVersion } from './style-server-info';

// ---------------------------------------------------------------------------

export const isDevMode = process.env.NODE_ENV !== 'production';

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
 */
export const buildVariables = <T extends string>(
  input: Array<T>,
  /** Custom prefix that gets prepended to the generated CSS variable names. */
  namespace?: string
): VariableStyles<T> => {
  let options = variableOptions;
  if (namespace) {
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

// Add this workaround for remix_run as it's build script
// does not allow string replacing process.env.* build variables
// See: https://github.com/remix-run/remix/discussions/3541
declare const _NPM_PUB_: boolean;

const cssCurrentVersionFolder =
  process.env.NODE_ENV === 'production'
    ? 'v' + targetCssVersion
    : typeof _NPM_PUB_ !== 'undefined'
    ? 'dev-v' + targetCssVersion.replace(/\..+/, '') // only the MAJOR version
    : 'dev'; // Use "live" compilation results during local dev.

export const styleServerUrl =
  typeof _NPM_PUB_ !== 'undefined' || process.env.NODE_ENV === 'production'
    ? 'https://styles.reykjavik.is'
    : 'http://localhost:4000';

export const getCssBundleUrl = (
  cssTokens: string | Array<string>,
  options?: {
    /** If you want to pin your CSS files to a specific version */
    version?: string;
    /** If you've got a custom style server instance, for testing/staging/etc. */
    testingServer?: string;
  }
): string => {
  options = options || {};
  const host = (options.testingServer || styleServerUrl).replace(/\/$/, '');
  const versionFolder = options.version || cssCurrentVersionFolder;
  const tokens = typeof cssTokens === 'string' ? cssTokens : cssTokens.join(',');

  return host + '/bundle/' + versionFolder + '?m=' + tokens;
};

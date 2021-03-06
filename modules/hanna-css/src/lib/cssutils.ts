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
};

/**
 * Limited version of the `makeVariables` helper from `es-in-css`,
 * configured specifically for the Hanna project.
 */
export const buildVariables = <T extends string>(input: Array<T>): VariableStyles<T> =>
  makeVariables(input, variableOptions);
buildVariables.isVar = makeVariables.isVar;
buildVariables.join = makeVariables.join;

// ---------------------------------------------------------------------------

const cssCurrentVersionFolder =
  process.env.NODE_ENV === 'production'
    ? 'v' + targetCssVersion
    : process.env.NPM_PUB
    ? 'dev-v' + targetCssVersion.replace(/\..+/, '') // only the MAJOR version
    : 'dev'; // Use "live" compilation results during local dev.

export const styleServerUrl =
  process.env.NPM_PUB || process.env.NODE_ENV === 'production'
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
  const host = options.testingServer || styleServerUrl;
  const versionFolder = options.version || cssCurrentVersionFolder;
  const tokens = typeof cssTokens === 'string' ? cssTokens : cssTokens.join(',');

  return host + '/bundle/' + versionFolder + '?m=' + tokens;
};

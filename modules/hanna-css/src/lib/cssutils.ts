import { makeVariables, VariableOptions, VariableStyles } from 'es-in-css';

export const isDevMode = process.env.NODE_ENV !== 'production';

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

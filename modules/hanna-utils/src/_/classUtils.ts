import { Falsy } from './misc.js';

type ClassNames = string | Falsy | ReadonlyArray<ClassNames>;

/**
 * Filters and joins a messy list of CSS classNames, neatly skipping falsy values.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#classes
 */
/*#__NO_SIDE_EFFECTS__*/
export const classes = (...classNames: ReadonlyArray<ClassNames>): string => {
  let classStr = '';
  for (let i = 0, len = classNames.length; i < len; i++) {
    let name = classNames[i];
    if (name && Array.isArray(name)) {
      name = classes(...name);
    }
    if (!name) {
      continue;
    }
    classStr += (classStr ? ' ' : '') + name;
  }
  return classStr;
};

/*
  // Alternative implementation that's more concise, but likely slower:

  export const classes = (...classNames: ReadonlyArray<ClassNames>): string =>
    classNames
      .map((name) => (name && Array.isArray(name) ? classes(...name) : name))
      .filter((name) => !!name)
      .join(' ');
*/

// ===========================================================================

export type ClassNameModifiers = string | Falsy | ReadonlyArray<ClassNameModifiers>;

/**
 * Constructs a BEM class-name with one or more optional "--modifier" flags.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#modifiedclass
 */
/*#__NO_SIDE_EFFECTS__*/
export const modifiedClass = (
  /** The base BEM class-name */
  bemClass: string,
  /** One or more BEM --modifiers to apply to the base `bemClass`. */
  modifiers: ClassNameModifiers,
  /** Optional extra class-names to add to the output. */
  extraClass?: string
): string => {
  const _flattenModifiers = (mod: ClassNameModifiers): string =>
    !mod || !mod.length
      ? ''
      : typeof mod === 'string'
      ? ` ${bemClass}--${mod}`
      : mod.map(_flattenModifiers).join('');

  return bemClass + _flattenModifiers(modifiers) + (extraClass ? ` ${extraClass}` : '');
};

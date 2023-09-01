import { Modifiers } from '@hugsmidjan/qj/classUtils';

export type BemModifierProps = {
  /** List of CSS BEM --modifier's to add to the component's main wrapper.
   *
   * All falsy values are neatly skipped.
   */
  modifier?: Modifiers;
};
export type BemProps = {
  /** CSS BEM class-name prefix to be used for this component. Defaults to the same as the original component's displayName */
  bem?: string;
} & BemModifierProps;

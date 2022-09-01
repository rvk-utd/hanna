import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { capitalize } from '@reykjavik/hanna-utils';

type DefaultProp<N extends string> = `default${Capitalize<N>}`;
type PropPair<N extends string> = N | DefaultProp<N>;

// Used here to get nicer TS error messages when one of the keys is altogether
// missing from the type declaration of the props object passed in
type StrictKeys<
  P extends Record<string, unknown>,
  N extends string
> = PropPair<N> extends keyof P ? P : { [Key in PropPair<N>]: P[Key] };

// ---------------------------------------------------------------------------

/**
 * State hook to simplify dealing with a the complexities of supporting a mixture
 * of "controlled" and "uncontrolled" component state.
 *
 * The returned value and dispatcher/setter function return the controlled
 * `value`, but gracefully handle changes in defaultValue in uncontrolled mode,
 * and handles (unexpected) "mode-changes" in a predictable manner.
 *
 * It assumes (by default) that the calling component has
 * a pair of props following the naming convention `foo` and `defaultFoo` —
 * similar to React's own `<input/>` and `<select/>` HTML components warn about
 * their `value` and `defaultValue` props being misused.
 *
 * NOTE: This hook also exposes a slightly lower-level helper hook
 * `useMixedControlState.raw(value, defaultValue)`, for cases where you don't
 * have a neatly-shaped props object as described above, or you need to do
 * some sort of pre-processing of either prop value.
 *
 * ```tsx
 * import React, { FC, ReactNode } from 'react';
 * import { useMixedControlState } from '@reykjavik/hanna-react/utils';
 *
 * type FooBarProps = {
 *   visible?: boolean;
 *   onChange?: (newVisible: boolean) => void;
 *   defaultVisible?: boolean;
 * };
 *
 * export const FooBar: FC<FooBarProps> = (props) => {
 *   const [visible, setVisible] = useMixedControlState(props, 'visible', true);
 *
 *   const handleToggle = () => {
 *     props.onChange?.(!visible);
 *     setVisible(!visible);
 *   };
 *   return (
 *     <div>
 *       <button onClick={handleToggle}>Toggle</button>
 *       <div hidden={!visible}>{props.children}</div>
 *     </div>
 *   );
 * };
 * ```
 */
export const useMixedControlState = <
  N extends string,
  P extends { [x in PropPair<N>]?: unknown }
>(
  /** The props object of your component  */
  props: StrictKeys<P, N>,
  /** Name of the prop for the controlled value */
  name: N,
  /**
   * A last-resort default value for the defaultValue prop
   *
   * Used as uncontrolled default if the `default${capitalize(name)}` value
   * of `props` is missing/undefined.
   */
  defaultDefault?: P[DefaultProp<N>]
) => {
  let defaultValue = props[`default${capitalize(name)}`] as
    | undefined
    | typeof props[DefaultProp<N>];
  if (defaultValue === undefined) {
    defaultValue = defaultDefault;
  }
  return useMixedControlState.raw(props[name], defaultValue, name);
};

// ===========================================================================

// ===========================================================================

type CtrlMode = 'controlled' | 'uncontrolled' | undefined;

// ---------------------------------------------------------------------------

/**
 * a slightly lower-level hook alternative to
 * `useMixedControlState(props, name)`, for cases where you don't
 * have a neatly-/conventionally-shaped props object, or if you need to do
 * some sort of pre-processing of either prop value.
 *
 * ```tsx
 * import { useMixedControlState } from '@reykjavik/hanna-react/utils';
 *
 * declare const props: { visible?: boolean; defaultVisible?: boolean };
 *
 * const [vislble, setVisible] = useMixedControlState.raw(
 *    props.vislble,
 *    props.defaultVisible,
 *    'visible'
 * );
 * // has the same effect as this:
 * const [visible, setVisible] = useMixedControlState(props, 'visible');
 * ```
 */
useMixedControlState.raw = <C, U>(
  /** Controlled value. */
  value: C,
  /** Default/initial value for uncontrolled use. */
  defaultValue: U,
  /**
   * Prop name to display more meaningful warnings about when value
   * and defaultValue are both defined, or if the component switches
   * between modes mid-stream.
   *
   * If left undefined, the hook emits more generic/vague warnings
   */
  warningPropName?: string
): [C | U, Dispatch<SetStateAction<C | U>>] => {
  /* eslint-disable react-hooks/rules-of-hooks */

  const meta = useRef({
    lastMode: undefined as CtrlMode,
    lastDefault: defaultValue,
    // lastValue: value,
  }).current;
  const { lastMode, lastDefault /*,  lastValue  */ } = meta;
  const mode =
    value !== undefined
      ? 'controlled'
      : defaultValue !== undefined
      ? 'uncontrolled'
      : lastMode;

  // Validate sane use of the component, during development.
  if (process.env.NODE_ENV !== 'production') {
    if (value !== undefined && defaultValue !== undefined) {
      console.error(
        `WARNING:` +
          ` Don't mix` +
          (warningPropName
            ? ` \`${warningPropName}\` and \`default${capitalize(
                warningPropName
              )}\` props`
            : 'controlled and uncontrolled mode') +
          `\n` +
          `Use one or the other.`
      );
    }
    if (lastMode && lastMode !== mode) {
      console.error(
        `WARNING:` +
          `A component is changing from ${lastMode} to ${mode} mode.` +
          `\n` +
          (warningPropName
            ? `Decide between using \`${warningPropName}\` (controlled) prop` +
              ` OR \`default${capitalize(warningPropName)}\` (uncontrolled)`
            : `Decide between using either controlled OR uncontrolled mode`) +
          ` for the lifetime of the component.`
      );
    }
  }

  const [localValue, _setLocalValue] = useState<C | U>(defaultValue);
  type SpiedSetter = typeof _setLocalValue & { $called?: true };

  const setLocalValue = useCallback<typeof _setLocalValue>(
    (newState) => {
      if (mode === 'controlled' && typeof newState === 'function') {
        // @ts-expect-error  (TS needs a bit of help here, it seems,
        // because the C and U gernerics are too …err… generic?)
        const action: (state: C | U) => C | U = newState;
        newState = action(value);
      }
      (_setLocalValue as SpiedSetter).$called = true;
      _setLocalValue(newState);
    },
    [value, mode]
  );

  // The mode can change but it should never go back to `undefined` state
  // this is similar to what React does with it's <input> and <select>
  // elements.
  // In dev-mode an WARNING gets logged whenever the mode changes.
  meta.lastMode = mode;
  if (mode === 'uncontrolled') {
    // only update lastDefault when in unconrolled mode
    // to guarantee capture of changes that might happen during
    // controlled mode. Something that should ideally not happen
    // but is worth keeping as sane as possible nonetheless.
    meta.lastDefault = defaultValue;
    if (!(_setLocalValue as SpiedSetter).$called && defaultValue !== lastDefault) {
      _setLocalValue(defaultValue); // Immediately exits and re-renders the component
    }
  }
  // meta.lastValue = value;

  const retValue = mode === 'controlled' ? value : localValue;

  return [retValue, setLocalValue];
  /* eslint-enable react-hooks/rules-of-hooks */
};

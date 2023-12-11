import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { capitalize } from '@reykjavik/hanna-utils';

type CtrlMode = 'controlled' | 'uncontrolled' | undefined;

type RetArray<R> = [value: R, setValue: Dispatch<SetStateAction<R>>, mode: CtrlMode];

// ---------------------------------------------------------------------------

type DefaultProp<N extends string> = `default${Capitalize<N>}`;
type PropPair<N extends string> = N | DefaultProp<N>;

// Used here to get nicer TS error messages when one of the keys is altogether
// missing from the type declaration of the props object passed in.
type StrictKeys<
  P extends Record<string, unknown>,
  N extends string
> = PropPair<N> extends keyof P ? P : { [Key in PropPair<N>]: P[Key] };

// ===========================================================================

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
export function useMixedControlState<
  N extends string,
  P extends { [x in PropPair<N>]?: unknown },
  D extends Exclude<V, undefined>,
  V = P[DefaultProp<N>] | P[N]
>(
  /** The props object of your component  */
  props: StrictKeys<P, N>, // StrictKeys give nicer error messages to users.
  /** Name of the prop for the controlled value */
  name: N,
  /**
   * A last-resort default value to use instead of `undefined`.  \
   * __NOTE:__ All post-factum changes/updates to this value are ignored!
   */
  emptyValue: D
): RetArray<Exclude<V, undefined>>;

export function useMixedControlState<
  N extends string,
  P extends { [x in PropPair<N>]?: unknown },
  D extends Exclude<V, undefined>,
  V = P[DefaultProp<N>] | P[N]
>(
  /** The props object of your component  */
  props: StrictKeys<P, N>, // StrictKeys give nicer error messages to users.
  /** Name of the prop for the controlled value */
  name: N,
  /**
   * A last-resort default value to use instead of `undefined`.  \
   * __NOTE:__ All post-factum changes/updates to this value are ignored!
   */
  emptyValue?: D
): RetArray<V>;

// ---------------------------------------------------------------------------

export function useMixedControlState<
  N extends string,
  P extends { [x in PropPair<N>]?: unknown },
  D extends P[DefaultProp<N>] | P[N]
>(props: StrictKeys<P, N>, name: N, emptyValue?: D): RetArray<P[DefaultProp<N>] | P[N]> {
  const value = (props as P)[name];
  const defaultValue = (props as P)[`default${capitalize(name)}`];
  return useMixedControlState.raw(value, defaultValue, name, emptyValue);
}

// ===========================================================================
//
//
// ===========================================================================

const defaultWarningLogger = (message: string) => console.error(message);
useMixedControlState.$warningLogger = defaultWarningLogger as
  | typeof defaultWarningLogger
  | undefined;

// ---------------------------------------------------------------------------

type SaneUseValidator = (props: {
  warningPropName: string | undefined;
  value: unknown;
  defaultValue: unknown;
  // mode: CtrlMode;
  lastMode: CtrlMode;
}) => void;

/** Validate sane use of the component, during development. */
const validateSaneUse: SaneUseValidator = ({
  warningPropName,
  value,
  defaultValue,
  lastMode,
}) => {
  const warn = useMixedControlState.$warningLogger || defaultWarningLogger;

  if (value !== undefined && defaultValue !== undefined) {
    warn(
      `WARNING:` +
        ` Don't mix${
          warningPropName
            ? ` \`${warningPropName}\` and \`default${capitalize(
                warningPropName
              )}\` props`
            : 'controlled and uncontrolled mode'
        }\n` +
        `Use one or the other.`
    );
    return;
  }

  const C_to_U = lastMode === 'controlled' && defaultValue !== undefined;
  const U_to_C = lastMode === 'uncontrolled' && value !== undefined;
  if (C_to_U || U_to_C) {
    warn(
      `WARNING:${
        C_to_U
          ? `A component seems to be attempting to change ` +
            `from controlled to uncontrolled mode. ` +
            `This is not possible.`
          : `A component is changing ` + `from uncontrolled to controlled mode.`
      }\n` +
        `Decide between using ${
          warningPropName
            ? `\`${warningPropName}\` (controlled) prop` +
              ` OR \`default${capitalize(warningPropName)}\` (uncontrolled)`
            : `either controlled OR uncontrolled mode`
        } for the lifetime of the component.`
    );
  }
};

// ===========================================================================

/**
 * A slightly lower-level hook alternative to
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
function useRaw<C, U, D extends Exclude<C | U, undefined>>(
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
  warningPropName: string | undefined,
  /**
   * A last-resort default value to use instead of `undefined`.  \
   * __NOTE:__ All post-factum changes/updates to this value are ignored!
   */
  emptyValue: D
): RetArray<Exclude<C | U, undefined>>;

function useRaw<C, U, D extends C | U>(
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
  warningPropName?: string,
  /**
   * A last-resort default value to use instead of `undefined`.  \
   * __NOTE:__ All post-factum changes/updates to this value are ignored!
   */
  emptyValue?: D
): RetArray<C | U>;

// ---------------------------------------------------------------------------

function useRaw<C, U, D extends C | U>(
  value: C,
  defaultValue: U,
  warningPropName?: string,
  emptyValue?: D
): RetArray<C | U> {
  type Spied = { $isCalled?: true };
  type V = C | U;

  const metaRef = useRef({
    lastMode: undefined as CtrlMode,
    lastDefault: defaultValue,
    // lastValue: value,
    _emptyValue: emptyValue as V,
  });
  const meta = metaRef.current;
  const { lastMode, lastDefault, _emptyValue /*,  lastValue  */ } = meta;

  if (process.env.NODE_ENV !== 'production') {
    validateSaneUse({ warningPropName, value, defaultValue, lastMode });
  }

  const mode =
    lastMode === 'controlled'
      ? 'controlled'
      : value !== undefined
      ? 'controlled'
      : defaultValue !== undefined
      ? 'uncontrolled'
      : lastMode;

  const [localValue, _setLocalValue] = useState<V>(
    defaultValue !== undefined ? defaultValue : _emptyValue
  );

  const setLocalValue = useCallback<typeof _setLocalValue>(
    (newState) => {
      if (mode === 'controlled' && typeof newState === 'function') {
        newState = (newState as (x: V) => V)(value !== undefined ? value : _emptyValue);
      }
      metaRef.current.lastMode = mode || 'uncontrolled';

      const setterFn =
        typeof newState === 'function' ? (newState as (x: V) => V) : () => newState as V;

      _setLocalValue((prevState) => {
        let newState = setterFn(prevState);
        newState = newState !== undefined ? newState : _emptyValue;
        if (prevState !== newState) {
          (_setLocalValue as Spied).$isCalled = true;
        }
        return newState;
      });
    },
    [value, mode, _emptyValue]
  );

  // The mode can change but it should never go back to `undefined` state
  // this is similar to what React does with <input/> and <select/> elements.
  // In dev-mode an WARNING gets logged whenever the mode changes.
  meta.lastMode = mode;

  if (mode === 'uncontrolled') {
    // only update lastDefault when in unconrolled mode
    // to guarantee capture of changes that might happen during
    // controlled mode. Something that should ideally not happen
    // but is worth keeping as sane as possible nonetheless.
    meta.lastDefault = defaultValue;

    if (!(_setLocalValue as Spied).$isCalled && defaultValue !== lastDefault) {
      // Immediately exits and re-renders the component
      _setLocalValue(defaultValue !== undefined ? defaultValue : _emptyValue);
    }
  }
  // meta.lastValue = value;

  const retValue = mode === 'controlled' ? value : localValue;

  return [retValue, setLocalValue, mode];
}

useMixedControlState.raw = useRaw;

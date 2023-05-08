import React, { FocusEvent, RefObject, useCallback, useState } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { isPreact } from './utils/env.js';
import { SSRSupport, useIsBrowserSide } from './utils.js';

type InputClassNames = {
  /** Basic/raw FormField BEM name */
  bem: string;
  /** Standard name for "<input/>"-styled controls */
  input: string;
  /** Standard name for radio/checkbox group conotrols */
  options: string;
  /** Generic name for unstyled/free-form controls. */
  control: string;
};

const inputClassNames: InputClassNames = {
  bem: 'FormField',
  input: 'FormField__input',
  options: 'FormField__options',
  control: 'FormField__control',
};

export type FormFieldInputProps = {
  id?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  'aria-invalid'?: boolean | 'true' | 'false';
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

// FIXME: Get rid of these `any`s.
// This was most likely put in to deal with conflicting typing on the evernt objects for different HTML Element types
type FocusEvents = {
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
};
type FocusPropMaker = <P extends FocusEvents>(ownProps?: P) => P & Required<FocusEvents>;

// ---------------------------------------------------------------------------

export type FormFieldWrappingProps = {
  /** Container className - alongside "FormField" */
  className?: string;

  label: string | JSX.Element;
  assistText?: string | JSX.Element;

  hideLabel?: boolean;

  disabled?: boolean;
  readOnly?: boolean;

  invalid?: boolean;
  errorMessage?: string | JSX.Element;

  required?: boolean;
  /** Hidden label prefix text to indicate that the field is required.
   *
   * If your field is required but should not say so in its label
   * then set this prop to `false`
   *
   * Default: `"Þarf að fylla út"`
   * */
  reqText?: string | false;

  /** Optional pre-determinted id="" for the __input */
  id?: string;

  /** Ref object pointing to the outermost `.FormField` element */
  wrapperRef?: RefObject<HTMLElement>;

  ssr?: SSRSupport;
};

export type FormFieldGroupWrappingProps = FormFieldWrappingProps & {
  LabelTag?: 'h3' | 'h4' | 'h5';
};

export type FormFieldProps = FormFieldGroupWrappingProps & {
  /** Container className - alongside "FormField" */
  className: string;
  small?: boolean;

  group?: boolean;

  empty?: boolean;
  filled?: boolean;

  renderInput(
    className: InputClassNames,
    inputProps: FormFieldInputProps,
    addFocusProps: FocusPropMaker,
    isBrowser?: boolean
  ): JSX.Element;
};

// ---------------------------------------------------------------------------

// eslint-disable-next-line complexity
export const FormField = (props: FormFieldProps) => {
  const {
    className,
    small,

    group,
    LabelTag = group ? 'h4' : undefined,

    label,
    assistText,

    hideLabel,

    empty,
    filled,

    readOnly,
    disabled,

    invalid,
    errorMessage,

    required,
    reqText, // i18n

    renderInput,

    id,
    ssr,
  } = props;

  const isBrowser = useIsBrowserSide(ssr);

  const isInvalid = invalid || !!errorMessage || undefined;
  const domid = useDomid(id);
  const [focused, setFocused] = useState(false);
  // @ts-expect-error  (Duck knows why this errors?!)
  const addFocusProps: FocusPropMaker = useCallback((ownProps) => {
    const { onFocus, onBlur } = ownProps || {};
    const focusHandler = (e: FocusEvent) => {
      if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
        setFocused(true);
      }
      onFocus && onFocus(e);
    };
    const blurHandler = (e: FocusEvent) => {
      if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
        setFocused(false);
      }
      onBlur && onBlur(e);
    };

    const focusProps = {
      ...ownProps,
      onFocus: focusHandler,
      onBlur: blurHandler,
    };

    if (isPreact) {
      const focusinHandler = (e: FocusEvent) => {
        e.currentTarget !== e.target && focusHandler(e);
      };
      const focusoutHandler = (e: FocusEvent) => {
        e.currentTarget !== e.target && blurHandler(e);
      };
      // @ts-expect-error  (Sneak this in as Preact does not bubble `FocusEvent`s)
      focusProps.onfocusin = focusinHandler;
      // @ts-expect-error  (Sneak this in as Preact does not bubble `FocusEvent`s)
      focusProps.onfocusout = focusoutHandler;
    }

    return focusProps;
  }, []);

  const errorId: string | undefined = errorMessage ? 'error:' + domid : undefined;
  const assistTextId: string | undefined = assistText ? 'assist:' + domid : undefined;
  const labelId: string | undefined = LabelTag ? 'label:' + domid : undefined;

  const reqStar = required && reqText !== false && (
    <abbr
      className="FormField__label__reqstar"
      // TODO: add mo-better i18n thinking
      title={(reqText || 'Þarf að fylla út') + ': '}
    >
      *
    </abbr>
  );

  const inputProps: FormFieldInputProps = {
    id: domid,
    disabled: disabled,
    required: required,
    readOnly: readOnly,
    'aria-invalid': isInvalid,
    'aria-describedby':
      assistTextId && errorId ? assistTextId + ' ' + errorId : assistTextId || errorId,
    'aria-labelledby': labelId, // undefined if normalLabel
  };

  return (
    <div
      className={getBemClass(
        'FormField',
        [
          small && 'small',
          hideLabel && 'nolabel',
          isInvalid && 'invalid',
          disabled && 'disabled',
          readOnly && 'readonly',
          isBrowser && empty && 'empty',
          isBrowser && filled && 'filled',
          isBrowser && focused && 'focused',
        ],
        className
      )}
      ref={props.wrapperRef as RefObject<HTMLDivElement>}
    >
      {LabelTag ? (
        <LabelTag className="FormField__label" id={labelId}>
          {' '}
          {reqStar} {label}{' '}
        </LabelTag>
      ) : (
        <label className="FormField__label" htmlFor={domid}>
          {' '}
          {reqStar} {label}{' '}
        </label>
      )}{' '}
      {renderInput(inputClassNames, inputProps, addFocusProps, isBrowser)}
      {assistText && (
        <div id={assistTextId} className="FormField__assist">
          {assistText}
        </div>
      )}
      {errorMessage && (
        <div id={errorId} className="FormField__error">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FormField;

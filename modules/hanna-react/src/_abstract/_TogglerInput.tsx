import React, { Fragment } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { WrapperElmProps } from '../utils.js';
import { BemModifierProps } from '../utils/types.js';
import { useDomid } from '../utils/useDomid.js';

export type TogglerInputProps = {
  label: string | JSX.Element;
  children?: never;
  invalid?: boolean;
  /** Hidden label prefix text to indicate that the field is required.
   *
   * If your field is required but should not say so in its label
   * then set this prop to `false`
   *
   * Default: `"Þarf að fylla út"`
   * */
  reqText?: string | false;
  errorMessage?: string | JSX.Element;
  Wrapper?: 'div' | 'li';
  inputProps?: JSX.IntrinsicElements['input'];
} & BemModifierProps &
  WrapperElmProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;

type _TogglerInputProps = {
  bem: string;
  type: 'radio' | 'checkbox';
  innerWrap?: boolean;
};

export const TogglerInput = (props: TogglerInputProps & _TogglerInputProps) => {
  const {
    bem,
    modifier,
    className,
    label,
    invalid,
    errorMessage,
    Wrapper = 'div',
    required,
    reqText,
    type,
    id,
    innerWrap,
    wrapperProps,
    inputProps,
    ...restInputProps
  } = props;

  const domid = useDomid(id);
  const errorId = errorMessage && `error${domid}`;

  const reqStar = required && reqText !== false && (
    <abbr
      className={`${bem}__label__reqstar`}
      // FIXME: add mo-better i18n thinking
      title={`${reqText || 'Þarf að haka í'}: `}
    >
      *
    </abbr>
  );

  const readOnly = restInputProps.readOnly || (inputProps || {}).readOnly;

  const labelContent = (
    <>
      {' '}
      {reqStar} {label}{' '}
    </>
  );

  return (
    <Wrapper
      {...(wrapperProps as {})}
      className={modifiedClass(
        bem,
        modifier,
        // Prefer `className` over `wrapperProps.className`
        className || (wrapperProps || {}).className
      )}
    >
      <input
        className={`${bem}__input`}
        type={type}
        id={domid}
        aria-invalid={invalid || !!errorMessage || undefined}
        aria-describedby={errorId}
        {...restInputProps}
        {...inputProps}
        {...(readOnly && { disabled: true })}
      />{' '}
      <label className={`${bem}__label`} htmlFor={domid}>
        {innerWrap ? (
          <span className={`${bem}__label__wrap`}>{labelContent}</span>
        ) : (
          labelContent
        )}
        {readOnly && (
          <input type="hidden" name={restInputProps.name} value={restInputProps.value} />
        )}
      </label>
      {errorMessage && (
        <div className={`${bem}__error`} id={errorId}>
          {errorMessage}
        </div>
      )}
    </Wrapper>
  );
};

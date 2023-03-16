import React, { Fragment } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import { BemPropsModifier } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

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
  wrapperProps?: JSX.IntrinsicElements['div'];
  inputProps?: JSX.IntrinsicElements['input'];
} & BemPropsModifier &
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
  const errorId = errorMessage && 'error' + domid;

  const reqStar = required && reqText !== false && (
    <abbr
      className={bem + '__label__reqstar'}
      // TODO: add mo-better i18n thinking
      title={(reqText || 'Þarf að haka í') + ': '}
    >
      *
    </abbr>
  );

  const labelContent = (
    <>
      {' '}
      {reqStar} {label}{' '}
    </>
  );

  return (
    <Wrapper {...(wrapperProps as {})} className={getBemClass(bem, modifier, className)}>
      <input
        className={bem + '__input'}
        type={type}
        id={domid}
        aria-invalid={invalid || !!errorMessage || undefined}
        aria-describedby={errorId}
        {...restInputProps}
        {...inputProps}
      />{' '}
      <label className={bem + '__label'} htmlFor={domid}>
        {innerWrap ? (
          <span className={bem + '__label__wrap'}>{labelContent}</span>
        ) : (
          labelContent
        )}
      </label>
      {errorMessage && (
        <div className={bem + '__error'} id={errorId}>
          {errorMessage}
        </div>
      )}
    </Wrapper>
  );
};

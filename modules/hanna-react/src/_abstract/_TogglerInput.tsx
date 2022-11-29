import React from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import { BemPropsModifier } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type TogglerInputProps = {
  label: string | JSX.Element;
  children?: never;
  Wrapper?: 'div' | 'li';
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
} & BemPropsModifier &
  Omit<JSX.IntrinsicElements['input'], 'type'>;

type _TogglerInputProps = {
  bem: string;
  type: 'radio' | 'checkbox';
};

const TogglerInput = (props: TogglerInputProps & _TogglerInputProps) => {
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
    ...inputProps
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

  return (
    <Wrapper className={getBemClass(bem, modifier, className)}>
      <input
        className={bem + '__input'}
        type={type}
        id={domid}
        aria-invalid={invalid || !!errorMessage || undefined}
        aria-describedby={errorId}
        {...inputProps}
      />{' '}
      <label className={bem + '__label'} htmlFor={domid}>
        {' '}
        {reqStar} {label}{' '}
      </label>
      {errorMessage && (
        <div className={bem + '__error'} id={errorId}>
          {errorMessage}
        </div>
      )}
    </Wrapper>
  );
};
export default TogglerInput;

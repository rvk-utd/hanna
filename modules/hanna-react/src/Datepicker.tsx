import React, { MutableRefObject, RefObject } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
// For more info on localization see: https://stackoverflow.com/questions/54399084/change-locale-in-react-datepicker/58306958#58306958
import is from 'date-fns/locale/is/index.js';
import pl from 'date-fns/locale/pl/index.js';

import {
  ReactDatePicker,
  registerLocale,
} from './_mixed_export_resolution_/ReactDatepicker.js'; // Docs: https://reactdatepicker.com/
import { FormField, FormFieldWrappingProps } from './FormField.js';

registerLocale('is', is);
registerLocale('pl', pl);
// NOTE: `setDefaultLocale` might be needed for the i18n to actually function...
// setDefaultLocale('is');

export type DatepickerProps = {
  small?: boolean;
  placeholder?: string;
  value?: Date;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  localeCode?: 'is' | 'en' | 'pl'; // default 'is', we can add more langs later...
  dateFormat?: string | Array<string>;
  isStartDate?: boolean;
  isEndDate?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  onChange: (date?: Date) => void;
  datepickerExtraProps?: Record<string, unknown>;

  /** @deprecated  use value instead.  (Will be removed in v0.11) */
  initialDate?: Date;
} & FormFieldWrappingProps;

/**
 * Dumb utility function that returns a new Date that's `dayOffset` days away
 * from the input `date`.
 */
export const getDateDiff = (refDate: Date, dayOffset: number): Date => {
  const newDate = new Date(refDate);
  newDate.setDate(newDate.getDate() + dayOffset);
  return newDate;
};

export type DatepickerLocaleProps = {
  nextMonthAriaLabel: string;
  nextMonthButtonLabel: string;
  nextYearAriaLabel: string;
  nextYearButtonLabel: string;
  previousMonthAriaLabel: string;
  previousMonthButtonLabel: string;
  previousYearAriaLabel: string;
  previousYearButtonLabel: string;
  timeInputLabel: string;
  weekAriaLabelPrefix: string;
  weekLabel: string;
  ariaLabelPrefix: string;
  chooseDayAriaLabelPrefix: string;
  disabledDayAriaLabelPrefix: string;
};

const i18n: Record<string, DatepickerLocaleProps> = {
  is: {
    nextMonthAriaLabel: 'Næsti mánuður',
    nextMonthButtonLabel: 'Næsti mánuður',
    nextYearAriaLabel: 'Næsta ár',
    nextYearButtonLabel: 'Næsta ár',
    previousMonthAriaLabel: 'Fyrri mánuður',
    previousMonthButtonLabel: 'Fyrri mánuður',
    previousYearAriaLabel: 'Fyrra ár',
    previousYearButtonLabel: 'Fyrra ár',
    timeInputLabel: 'Tími: ',
    weekAriaLabelPrefix: 'Vika: ',
    weekLabel: 'Vika',
    ariaLabelPrefix: 'Mánuður:',
    chooseDayAriaLabelPrefix: 'Veldu:',
    disabledDayAriaLabelPrefix: 'Dagsetning ekki í boði',
  },
  pl: {
    nextMonthAriaLabel: 'Następny miesiącu',
    nextMonthButtonLabel: 'Następny miesiącu',
    nextYearAriaLabel: 'Następny rok',
    nextYearButtonLabel: 'Następny rok',
    previousMonthAriaLabel: 'Poprzedni miesiac',
    previousMonthButtonLabel: 'Poprzedni miesiac',
    previousYearAriaLabel: 'Poprzedni rok',
    previousYearButtonLabel: 'Poprzedni rok',
    timeInputLabel: 'Czas: ',
    weekAriaLabelPrefix: 'Tydzień: ',
    weekLabel: 'Tydzień',
    ariaLabelPrefix: 'Miesiąc:',
    chooseDayAriaLabelPrefix: 'Wybierać:',
    disabledDayAriaLabelPrefix: 'Data niedostępna',
  },
};

export const Datepicker = (props: DatepickerProps) => {
  const {
    className,
    id,
    label,
    hideLabel,
    assistText,
    disabled,
    readOnly,
    invalid,
    errorMessage,
    required,
    reqText,
    placeholder,
    small,

    localeCode = 'is',
    dateFormat = 'd.M.yyyy',
    initialDate,
    value = initialDate,
    name,
    startDate,
    endDate,
    minDate,
    maxDate,
    isStartDate = false,
    isEndDate = false,
    onChange,
    datepickerExtraProps,
    ssr,
    inputRef,
  } = props;

  const domid = useDomid(id);

  const txts = i18n[localeCode] || {};

  const filled = !!value;
  const empty = !filled && !placeholder;

  return (
    <FormField
      className={getBemClass('Datepicker', [], className)}
      ssr={ssr}
      label={label}
      small={small}
      assistText={assistText}
      hideLabel={hideLabel}
      invalid={invalid}
      required={required}
      reqText={reqText}
      disabled={disabled}
      readOnly={readOnly}
      filled={filled}
      empty={empty}
      errorMessage={errorMessage}
      renderInput={(className, inputProps, addFocusProps) => {
        return (
          <div
            className={className.input}
            onClick={({ target, currentTarget }) =>
              target === currentTarget && currentTarget.querySelector('input')?.focus()
            }
            ref={
              inputRef &&
              ((elm) => {
                (inputRef as MutableRefObject<HTMLInputElement | undefined>).current =
                  elm?.querySelector('input') || undefined;
                return elm;
              })
            }
            {...addFocusProps()}
          >
            <ReactDatePicker
              id={domid}
              required={inputProps.required}
              disabled={inputProps.disabled}
              readOnly={inputProps.readOnly}
              selected={value}
              name={name}
              locale={localeCode}
              dateFormat={
                // NOTE: Force all dateFormat values into Array<string> to temporarily work around
                // a bug in the current version of react-datepicker where invalid **string** values
                // are re-parsed with `new Date()`, causing surprising (weird) false positives
                // AND where Arrayed formats get parsed in order of "increasing priority".
                //
                // TODO: Revert back to the plain `dateFormat={dateFormat}` pass-through once
                // https://github.com/Hacker0x01/react-datepicker/pull/3988 has been accepted and released.
                typeof dateFormat === 'string'
                  ? [dateFormat]
                  : dateFormat.slice(0).reverse()
                // dateFormat
              }
              onChange={(date: Date | null) => {
                onChange(date || undefined);
                const inputElm = inputRef?.current;
                if (inputElm) {
                  inputElm.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }}
              placeholderText={placeholder}
              // TODO: Implement this
              // selectsRange
              minDate={minDate}
              maxDate={maxDate}
              startDate={startDate}
              endDate={endDate}
              selectsStart={isStartDate}
              selectsEnd={isEndDate}
              formatWeekDay={(weekday) => weekday.charAt(0).toUpperCase()}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
              showMonthDropdown
              {...inputProps}
              {...txts}
              {...datepickerExtraProps}
            />
          </div>
        );
      }}
    />
  );
};

export default Datepicker;

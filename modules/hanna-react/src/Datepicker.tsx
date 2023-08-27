import React, { MutableRefObject, RefObject } from 'react';
import { useDomid } from '@hugsmidjan/react/hooks';
// For more info on localization see: https://stackoverflow.com/questions/54399084/change-locale-in-react-datepicker/58306958#58306958
import is from 'date-fns/locale/is/index.js';
import pl from 'date-fns/locale/pl/index.js';

import {
  ReactDatePicker,
  registerLocale,
} from './_mixed_export_resolution_/ReactDatepicker.js'; // Docs: https://reactdatepicker.com/
import {
  FormField,
  FormFieldWrappingProps,
  groupFormFieldWrapperProps,
} from './FormField.js';
import { useMixedControlState } from './utils.js';

registerLocale('is', is);
registerLocale('pl', pl);
// NOTE: `setDefaultLocale` might be needed for the i18n to actually function...
// setDefaultLocale('is');

export type DatepickerProps = {
  small?: boolean;
  placeholder?: string;
  value?: Date;
  /**
   * Default value for "uncontrolled" mode.
   *
   * NOTE: Even though defaultValue and the `onChange` value are both `Date`
   * the `<input/>` element is still `type="text"` and it's `.value` is
   * the human-readable (parsed) date `string`.
   *
   * Use this incombination with the `isoMode` prop to submit ISO-8601
   * formatted input values
   */
  defaultValue?: Date;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  /**
   * Turn this on to generate a form <input/> that contains (and submits)
   * an ISO-date formatted string value, instead of the default "human
   * readable" format.
   *
   * NOTE: This will be the default mode in v0.11.
   */
  isoMode?: boolean;
  localeCode?: 'is' | 'en' | 'pl'; // default 'is', we can add more langs later...
  dateFormat?: string | Array<string>;
  isStartDate?: boolean;
  isEndDate?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: (date?: Date) => void;
  datepickerExtraProps?: Record<string, unknown>;

  /** @deprecated  Use `value` or `defaultValue` instead.  (Will be removed in v0.11) */
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

/**
 * A compo
 *
 * Internally, this component uses the [`react-datepicker`](https://reactdatepicker.com/) component.
 */
export const Datepicker = (props: DatepickerProps) => {
  const {
    placeholder,

    localeCode = 'is',
    dateFormat = 'd.M.yyyy',
    name,
    startDate,
    endDate,
    minDate,
    maxDate,
    isStartDate = false,
    isEndDate = false,
    onChange,
    datepickerExtraProps,
    inputRef,
    isoMode,

    fieldWrapperProps,
  } = groupFormFieldWrapperProps(props);

  const [value, setValue] = useMixedControlState.raw(
    props.value || props.initialDate, // eslint-disable-line deprecation/deprecation
    props.defaultValue,
    'value'
  );
  /*
    TODO: Revert to this simpler pattern once we hit v0.11
    and `props.initialDate` is removed:
  */
  // const [value, setValue] = useMixedControlState(props, 'value');

  const domid = useDomid(props.id);

  const txts = i18n[localeCode] || {};

  const filled = !!value;
  const empty = !filled && !placeholder;

  return (
    <FormField
      extraClassName="Datepicker"
      filled={filled}
      empty={empty}
      {...fieldWrapperProps}
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
            {isoMode && (
              <input
                type="hidden"
                name={name}
                value={value?.toISOString().slice(0, 10)}
              />
            )}
            <ReactDatePicker
              id={domid}
              required={inputProps.required}
              disabled={inputProps.disabled}
              readOnly={inputProps.readOnly}
              selected={value}
              name={isoMode ? undefined : name}
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
              onChange={(date: Date | undefined | null) => {
                date = date || undefined;
                setValue(date);
                onChange && onChange(date);
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

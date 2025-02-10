import React, { MutableRefObject, RefObject, useMemo } from 'react';
import { Expect, Extends } from '@reykjavik/hanna-utils';
import {
  DEFAULT_LANG,
  DefaultTexts,
  getTexts,
  HannaLang,
} from '@reykjavik/hanna-utils/i18n';
// For more info on localization see: https://stackoverflow.com/questions/54399084/change-locale-in-react-datepicker/58306958#58306958
import is from 'date-fns/locale/is/index.js';
import pl from 'date-fns/locale/pl/index.js';

import {
  ReactDatePicker,
  type ReactDatePickerProps,
  registerLocale,
} from './_mixed_export_resolution_/ReactDatepicker.js'; // Docs: https://reactdatepicker.com/
import { useDomid } from './utils/useDomid.js';
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
  texts?: DatepickerLocaleProps;
  lang?: HannaLang;
  dateFormat?: string | Array<string>;
  isStartDate?: boolean;
  isEndDate?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: (date?: Date) => void;
  datepickerExtraProps?: Record<string, unknown>;

  /** @deprecated Use `lang` instead  (Will be removed in v0.11) */
  localeCode?: HannaLang;
  /** @deprecated Use `value` or `defaultValue` instead.  (Will be removed in v0.11) */
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
  ariaLabelClose: string;
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
  monthAriaLabelPrefix: string;
  weekLabel: string;
  chooseDayAriaLabelPrefix: string;
  disabledDayAriaLabelPrefix: string;
  dateFormats: Array<string>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Test_LocalePropsTypeMatchesRDPProps = Expect<
  Extends<DatepickerLocaleProps, Partial<ReactDatePickerProps>>
>;

const defaultDatepickerTexts: DefaultTexts<DatepickerLocaleProps> = {
  is: {
    ariaLabelClose: 'Loka',
    nextMonthAriaLabel: 'Næsti mánuður',
    nextMonthButtonLabel: 'Næsti mánuður',
    nextYearAriaLabel: 'Næsta ár',
    nextYearButtonLabel: 'Næsta ár',
    previousMonthAriaLabel: 'Fyrri mánuður',
    previousMonthButtonLabel: 'Fyrri mánuður',
    previousYearAriaLabel: 'Fyrra ár',
    previousYearButtonLabel: 'Fyrra ár',
    timeInputLabel: 'Tími:',
    weekAriaLabelPrefix: 'Vika:',
    weekLabel: 'Vika',
    monthAriaLabelPrefix: 'Mánuður:',
    chooseDayAriaLabelPrefix: 'Veldu:',
    disabledDayAriaLabelPrefix: 'Ekki í boði:',
    dateFormats: [
      'dd.MM.yyyy',
      'dd.MM.yy',
      'dd/MM/yyyy',
      'dd/MM/yy',
      'dd. MM. yyyy',
      'dd. MM. yy',
      'dd MM yyyy',
      'dd MM yy',
    ],
  },
  // React-datepicker has its own (default) English translation built in.
  // No need to repeat all of it here.
  en: {
    // ariaLabelClose: 'Close',
    // nextMonthAriaLabel: 'Next month',
    // nextMonthButtonLabel: 'Next month',
    // nextYearAriaLabel: 'Next year',
    // nextYearButtonLabel: 'Next year',
    // previousMonthAriaLabel: 'Previous month',
    // previousMonthButtonLabel: 'Previous month',
    // previousYearAriaLabel: 'Previous year',
    // previousYearButtonLabel: 'Previous year',
    // timeInputLabel: 'Time:',
    // weekAriaLabelPrefix: 'Week:',
    // weekLabel: 'Week',
    monthAriaLabelPrefix: 'Month:',
    chooseDayAriaLabelPrefix: 'Choose:',
    disabledDayAriaLabelPrefix: 'Not available:',
    dateFormats: [
      'MM.dd.yyyy',
      'MM.dd.yy',
      'MM/dd/yyyy',
      'MM/dd/yy',
      'MM. dd. yyyy',
      'MM. dd. yy',
      'MM dd yyyy',
      'MM dd yy',
    ],
  } as DatepickerLocaleProps,
  pl: {
    ariaLabelClose: 'Zamknij',
    nextMonthAriaLabel: 'Następny miesiącu',
    nextMonthButtonLabel: 'Następny miesiącu',
    nextYearAriaLabel: 'Następny rok',
    nextYearButtonLabel: 'Następny rok',
    previousMonthAriaLabel: 'Poprzedni miesiac',
    previousMonthButtonLabel: 'Poprzedni miesiac',
    previousYearAriaLabel: 'Poprzedni rok',
    previousYearButtonLabel: 'Poprzedni rok',
    timeInputLabel: 'Czas:',
    weekAriaLabelPrefix: 'Tydzień:',
    weekLabel: 'Tydzień',
    monthAriaLabelPrefix: 'Miesiąc:',
    chooseDayAriaLabelPrefix: 'Wybierać:',
    disabledDayAriaLabelPrefix: 'Niedostępna:',
    dateFormats: [
      'dd.MM.yyyy',
      'dd.MM.yy',
      'dd/MM/yyyy',
      'dd/MM/yy',
      'dd. MM. yyyy',
      'dd. MM. yy',
      'dd MM yyyy',
      'dd MM yy',
    ],
  },
};

const toLocalIsoDate = (date: Date | undefined): string => {
  if (!date) {
    return '';
  }
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split('T')[0]!;
};

/**
 * A compo
 *
 * Internally, this component uses the [`react-datepicker`](https://reactdatepicker.com/) component.
 */
export const Datepicker = (props: DatepickerProps) => {
  const {
    placeholder,

    dateFormat,
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
    texts,
    lang = props.localeCode, // eslint-disable-line deprecation/deprecation

    fieldWrapperProps,
  } = groupFormFieldWrapperProps(props);

  // Make sure all minDates are at the start of the day
  const minDateNormalized = minDate ? new Date(minDate.setHours(0, 0, 0, 0)) : undefined;

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

  const txts = getTexts({ texts, lang }, defaultDatepickerTexts);

  const filled = !!value;
  const empty = !filled && !placeholder;

  const normalizedDateFormats = useMemo(() => {
    const dateFormatProp = !dateFormat
      ? ['d.M.yyyy']
      : typeof dateFormat === 'string'
      ? [dateFormat]
      : dateFormat.slice(0);
    // NOTE: Force all dateFormat values into Array<string> to temporarily work around
    // a bug in the current version of react-datepicker where invalid `string` values
    // are re-parsed with `new Date()`, causing surprising (weird) false positives
    // AND where Arrayed formats get parsed in order of "increasing priority".
    //
    // TODO: Revert back to the plain `dateFormat={dateFormat}` pass-through once
    // https://github.com/Hacker0x01/react-datepicker/pull/3988 has been accepted and released.
    return dateFormatProp
      .concat(['yyyy-MM-dd'])
      .concat(txts.dateFormats)
      .concat(['P', 'PP', 'PPP']);
  }, [dateFormat, txts]);

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
            {isoMode && <input type="hidden" name={name} value={toLocalIsoDate(value)} />}
            <ReactDatePicker
              required={inputProps.required}
              disabled={inputProps.disabled}
              readOnly={inputProps.readOnly}
              selected={value}
              name={isoMode ? undefined : name}
              locale={lang || DEFAULT_LANG}
              dateFormat={normalizedDateFormats}
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
              minDate={minDateNormalized}
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

import React, { useState } from 'react';
import { Datepicker, getDateDiff } from '@reykjavik/hanna-react/Datepicker';
import { Meta, StoryObj } from '@storybook/react';

import { FFControlProps, formFieldControls } from '../utils/knobs.js';

const localeOptions = ['is', 'en', 'pl'] as const;

type ControlProps = FFControlProps & {
  isDateRange: boolean;
  locale: (typeof localeOptions)[number];
  maxDaysBack: number;
  minNights: number;
};

const ffCtrl = formFieldControls();

// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Forms/Datepicker',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const dateFormat = 'd. MMM yyyy';
const placeholder = dateFormat.toLowerCase();
const DAY_MS = 24 * 60 * 60 * 1000;
const initialStartDate = new Date(Date.now() + DAY_MS);

const DatepickerStory = (props: ControlProps) => {
  const isRange = props.isDateRange;
  const locale = props.locale;

  const ffProps = ffCtrl.getProps(props);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <>
      <Datepicker
        {...ffProps}
        label={locale === 'is' ? 'Veldu dagsetningu' : 'Choose date'}
        placeholder={placeholder}
        localeCode={locale}
        value={startDate}
        minDate={getDateDiff(initialStartDate, isRange ? 0 : props.maxDaysBack)}
        maxDate={isRange ? endDate : undefined}
        isStartDate={isRange}
        startDate={isRange ? startDate : undefined}
        endDate={isRange ? endDate : undefined}
        onChange={(date?: Date) => setStartDate(date)}
        dateFormat={dateFormat}
        datepickerExtraProps={{}}
      />
      {isRange && (
        <Datepicker
          {...ffProps}
          label={locale === 'is' ? 'Veldu loka dagsetningu' : 'Choose end date'}
          placeholder={placeholder}
          readOnly={!startDate}
          localeCode={locale}
          value={endDate}
          minDate={startDate && getDateDiff(startDate, props.minNights)}
          // maxDate
          isEndDate={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(date?: Date) => setEndDate(date)}
          dateFormat={dateFormat}
          datepickerExtraProps={{}}
        />
      )}
    </>
  );
};

export const _Datepicker: StoryObj<ControlProps> = {
  render: (args) => <DatepickerStory {...args} />,
  argTypes: {
    ...ffCtrl.argTypes,

    isDateRange: { name: 'Is date range' },
    locale: {
      name: 'Language',
      options: localeOptions,
      control: {
        type: 'inline-radio',
        labels: {
          is: 'Íslenska',
          en: 'English',
          pl: 'Polski',
        } satisfies Record<ControlProps['locale'], string>,
      },
    },
    maxDaysBack: {
      name: 'Max days back',
      control: { type: 'number', min: 0, step: 1 },
      if: { arg: 'isDateRange', eq: false },
    },
    minNights: {
      name: 'Minimum nights',
      control: { type: 'number', min: 1, step: 1 },
      if: { arg: 'isDateRange', eq: true },
    },
  },
  args: {
    ...ffCtrl.args,
    locale: 'is',
    isDateRange: false,
    minNights: 1,
    maxDaysBack: -14,
  },
};

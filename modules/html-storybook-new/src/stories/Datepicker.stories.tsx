import React, { useState } from 'react';
import { Datepicker, getDateDiff } from '@reykjavik/hanna-react/Datepicker';
import { boolean, number, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobs } from '../utils/knobs.js';

const requiredOptions = ['no', 'yes', 'yes-but-subtle'] as const;
type Required = (typeof requiredOptions)[number];

const languageOptions = ['icelandic', 'english'] as const;
type Language = (typeof languageOptions)[number];

type DatepickerControlProps = {
  small: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
  isDateRange: boolean;
  language: Language;
  maxDaysBack: number;
  minimumNights: number;
};

type Story = StoryObj<DatepickerControlProps>;

const meta: Meta = {
  title: 'Forms/Datepicker',
};
export default meta;

const dateFormat = 'd. MMM yyyy';
const placeholder = dateFormat.toLowerCase();

const DatepickerStory: React.FC<DatepickerControlProps> = () => {
  const ffProps = getFormFieldKnobs();

  const isRange = boolean('Is date range', false);

  const locale = optionsKnob('Language', { Icelandic: 'is', English: 'en' }, 'is', {
    display: 'inline-radio',
  });

  const initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() + 1);

  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 7);

  const nightsBack = number('Max days back', -14);
  const minNights = number('Minimum nights', 1);

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
        minDate={getDateDiff(initialStartDate, nightsBack)}
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
          minDate={startDate && getDateDiff(startDate, minNights)}
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

export const _Datepicker: Story = {
  render: (args: DatepickerControlProps) => <DatepickerStory {...args} />,
  argTypes: {
    small: {
      control: 'boolean',
      name: 'Small',
    },
    disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
    readOnly: {
      control: 'boolean',
      name: 'Read-only',
    },
    required: {
      control: {
        type: 'inline-radio',
        labels: {
          no: 'No',
          yes: 'Yes',
          'yes-but-subtle': 'Yes but subtle',
        },
      },
      options: requiredOptions,
      name: 'Required',
    },
    invalid: {
      control: 'boolean',
      name: 'Invalid',
    },
    errorMessage: {
      control: 'boolean',
      name: 'Error message',
    },
    helpText: {
      control: 'boolean',
      name: 'Help text',
    },
    isDateRange: {
      control: 'boolean',
      name: 'Is date range',
    },
    language: {
      control: {
        type: 'inline-radio',
        labels: {
          icelandic: 'Icelandic',
          english: 'English',
        },
      },
      options: languageOptions,
      name: 'Required',
    },
    maxDaysBack: {
      control: 'number',
      name: 'Max days back',
    },
    minimumNights: {
      control: 'number',
      name: 'Minimum nights',
    },
  },
  args: {
    small: false,
    disabled: false,
    readOnly: false,
    required: 'no',
    invalid: false,
    errorMessage: false,
    helpText: false,
    isDateRange: false,
    language: 'icelandic',
    maxDaysBack: -14,
    minimumNights: 1,
  },
};

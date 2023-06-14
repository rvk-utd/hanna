import React, { useState } from 'react';
import { Datepicker, getDateDiff } from '@reykjavik/hanna-react/Datepicker';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobsNew } from '../utils/knobs.js';
import { StoryParameters } from '../utils/storytypes.js';

const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

const languageOptions = ['is', 'en'] as const;
type Language = (typeof languageOptions)[number];

type ControlProps = {
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

type Story = StoryObj<ControlProps>;

const meta: Meta = {
  title: 'Forms/Datepicker',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

const dateFormat = 'd. MMM yyyy';
const placeholder = dateFormat.toLowerCase();

const DatepickerStory: React.FC<ControlProps> = ({
  small,
  disabled,
  readOnly,
  required,
  invalid,
  errorMessage,
  helpText,
  isDateRange,
  language,
  maxDaysBack,
  minimumNights,
}) => {
  // const ffProps = getFormFieldKnobs();

  const ffProps = getFormFieldKnobsNew({
    small,
    disabled,
    readOnly,
    required,
    invalid,
    errorMessage,
    helpText,
  });

  const isRange = isDateRange;

  const locale = language;

  const initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() + 1);

  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 7);

  const nightsBack = maxDaysBack;
  const minNights = minimumNights;

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
  render: (args: ControlProps) => <DatepickerStory {...args} />,
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
          is: 'Icelandic',
          en: 'English',
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
    language: 'is',
    maxDaysBack: -14,
    minimumNights: 1,
  },
};

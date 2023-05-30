import React, { useState } from 'react';
import { Datepicker, getDateDiff } from '@reykjavik/hanna-react/Datepicker';
import { boolean, number, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobs } from '../utils/knobs.js';

const meta: Meta = {
  title: 'Forms/Datepicker',
};
export default meta;

type Story = StoryObj;

const dateFormat = 'd. MMM yyyy';
const placeholder = dateFormat.toLowerCase();

const DatepickerStory = () => {
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
  render: () => <DatepickerStory />,
};

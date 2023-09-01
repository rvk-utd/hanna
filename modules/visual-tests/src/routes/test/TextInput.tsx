import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { TextInput, TextInputProps } from '@reykjavik/hanna-react/TextInput';
import { notFalsy } from '@reykjavik/hanna-utils';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import { focusAllFormFields } from '../../test-helpers/focusAllFormFields.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

type PartialProps = Array<Partial<TextInputProps> & { id: string; label: string }>;

const sizes: PartialProps = [
  { id: '', label: '' },
  { id: 'small', label: 'Small ', small: true },
];

const contents: PartialProps = [
  { id: '', label: '', value: 'Some value' },
  {
    id: 'placeholder',
    label: ' (placeholder)',
    placeholder: 'Placeholder text',
  },
  { id: 'empty', label: ' (empty)' },
  { id: 'nolabel', label: ' (no-label)', hideLabel: true, value: 'Some value' },
];

const baseStates: PartialProps = [
  { id: 'normal', label: 'Normal' },
  { id: 'required', label: 'Required', required: true, assistText: 'Assist text here' },
  { id: 'invalid', label: 'Error', invalid: true, errorMessage: 'Error message here' },
  { id: 'textarea', type: 'textarea', label: 'Textarea' },
  { id: 'disabled', label: 'Disabled', disabled: true },
  { id: 'readonly', label: 'Readonly', readOnly: true },
];

const textinputs: Array<TextInputProps | 'split'> = [];

sizes.forEach((size, i) => {
  baseStates.forEach((baseState, i) => {
    if (i > 0) {
      textinputs.push('split');
    }
    contents.forEach((content) => {
      const id = [size.id, baseState.id, content.id].filter(notFalsy).join('-');
      const label = size.label + baseState.label + content.label;
      textinputs.push({
        ...size,
        ...content,
        ...baseState,
        id,
        label,
      } as TextInputProps);
    });
  });
  if (i > 0) {
    textinputs.push('split');
  }
});

const overflowInputs: Array<TextInputProps> = [
  {
    id: 'talltextarea',
    label: 'Taller line-wrapping textarea',
    type: 'textarea',
    rows: 5,
    value: lorem.medium,
  },
  {
    id: 'overflow',
    label: 'Text overflow',
    value: lorem.medium,
  },
  {
    id: 'overflow-small',
    label: 'Text overflow Small',
    small: true,
    value: lorem.medium,
  },
];

// ---------------------------------------------------------------------------

const render = (inputs: Array<TextInputProps | 'split'>) =>
  inputs.map((props, i) =>
    props === 'split' ? <DummyBlock thin key={i} /> : <TextInput key={i} {...props} />
  );

// ---------------------------------------------------------------------------

export default function () {
  return (
    <Minimal>
      {render(textinputs)}
      {render(overflowInputs)}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, pageScreenshot, mediaFormat }) => {
    if (mediaFormat('wide') || mediaFormat('phone')) {
      const inputsToHover = [
        { id: 'normal', name: 'normal' },
        { id: 'normal-placeholder', name: 'normalPlaceholder' },
        { id: 'normal-empty', name: 'normalEmpty' },
        { id: 'invalid', name: 'invalid' },
        { id: 'textarea', name: 'textarea' },
        { id: 'disabled', name: 'disabled' },
        { id: 'readonly', name: 'readonly' },
        { id: 'small-normal', name: 'smallNormal' },
        { id: 'small-normal-placeholder', name: 'smallNormalPlaceholder' },
        { id: 'small-normal-empty', name: 'smallNormalEmpty' },
        { id: 'small-invalid', name: 'smallInvalid' },
      ];

      /* eslint-disable no-await-in-loop */
      for (const { id, name } of inputsToHover) {
        const input = page.locator(`#${id}`);
        const formfield = input.locator('closest=.FormField');

        await input.hover({ force: true });
        await localScreenshot(formfield, `${name}-hover`, { margin: 10 });
      }
      /* eslint-enable no-await-in-loop */
    }

    await focusAllFormFields(page);
    await pageScreenshot('allFocused');
  },
};

import { boolean, optionsKnob } from '@storybook/addon-knobs';

export const useLink = (defaultLink?: boolean) =>
  optionsKnob(
    'HTML Element',
    { '<button/>': '', '<a href="" />': 'true' },
    defaultLink ? 'true' : '',
    { display: 'inline-radio' }
  )
    ? '/some-url'
    : undefined;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getFormFieldKnobs = (
  opts: {
    hideLabel?: boolean;
    small?: false;
    readOnly?: false;
  } = {}
) => {
  const hideLabel =
    opts.hideLabel != null ? boolean('Hide <label/>', opts.hideLabel) : undefined;
  const small = opts.small !== false ? boolean('Small', false) : undefined;
  const disabled = boolean('Disabled', false);
  const readOnly = opts.readOnly !== false ? boolean('Read-only', false) : undefined;
  const required = optionsKnob(
    'Required',
    { No: '', Yes: 'normal', 'Yes but subtle': 'subtle' },
    '',
    { display: 'inline-radio' }
  );
  const invalid = boolean('Invalid', false);
  const errorMessage = boolean('Error message', false)
    ? 'Your input has the errors.'
    : undefined;
  const assistText = boolean('Help text', false)
    ? 'Close your eyes and input the first thing that comes to mind.'
    : undefined;

  return {
    hideLabel,
    small,
    disabled,
    readOnly,
    required: Boolean(required),
    reqText: required !== 'subtle' && undefined,
    invalid,
    errorMessage,
    assistText,
  };
};

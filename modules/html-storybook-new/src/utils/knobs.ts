import { boolean, optionsKnob } from '@storybook/addon-knobs';

// TODO: Remove. Only used in Tabs
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

  const gaur = Boolean(required);

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

// ----------------------------- TODO: Refactor later -------------------

const requiredOptions = ['no', 'yes', 'yes-but-subtle'] as const;
type Required = (typeof requiredOptions)[number];

type FormfieldsControlProps = {
  small: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
  hideLabel?: boolean;
};

const getFormFieldKnobsNew = (args: FormfieldsControlProps) => {
  const {
    hideLabel,
    small,
    disabled,
    readOnly,
    required,
    invalid,
    errorMessage,
    helpText,
  } = args;
  const _hideLabel = hideLabel != null ? hideLabel : undefined;
  const _small = small !== false ? small : undefined;
  const _disabled = disabled;
  const _readOnly = readOnly !== false ? readOnly : undefined;

  const requiredMapper: Record<Required, '' | 'normal' | 'subtle'> = {
    no: '',
    yes: 'normal',
    'yes-but-subtle': 'subtle',
  };
  const _required = requiredMapper[required];

  const _errorMessage = errorMessage ? 'Your input has the errors.' : undefined;

  const assistText = helpText
    ? 'Close your eyes and input the first thing that comes to mind.'
    : undefined;

  return {
    _hideLabel,
    _small,
    _disabled,
    _readOnly,
    required: Boolean(_required),
    reqText: _required !== 'subtle' && undefined,
    invalid,
    _errorMessage,
    assistText,
  };
};

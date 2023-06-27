const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

type FormFieldKnobsProps = {
  small?: boolean;
  disabled: boolean;
  readOnly?: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
  hideLabel?: boolean;
};

export const getFormFieldKnobs = (args: FormFieldKnobsProps) => {
  const {
    small,
    disabled,
    readOnly,
    required,
    invalid,
    errorMessage,
    helpText,
    hideLabel,
  } = args;
  const _hideLabel = hideLabel != null ? hideLabel : undefined;
  const _small = small ? small : undefined;
  const _disabled = disabled;
  const _readOnly = readOnly !== false ? readOnly : undefined;

  const requiredMap: Record<Required, '' | 'normal' | 'subtle'> = {
    no: '',
    yes: 'normal',
    subtle: 'subtle',
  };
  const _required = requiredMap[required];

  const _errorMessage = errorMessage ? 'Your input has the errors.' : undefined;

  const assistText = helpText
    ? 'Close your eyes and input the first thing that comes to mind.'
    : undefined;

  return {
    hideLabel: _hideLabel,
    small: _small,
    disabled: _disabled,
    readOnly: _readOnly,
    required: Boolean(_required),
    reqText: _required !== 'subtle' && undefined,
    invalid,
    errorMessage: _errorMessage,
    assistText,
  };
};

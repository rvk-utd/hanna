const requiredOptions = ['', 'normal', 'subtle'] as const;

export type FFControlProps = {
  hideLabel?: boolean;
  small?: boolean;
  disabled: boolean;
  readOnly?: boolean;
  required: (typeof requiredOptions)[number];
  invalid: boolean;
  errorMessage: boolean;
  assistText: boolean;
};

type FFControlsOpts = {
  hideLabel?: boolean;
  small?: false;
  readOnly?: false;
};

export const formFieldControls = (opts: FFControlsOpts = {}) => {
  const hasHideLabel = opts.hideLabel != null;
  const hasSmall = opts.small !== false;
  const hasReadOnly = opts.readOnly !== false;

  return {
    getProps: (args: FFControlProps) => ({
      hideLabel: args.hideLabel,
      small: args.small,
      disabled: args.disabled,
      readOnly: args.readOnly,
      required: !!args.required,
      reqText: args.required !== 'subtle' && undefined,
      invalid: args.invalid,
      errorMessage: args.errorMessage ? 'Your input has the errors.' : undefined,
      assistText: args.assistText
        ? 'Close your eyes and input the first thing that comes to mind.'
        : undefined,
    }),

    argTypes: {
      ...(hasHideLabel && { hideLabel: { title: 'Hide <label/>' } }),
      ...(hasSmall && { small: { title: 'Small' } }),
      disabled: { title: 'Disabled' },
      ...(hasReadOnly && { readOnly: { title: 'Read-only' } }),
      required: {
        title: 'Required',
        control: {
          type: 'inline-radio',
          labels: {
            '': 'No',
            normal: 'Yes',
            subtle: 'Yes but subtle',
          } satisfies Record<FFControlProps['required'], string>,
        },
        options: ['', 'normal', 'subtle'],
      },
      invalid: { title: 'Invalid' },
      errorMessage: { title: 'Error message' },
      assistText: { title: 'Help text' },
    },

    args: {
      ...(hasHideLabel && { hideLabel: opts.hideLabel }),
      ...(hasSmall && { small: false }),
      disabled: false,
      ...(hasReadOnly && { readOnly: false }),
      required: '',
      invalid: false,
      errorMessage: false,
      assistText: false,
    } satisfies FFControlProps as FFControlProps,
  };
};

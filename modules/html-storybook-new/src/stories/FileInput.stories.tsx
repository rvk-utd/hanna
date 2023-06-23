import React, { useState } from 'react';
import { FileInput } from '@reykjavik/hanna-react/FileInput';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobs } from '../utils/knobs.js';
import { StoryParameters } from '../utils/storytypes.js';

const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

type ControlProps = {
  hideLabel: boolean;
  disabled: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
  showFileSize: boolean;
  showImagePreviews: boolean;
  allowMultipleFiles: boolean;
  allowedFileTypes: string;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Forms/FileInput',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

const FileInputStory: React.FC<ControlProps> = ({
  hideLabel,
  disabled,
  required,
  invalid,
  errorMessage,
  helpText,
  showFileSize,
  showImagePreviews,
  allowMultipleFiles,
  allowedFileTypes,
}) => {
  const ffProps = getFormFieldKnobs({
    disabled,
    required,
    invalid,
    errorMessage,
    helpText,
    hideLabel,
  });

  const [files, setFiles] = useState<Array<File>>([]);
  return (
    <FileInput
      {...ffProps}
      label="Skrá skjöl"
      removeFileText="Fjarlægja skjal"
      showFileSize={showFileSize}
      showImagePreviews={showImagePreviews}
      name="files"
      value={files}
      onFilesUpdated={setFiles}
      multiple={allowMultipleFiles}
      accept={allowedFileTypes}
      dropzoneText={
        <>
          Dragðu gögn hingað eða <strong>bættu</strong> þeim við.
        </>
      }
    />
  );
};

export const _FileInput: Story = {
  render: (args: ControlProps) => <FileInputStory {...args} />,
  argTypes: {
    hideLabel: {
      control: 'boolean',
      name: 'Hide <label/>',
    },
    disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
    required: {
      control: {
        type: 'inline-radio',
        labels: {
          no: 'No',
          yes: 'Yes',
          subtle: 'Yes but subtle',
        } satisfies Record<Required, string>,
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
    showFileSize: {
      control: 'boolean',
      name: 'Show file size',
    },
    showImagePreviews: {
      control: 'boolean',
      name: 'Show image previews',
    },
    allowMultipleFiles: {
      control: 'boolean',
      name: 'Allow multiple files',
    },
    allowedFileTypes: {
      control: 'text',
      name: 'Allowed file types',
    },
  },
  args: {
    hideLabel: true,
    disabled: false,
    required: 'no',
    invalid: false,
    errorMessage: false,
    helpText: false,
    showFileSize: false,
    showImagePreviews: false,
    allowMultipleFiles: true,
    allowedFileTypes: 'image/*',
  },
};

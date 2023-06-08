import React, { useState } from 'react';
import { FileInput } from '@reykjavik/hanna-react/FileInput';
import { boolean, text } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobs } from '../utils/knobs.js';

const requiredOptions = ['no', 'yes', 'yes-but-subtle'] as const;
type Required = (typeof requiredOptions)[number];

type FileInputControlProps = {
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

type Story = StoryObj<FileInputControlProps>;

const meta: Meta<FileInputControlProps> = {
  title: 'Forms/FileInput',
};
export default meta;

const FileInputStory: React.FC<FileInputControlProps> = () => {
  const ffProps = getFormFieldKnobs({ hideLabel: true, small: false, readOnly: false });

  const showFileSize = boolean('Show file size', false);
  const showImagePreview = boolean('Show image previews', false);

  const allowMultipleFiles = boolean('Allow multiple files', true);
  const allowedFileTypes = text('Allowed file types', 'image/*');

  const [files, setFiles] = useState<Array<File>>([]);
  return (
    <FileInput
      {...ffProps}
      label="Skrá skjöl"
      removeFileText="Fjarlægja skjal"
      showFileSize={showFileSize}
      showImagePreviews={showImagePreview}
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
  render: (args: FileInputControlProps) => <FileInputStory {...args} />,
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

import React, { useState } from 'react';
import { FileInput } from '@reykjavik/hanna-react/FileInput';
import { Meta, StoryObj } from '@storybook/react';

import { FFControlProps, formFieldControls } from '../utils/knobs.js';

type ControlProps = FFControlProps & {
  showFileSize: boolean;
  showImagePreviews: boolean;
  allowMultipleFiles: boolean;
  maxFiles: number | 'Unlimited';
  allowedFileTypes: string;
};

const ffCtrls = formFieldControls({ hideLabel: true, small: false, readOnly: false });

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Forms/FileInput',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const FileInputStory = (props: ControlProps) => {
  const {
    showFileSize,
    showImagePreviews,
    allowMultipleFiles,
    maxFiles,
    allowedFileTypes,
  } = props;
  const ffProps = ffCtrls.getProps(props);

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
      maxFiles={allowMultipleFiles && maxFiles !== 'Unlimited' ? maxFiles : undefined}
      accept={allowedFileTypes}
      dropzoneText={
        <>
          Dragðu gögn hingað eða <strong>bættu</strong> þeim við.
        </>
      }
    />
  );
};

export const _FileInput: StoryObj<ControlProps> = {
  render: (args) => <FileInputStory {...args} />,
  argTypes: {
    ...ffCtrls.argTypes,
    showFileSize: { name: 'Show file size' },
    showImagePreviews: { name: 'Show image previews' },
    allowMultipleFiles: { name: 'Allow multiple files' },
    maxFiles: {
      name: 'Max number of files',
      options: ['Unlimited', 1, 2, 3, 4, 5, 6],
      control: 'select',
      if: { arg: 'allowMultipleFiles' },
    },
    allowedFileTypes: {
      name: 'Allowed file types',
      control: 'text',
    },
  },
  args: {
    ...ffCtrls.args,
    showFileSize: false,
    showImagePreviews: false,
    allowMultipleFiles: true,
    maxFiles: 6,
    allowedFileTypes: 'image/*',
  },
};

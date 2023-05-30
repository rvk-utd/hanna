import React, { useState } from 'react';
import { FileInput } from '@reykjavik/hanna-react/FileInput';
import { boolean, text } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobs } from '../utils/knobs.js';

const meta: Meta<typeof FileInput> = {
  title: 'Forms/FileInput',
  component: FileInput,
};
export default meta;

type Story = StoryObj<typeof FileInput>;

const FileInputStory = () => {
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
  render: () => <FileInputStory />,
};

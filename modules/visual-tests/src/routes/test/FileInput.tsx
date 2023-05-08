import React, { Fragment, useState } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { FileInput } from '@reykjavik/hanna-react/FileInput';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

const previewUri =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `
    <svg width='375' height='271' viewBox='0 0 375 271' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0.330078 270.54H375V8.19995H0.330078V270.54Z' fill='white'/>
      <path d='M0.330078 270.54H375V159.78H0.330078V270.54Z' fill='#999'/>
      <path d='M0.330078 86.1899V210.43H71.5801H148.21H198.62H208.2L325.91 86.1899H0.330078Z' fill='black'/>
      <path d='M0 0V116H16.75H185.13H238.68H297.91L375 41.3963V0H0Z' fill='black'/>
    </svg>
    `.trim()
  );

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');
const dropzoneText = () => (
  <Fragment>
    Dragðu gögn hingað eða <strong>bættu</strong> þeim við.
  </Fragment>
);

export default function () {
  const fileWithPreview = new File([lorem.long], lorem.tiny + '.pdf');
  (fileWithPreview as any).preview = previewUri;

  const [files, setFiles] = useState<Array<File>>([
    new File([lorem.long], 'Short_filename.txt'),
    fileWithPreview,
    new File([lorem.long], 'Short_filename (final).pdf'),
  ]);
  return (
    <Minimal>
      <FileInput
        label="Normal"
        dropzoneText={dropzoneText()}
        onFilesUpdated={setFiles}
        showFileSize
      />
      <DummyBlock thin />
      <FileInput
        label="Files + Assist text"
        dropzoneText={dropzoneText()}
        value={files}
        onFilesUpdated={setFiles}
        showFileSize
        required
        showImagePreviews
        assistText="Close your eyes and input the first thing that comes to mind."
      />
      <DummyBlock thin />
      <FileInput
        label="Invalid"
        dropzoneText={dropzoneText()}
        removeFileText=""
        invalid
        errorMessage="Your input has errors"
      />
      <DummyBlock thin />
      <FileInput
        label="Disabled"
        dropzoneText={dropzoneText()}
        disabled
        assistText="This is an assist text."
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }

    const normal = page.locator('.FileInput:has(.FormField__label:text("Normal"))');
    const invalid = page.locator('.FileInput:has(.FormField__label:text("Invalid"))');
    const disabled = page.locator('.FileInput:has(.FormField__label:text("Disabled"))');
    const file = page.locator('.FileInput__file >> nth=0');

    await normal.locator('.FileInput__dropzone').hover();
    await localScreenshot(normal, 'hover');

    await invalid.locator('.FileInput__dropzone').hover();
    await localScreenshot(invalid, 'hover-invalid');

    await disabled.locator('.FileInput__dropzone').hover();
    await localScreenshot(disabled, 'hover-disabled');

    await file.locator('.FileInput__file-remove').hover();
    await localScreenshot(file, 'file-remove-hover');
  },
};

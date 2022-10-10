import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import FileInput from '@reykjavik/hanna-react/FileInput';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const props = (
  <Fragment>
    Dragðu gögn hingað eða <strong>bættu</strong> þeim við.
  </Fragment>
);
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <FileInput
        dropzoneText={props}
        removeFileText={''}
        label={'Label text'}
        assistText="Close your eyes and input the first thing that comes to mind."
      />
      <FileInput
        dropzoneText={props}
        removeFileText={''}
        label={'Invalid'}
        invalid
        errorMessage="Your input has errors"
      />
      <FileInput dropzoneText={props} removeFileText={''} label={'Disabled'} disabled />
    </Minimal>
  );
}

export const testing: TestingInfo = {};

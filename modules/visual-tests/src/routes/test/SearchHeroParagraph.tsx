import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { ContentImage } from '@reykjavik/hanna-react/ContentImage';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';
import { SiteSearchAutocomplete } from '@reykjavik/hanna-react/SiteSearchAutocomplete';
import { SiteSearchCurtain } from '@reykjavik/hanna-react/SiteSearchCurtain';

import { Minimal } from '../../layout/Minimal.js';
import { illustr } from '../../test-helpers/dummyData.js';
import type { TestingInfo, TestPageHandle } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle: TestPageHandle = {
  cssTokens: [
    'RowBlock',
    'RowBlockColumn',
    'ContentImage',
    'PageHeading',
    'SiteSearchAutocomplete',
    'SiteSearchCurtain',
  ],
};

export default function () {
  return (
    <Minimal>
      <RowBlock right>
        <RowBlockColumn>
          <ContentImage image={illustr.tall} />
        </RowBlockColumn>
        <RowBlockColumn>
          <SiteSearchCurtain>
            <PageHeading>Hæ! Hvernig getum við aðstoðað?</PageHeading>
            <SiteSearchAutocomplete
              suggestions={[]}
              setSuggestions={() => undefined}
              getSuggestionValue={() => ''}
              onSuggestionsFetchRequested={() => undefined}
            />
          </SiteSearchCurtain>
        </RowBlockColumn>
      </RowBlock>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot }) => {
    // Check if searchbox becomes the  main focus when clicked, illustration should fade in the background.
    const searchbox = page.locator('.FormField__input');
    await searchbox.click();
    await pageScreenshot('searchbox-click');
  },
};

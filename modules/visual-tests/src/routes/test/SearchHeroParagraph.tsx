import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ContentImage from '@reykjavik/hanna-react/ContentImage';
import PageHeading from '@reykjavik/hanna-react/PageHeading';
import RowBlock from '@reykjavik/hanna-react/RowBlock';
import RowBlockColumn from '@reykjavik/hanna-react/RowBlockColumn';
import SiteSearchAutocomplete from '@reykjavik/hanna-react/SiteSearchAutocomplete';
import SiteSearchCurtain from '@reykjavik/hanna-react/SiteSearchCurtain';
import { HiddenTiger } from 'modules/html-storybook/src/utils/HiddenTiger';

import { Minimal } from '../../layout/Minimal';
import { illustr } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = {
  cssTokens: [
    'RowBlock',
    'RowBlockColumn',
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
          <HiddenTiger
            clientSide={() => (
              <SiteSearchCurtain>
                <PageHeading>Hæ! Hvernig getum við aðstoðað?</PageHeading>
                <SiteSearchAutocomplete
                  suggestions={[]}
                  setSuggestions={() => undefined}
                  getSuggestionValue={() => ''}
                  onSuggestionsFetchRequested={() => undefined}
                />
              </SiteSearchCurtain>
            )}
          />
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

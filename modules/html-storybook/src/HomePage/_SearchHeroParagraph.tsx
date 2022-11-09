import React, { FC, useState } from 'react';
import range from '@hugsmidjan/qj/range';
import Illustration from '@reykjavik/hanna-react/Illustration';
import PageHeading from '@reykjavik/hanna-react/PageHeading';
import RowBlock from '@reykjavik/hanna-react/RowBlock';
import RowBlockColumn from '@reykjavik/hanna-react/RowBlockColumn';
import SiteSearchAutocomplete from '@reykjavik/hanna-react/SiteSearchAutocomplete';
import SiteSearchCurtain from '@reykjavik/hanna-react/SiteSearchCurtain';
import { illustrations } from '@reykjavik/hanna-utils/assets';

import HiddenTiger from '../utils/HiddenTiger';

const items = range(1, 5).map((value) => `Suggestion ${value}`);

const getSuggestions = (value: string): Array<string> => {
  return items.filter((item) =>
    item.toLowerCase().startsWith(value.trim().toLowerCase())
  );
};

type CSSTokenInfo = {
  cssTokens: string;
  cssTokens_server?: string;
};

const SearchHeroParagraph: FC & CSSTokenInfo = () => {
  const [suggestions, setSuggestions] = useState(items);

  return (
    <RowBlock right>
      <RowBlockColumn>
        <Illustration type={illustrations[10]} />
      </RowBlockColumn>
      <RowBlockColumn>
        <HiddenTiger
          serverSide={() => (
            <>
              <PageHeading>Hæ! Hvernig getum við aðstoðað?</PageHeading>
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
              <script id="SiteSearchRoot">// your script here</script>
            </>
          )}
          clientSide={() => (
            <SiteSearchCurtain>
              <PageHeading>Hæ! Hvernig getum við aðstoðað?</PageHeading>
              <SiteSearchAutocomplete
                suggestions={suggestions}
                renderSuggestion={(suggestion) => {
                  return suggestion;
                }}
                setSuggestions={setSuggestions}
                getSuggestionValue={(value) => value}
                onSuggestionsFetchRequested={({ value }) => {
                  setSuggestions(getSuggestions(value));
                }}
              />
            </SiteSearchCurtain>
          )}
        />
      </RowBlockColumn>
    </RowBlock>
  );
};
const cssTokens_server = 'RowBlock,RowBlockColumn,PageHeading,Illustration,';
SearchHeroParagraph.cssTokens_server = cssTokens_server;
SearchHeroParagraph.cssTokens = cssTokens_server + 'SiteSearchCurtain,';

export default SearchHeroParagraph;

import '../../_/initHannaNamespace.js';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import debounce from '@hugsmidjan/qj/debounce';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { SiteSearchAutocomplete } from '@reykjavik/hanna-react/SiteSearchAutocomplete';
import { SiteSearchCurtain } from '@reykjavik/hanna-react/SiteSearchCurtain';
import { HannaLang } from '@reykjavik/hanna-utils/i18n.js';

import ensureCSS from '../../_/ensureCSS.js';
import { getLang } from '../../_/getLang.js';

import { createElasticQuery, postQuery } from './reykjavik.is.js';

const log = (...args: Array<any>) =>
  console.error('renderSiteSearchAutocomplete: ', ...args);

// ===========================================================================

type ElasticSiteSearchAutocompleteProps = {
  title?: string;
  apiUri: string;
  searchPagePath: string;
  exceptBundles?: Array<string>;
  lang?: HannaLang;
};

const ElasticSiteSearchAutocomplete = (props: ElasticSiteSearchAutocompleteProps) => {
  const { title, lang, apiUri, searchPagePath, exceptBundles } = props;

  const [suggestions, setSuggestions] = useState<Array<{ label: string; href: string }>>(
    []
  );
  const [debouncer] = useState(() => debounce.d(200));

  return (
    <SiteSearchCurtain>
      {title && <PageHeading>{title}</PageHeading>}
      <SiteSearchAutocomplete
        lang={lang}
        suggestions={suggestions}
        renderSuggestion={({ label }) => label}
        setSuggestions={setSuggestions}
        onSuggestionSelected={(e, { suggestion }) => {
          window.location.href = suggestion.href;
        }}
        getSuggestionValue={({ label }) => label}
        onSubmit={(value) => {
          window.location.href = `${searchPagePath}?q=${encodeURIComponent(value)}`;
        }}
        onSuggestionsFetchRequested={({ value }) => {
          debouncer.cancel();
          if (value.length >= 2) {
            debouncer(() => {
              const query = createElasticQuery({
                value,
                preference: 'searchbox',
                size: 5,
                _source: ['label', 'url_alias'],
                exceptBundles: exceptBundles,
              });
              postQuery(apiUri, [query]).then((results) => {
                const [result] = results;
                if (!result) {
                  throw new Error();
                }
                setSuggestions(
                  result.items.map(({ label, url_alias }) => ({
                    label: label,
                    href: url_alias,
                  }))
                );
              });
            });
          }
        }}
      />
    </SiteSearchCurtain>
  );
};

// ===========================================================================

type Proptions = {
  insertAt: string;
  apiUri: string;
  searchPagePath: string;
  exceptBundles?: Array<string>;
};

const renderSiteSearchAutocomplete = (props: Proptions): void => {
  const { insertAt, apiUri, searchPagePath, exceptBundles } = props;
  if (!apiUri || !searchPagePath) {
    !apiUri && log('`apiUri` missing');
    !searchPagePath && log('`searchPagePath` missing');
    return;
  }

  const insertionElm = document.querySelector(insertAt);
  const parentElm = insertionElm?.closest('.RowBlockColumn');
  if (!parentElm) {
    !insertionElm
      ? log(`Insertion point "${insertAt}" not found`)
      : log('RowBlockColumn parent not found');
    return;
  }

  const title = parentElm.querySelector('.PageHeading')?.textContent || undefined;

  ensureCSS('SiteSearchCurtain').then(() => {
    const rootElm = document.createElement('div');
    ReactDOM.render(
      <ElasticSiteSearchAutocomplete
        lang={getLang(parentElm)}
        title={title}
        apiUri={apiUri}
        searchPagePath={searchPagePath}
        exceptBundles={exceptBundles}
      />,
      rootElm,
      () => {
        parentElm.textContent = '';
        parentElm.append(rootElm);
      }
    );
  });
};

export default renderSiteSearchAutocomplete;

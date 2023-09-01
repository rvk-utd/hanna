import '../../initHannaNamespace.js';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import debounce from '@hugsmidjan/qj/debounce';
import htmlLang from '@hugsmidjan/qj/htmlLang';
import makeQueryString from '@hugsmidjan/qj/makeQueryString';
import {
  SearchResults,
  SearchResultsItemProps,
  SearchStatus,
} from '@reykjavik/hanna-react/SearchResults';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';
import { printDate } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import ensureCSS from '../_ensureCSS.js';

import {
  ElasticSource,
  postQuery,
  searchResultsPageQuery,
  SimpleResult,
} from './reykjavik.is.js';
// import { addLag } from '@hugsmidjan/qj/wait'; // debugging helper

const log = (...args: Array<any>) => console.error('renderSiteSearchPage: ', ...args);

// ===========================================================================

type FilterTabProps = {
  name: string | undefined;
  label: string;
  count?: number;
};

type SearchResultsData = {
  status?: SearchStatus;
  totalHits?: number;
  hits?: number;
  items: Array<SearchResultsItemProps>;
  filters?: Array<FilterTabProps>;
};

type SearchParams = {
  q?: string;
  type?: string;
};

type FetchAborter = () => void;

type FilterProps = Record<string, string>;

// ===========================================================================

const div = document.createElement('div');
const _stripTitle = (text: string, title: string) => {
  text = text.trim();
  return text.indexOf(title) === 0 ? text.slice(title.length).trim() : text;
};

const tidyUpResultSummary = (summaryHtml: string, title: string): string => {
  if (!summaryHtml) {
    return '';
  }
  div.innerHTML = summaryHtml;
  div.textContent = _stripTitle(div.textContent!, title);
  return div.innerHTML;
};

// const tidyUpContent = (content: string, title: string): string => {
//   content = _stripTitle(content, title);
//   const maxLength = 250;
//   if (content.length > maxLength) {
//     content = content.slice(0, maxLength - 2) + '…';
//   }
//   div.textContent = content;
//   return div.innerHTML;
// };

const valueFromField = (field?: ReadonlyArray<{ value: string }>): string =>
  field && field[0] != null ? field[0].value : '';

const hitsToItems = (
  hits: Array<ElasticSource>,
  lang?: string
): Array<SearchResultsItemProps> =>
  hits.map((hit) => {
    const {
      label,
      url_alias,
      url_internal,
      field_date,
      field_summary, // news items
      rendered_search_result, // other document types
      // content, // ...of last resort
    } = hit;
    const meta: Array<string> = [];
    const date = valueFromField(field_date);
    if (date) {
      meta.push(printDate(date, lang));
    }
    return {
      title: label,
      meta: meta.length ? meta : undefined,
      summary:
        valueFromField(field_summary) ||
        tidyUpResultSummary(rendered_search_result, label),
      // || tidyUpContent(content, label),
      href: url_alias || url_internal,
      // image: 'image_url'
    };
  });

const filtersToTabs = (
  filters: Array<FilterTabProps>,
  aggregationResult: SimpleResult | undefined
): Array<FilterTabProps> => {
  const { aggregateData = {}, totalHits } = aggregationResult || {};
  return filters
    .map(({ name, label }) => ({
      name,
      label,
      count: (name ? aggregateData[name] : totalHits) || 0,
    }))
    .filter((tab) => tab.count > 0);
};

const makeFilters = (filters: FilterProps): Array<FilterTabProps> =>
  Object.entries({
    '': 'Allt',
    ...filters,
  }).map(([key, label]) => ({
    name: key || '',
    label,
  }));

const DEFAULT_PAGE_SIZE = 10;
const MIN_QUERY_LENGTH = 2;

export type SiteSearchPageI18n = {
  searchInputLabel: string;
  searchPlaceholder: string;
  searchButtonText: string;
};
const defaultTexts: DefaultTexts<SiteSearchPageI18n> = {
  en: {
    searchInputLabel: 'Enter your search query',
    searchPlaceholder: 'Enter your search query',
    searchButtonText: 'Search',
  },
  is: {
    searchInputLabel: 'Sláðu inn leitarorð',
    searchPlaceholder: 'Sláðu inn leitarorð',
    searchButtonText: 'Leita',
  },
};

// ===========================================================================

const MiniRouter = {
  push: (query: Record<string, string | undefined>, replace?: boolean): void => {
    const method = replace ? 'replaceState' : 'pushState';
    const queryString = makeQueryString(query);
    const url = queryString ? '?' + queryString : '';
    history[method](null, '', url);
    window.dispatchEvent(new Event('minirouting'));
  },
  replace: (query: Record<string, string | undefined>) => MiniRouter.push(query, true),
};

// ===========================================================================

const getUrlParams = (last: SearchParams = {}): SearchParams => {
  const p = new URLSearchParams(window.location.search);
  const q = p.get('q') || undefined;
  const type = p.get('type') || undefined;
  return q !== last.q || type !== last.type ? { q, type } : last;
};

// ===========================================================================

// ===========================================================================

const useSearchState = (
  apiUri: string,
  bundleLabels: FilterProps,
  pageSize: number,
  lang?: string
) => {
  const filters = useMemo(() => makeFilters(bundleLabels), [bundleLabels]);

  const [params, _setParams] = useState(getUrlParams);
  const lastParams = useRef<SearchParams>({});
  const setParams = useCallback(() => {
    _setParams((params) => {
      lastParams.current = params;
      return getUrlParams(params);
    });
  }, []);

  const [, setCurrentPage] = useState(0);

  useEffect(() => {
    window.addEventListener('popstate', setParams);
    window.addEventListener('minirouting', setParams);
    return () => {
      window.removeEventListener('popstate', setParams);
      window.removeEventListener('minirouting', setParams);
    };
  }, [setParams]);

  const [searchResults, setSearchResults] = useState<SearchResultsData>({
    items: [],
  });
  const abortFetch = useRef<FetchAborter>();

  const performSearch = useCallback(
    (fromPage = 0): FetchAborter | undefined => {
      const { q, type } = params;
      const last = lastParams.current;

      const status: SearchStatus | undefined =
        q !== last.q
          ? 'loadingquery'
          : type !== last.type
          ? 'loadingfilter'
          : fromPage > 0
          ? 'loadingmore'
          : undefined;

      if (!status) {
        return;
      }

      if (!q || q.length < MIN_QUERY_LENGTH) {
        return;
      }

      setSearchResults((state) => {
        return {
          status,
          totalHits: status === 'loadingquery' ? undefined : state.totalHits,
          hits:
            status === 'loadingquery'
              ? undefined
              : state.filters?.find((tabData) => tabData.name === type)?.count,
          items: status === 'loadingmore' ? state.items : [],
          filters: status === 'loadingquery' ? filters.slice(0, 1) : state.filters,
        };
      });

      const abortCtrl = new AbortController();
      const eQuery = searchResultsPageQuery({
        value: q,
        filter:
          type && filters.find((f) => f.name === type)
            ? [{ term: { bundle: type } }]
            : undefined,
        from: fromPage * pageSize,
        size: pageSize,
      });

      postQuery(apiUri, eQuery, abortCtrl.signal)
        // .then(addLag(3000))
        .then((data) => {
          const [aggregateResults, elasticResult] = data;
          if (!aggregateResults || !elasticResult) {
            throw new Error('query returned incomplete results');
          }
          const items = hitsToItems(elasticResult.items, lang);
          setSearchResults((state) => {
            return {
              status: 'results',
              totalHits: aggregateResults.totalHits,
              hits: type ? elasticResult.totalHits : aggregateResults.totalHits,
              items: status === 'loadingmore' ? state.items.concat(items) : items,
              filters: filtersToTabs(filters, aggregateResults),
            };
          });
          setParams();
          abortFetch.current = undefined;
        })
        .catch((error) => {
          if (!abortCtrl.signal.aborted) {
            abortFetch.current = undefined;
            log(error);
            setSearchResults((state) => ({
              ...state,
              status: 'error',
            }));
          }
        });

      return () => abortCtrl.abort();
    },
    [params, filters, pageSize, apiUri, setParams, lang]
  );

  useEffect(() => {
    setCurrentPage(0);
    abortFetch.current && abortFetch.current();
    abortFetch.current = performSearch();

    return () => {
      abortFetch.current && abortFetch.current();
    };
  }, [performSearch]);

  const loadMore = useCallback(() => {
    if (!abortFetch.current) {
      setCurrentPage((currentPage) => {
        const nextPage = currentPage + 1;
        abortFetch.current = performSearch(nextPage);
        return nextPage;
      });
    }
  }, [performSearch]);

  return {
    params,
    searchResults,
    loadMore,
  };
};

// ===========================================================================

const useDebouncer = () => {
  const [debouncer] = useState(() => debounce.d(500));
  useEffect(
    () => debouncer.cancel,
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return debouncer;
};

// ===========================================================================

// ===========================================================================

type SiteSearchPageProps = {
  apiUri: string;
  bundleLabels: FilterProps | undefined;
  pageSize?: number;
  lang?: string;
};

const SiteSearchPage = (props: SiteSearchPageProps) => {
  const { lang, apiUri, bundleLabels = {}, pageSize = DEFAULT_PAGE_SIZE } = props;
  const texts = getTexts(props, defaultTexts);

  const { params, searchResults, loadMore } = useSearchState(
    apiUri,
    bundleLabels,
    pageSize,
    lang
  );
  const [inputValue, setInputValue] = useState(params.q || '');

  const debcouncer = useDebouncer();
  const updateQ = (q: string) => {
    debcouncer.cancel();
    q = q.trim();
    if ((!q || q.length >= MIN_QUERY_LENGTH) && q !== params.q) {
      debcouncer(() => {
        MiniRouter.replace({
          q: q || undefined,
        });
      }, 500);
    }
  };

  const { filters, status, items, hits, totalHits } = searchResults;

  const updateFilter =
    filters &&
    ((index: number) => {
      MiniRouter.replace({
        q: params.q,
        type: filters[index]?.name,
      });
    });
  const activeFilterIdx =
    filters &&
    Math.max(
      0,
      filters.findIndex((filter) => params.type === filter.name)
    );

  return (
    <>
      <SiteSearchInput
        label={texts.searchInputLabel}
        placeholder={texts.searchPlaceholder}
        buttonText={texts.searchButtonText}
        value={inputValue}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setInputValue(value);
          updateQ(value);
        }}
      />
      {status && params.q && (
        <SearchResults
          status={status}
          items={items}
          totalHits={totalHits}
          hits={hits}
          pageSize={pageSize}
          query={params.q}
          activeFilterIdx={activeFilterIdx}
          filters={filters}
          setFilter={updateFilter}
          loadMore={loadMore}
          lang={lang}
        />
      )}
    </>
  );
};

// ===========================================================================

// ===========================================================================

type Proptions = SiteSearchPageProps & {
  insertAt: string;
};

const renderSiteSearchPage = (props: Proptions) => {
  const { insertAt, apiUri, bundleLabels, pageSize } = props;
  if (!apiUri || !bundleLabels) {
    !apiUri && log('`apiUri` missing');
    !bundleLabels && log('`bundleLabels` missing');
    return;
  }

  const insertionElm = document.querySelector(insertAt);
  if (!insertionElm) {
    log('Insertion point "' + insertAt + '" not found');
    return;
  }

  ensureCSS('SearchResults', 'SiteSearchInput').then(() => {
    const rootElm = document.createElement('div');
    rootElm.className = 'SiteSearchPage';
    const lang = htmlLang() as undefined;

    ReactDOM.render(
      <SiteSearchPage
        apiUri={apiUri}
        bundleLabels={bundleLabels}
        pageSize={pageSize}
        lang={lang}
      />,
      rootElm,
      () => {
        insertionElm.replaceWith(rootElm);
      }
    );
  });
};

export default renderSiteSearchPage;

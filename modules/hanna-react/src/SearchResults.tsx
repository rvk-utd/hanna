import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { prettyNum, PrettyNumOptions } from '@hugsmidjan/qj/prettyNum';
import range from '@hugsmidjan/qj/range';
import { useDomid } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import {
  SearchResultsItem,
  SearchResultsItemProps,
} from './SearchResults/_SearchResultsItem';
import Alert from './Alert';
import Tabs, { TabItemProps } from './Tabs';

const renderDefaultErrorText = () => (
  <>
    Úps, það hefur komið upp villa. Má bjóða þér að prófa aftur að leita?
    <br />
    Ef ekkert lát er á villunni þá kunnum við að meta að þú látir okkur vita.
  </>
);

export type SearchReesultI18n = {
  lang: string;
  loadQueryTitle: string;
  resultsTitle: string;
  noResultsTitle: string;
  loadMore: string;
  // loadingMore: string;
};

const defaultTexts: DefaultTexts<SearchReesultI18n> = {
  en: {
    lang: 'en',
    loadQueryTitle: 'Loading results...',
    resultsTitle: 'results found for',
    noResultsTitle: 'No results were found for',
    loadMore: 'Load more',
    // loadingMore: 'Loading...',
  },
  is: {
    lang: 'is',
    loadQueryTitle: 'Sæki niðurstöður...',
    resultsTitle: 'leitarniðurstöður fyrir',
    noResultsTitle: 'Engar leitarniðurstöður fundust fyrir',
    loadMore: 'Sækja fleiri',
    // loadingMore: 'Sæki fleiri...',
  },
};

// ===========================================================================

type SRTabsProps = {
  domid: string;
  filters?: Array<SearchResultsFilter>;
  activeIdx?: number;
  setFilter?: (activeTab: number) => void;
  lang: string;
};
const SearchResults_Tabs = (props: SRTabsProps) => {
  const { domid, filters, activeIdx, setFilter, lang } = props;

  const tabs: Array<TabItemProps> = useMemo(
    () =>
      (filters || []).map(({ label, count }) => ({
        label,
        badge: prettyNum(count, { lang }),
      })),
    [filters, lang]
  );

  return tabs.length ? (
    <Tabs
      role="tablist"
      aria-controls={domid}
      tabs={tabs}
      activeIdx={activeIdx || 0}
      onSetActive={(i) => setFilter && setFilter(i)}
    />
  ) : null;
};

// ===========================================================================

type LoadingScaffoldProps = { count: number };

const LoadingScaffold = (props: LoadingScaffoldProps) =>
  props.count ? (
    <ol className="SearchResults__list SearchResults__list--loading">
      {range(1, props.count).map((item, i) => (
        <SearchResultsItem key={i} title="..." summary="" href="" />
      ))}
    </ol>
  ) : null;

// ===========================================================================

const NUM_AUTOLOADS = 2;

type LoadMoreProps = {
  hits?: number;
  numItems?: number;
  status: SearchStatus;
  pageSize: number;
  loadMore?: () => void;
  texts: SearchReesultI18n;
};

const SearchResults__loadmore = (props: LoadMoreProps) => {
  const { status, hits, numItems, loadMore, pageSize, texts } = props;
  const { lang } = texts;

  const moreCount = (hits || 0) - (numItems || 0);

  const autoLoadCount = useRef(0);
  const skip = !loadMore || autoLoadCount.current >= NUM_AUTOLOADS;

  const [refFn, theEndIsNigh] = useInView({
    rootMargin: '150px 0px 0px 0px',
    skip, // disable after two clicks
  });

  useEffect(() => {
    if (theEndIsNigh && loadMore) {
      autoLoadCount.current = autoLoadCount.current + 1;
      loadMore();
    }
  }, [theEndIsNigh, loadMore]);

  const moreAvailable = status === 'results' && moreCount && loadMore;

  return status === 'loadingmore' ? (
    <LoadingScaffold count={Math.min(pageSize, moreCount)} />
  ) : moreAvailable ? (
    <button
      ref={refFn}
      className="SearchResults__loadmore"
      type="button"
      onClick={loadMore}
    >
      {texts.loadMore}{' '}
      <span className="SearchResults__loadmore__count">
        ({prettyNum(moreCount, { lang })})
      </span>
    </button>
  ) : null;
};
// ===========================================================================

const renderTitle = (props: SearchResultsProps, texts: SearchReesultI18n) => {
  const { status, totalHits, query } = props;
  return (
    <h2 className="SearchResults__title">
      {status === 'loadingquery'
        ? texts.loadQueryTitle
        : totalHits
        ? prettyNum(totalHits, { lang: texts.lang as PrettyNumOptions['lang'] }) +
          ' ' +
          texts.resultsTitle
        : texts.noResultsTitle}
      <span className="SearchResults__query">{query}</span>
    </h2>
  );
};

// ---------------------------------------------------------------------------

const renderResults = (props: SearchResultsProps) => {
  const { status, pageSize, items, hits } = props;

  if (status === 'loadingquery' || status === 'loadingfilter') {
    return <LoadingScaffold count={Math.min(pageSize, hits || 999)} />;
  }

  return items && items.length ? (
    <ol className="SearchResults__list">
      {items.map((item, i) => (
        <SearchResultsItem key={i} {...item} />
      ))}
    </ol>
  ) : null;
};

// ---------------------------------------------------------------------------

const renderLoadMore = (props: SearchResultsProps, texts: SearchReesultI18n) => {
  const { hits, items, status, pageSize, loadMore } = props;

  return (
    <SearchResults__loadmore
      hits={hits}
      numItems={items && items.length}
      status={status}
      pageSize={pageSize}
      loadMore={loadMore}
      texts={texts}
    />
  );
};

// ===========================================================================

export type SearchStatus =
  | 'loadingquery'
  | 'loadingfilter'
  | 'error'
  | 'results'
  | 'loadingmore';

export type SearchResultsFilter = {
  label: string;
  count?: number;
};

export type { SearchResultsItemProps } from './SearchResults/_SearchResultsItem';

export type SearchResultsProps = {
  totalHits?: number;
  hits?: number;
  query?: string;
  items?: Array<SearchResultsItemProps>;
  filters?: Array<SearchResultsFilter>;
  activeFilterIdx?: number;
  setFilter?: (activeTab: number) => void;
  status: SearchStatus;
  errorText?: string | ReactNode;
  pageSize: number;
  pages?: number;
  loadMore?: () => void;
  texts?: SearchReesultI18n;
  lang?: string;
};

// TODO: add plural translation thingy for result string
export const SearchResults = (props: SearchResultsProps) => {
  const { filters, activeFilterIdx, setFilter, status, errorText } = props;
  const texts = getTexts(props, defaultTexts);

  const domid = useDomid();

  return (
    <div className={getBemClass('SearchResults', status !== 'results' && status)}>
      {renderTitle(props, texts)}

      <SearchResults_Tabs
        domid={domid}
        filters={filters}
        activeIdx={activeFilterIdx}
        setFilter={setFilter}
        lang={texts.lang}
      />

      <div className="SearchResults__results" id={domid}>
        {renderResults(props)}
        {status === 'error' && (
          <Alert type="error">{errorText || renderDefaultErrorText()}</Alert>
        )}
        {renderLoadMore(props, texts)}
      </div>
    </div>
  );
};

export default SearchResults;

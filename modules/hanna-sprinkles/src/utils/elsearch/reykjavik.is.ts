/* Helper functions specific to www.reykjavik.is website */

type QueryProps = {
  dataField: Array<string> | string;
  [key: string]: unknown;
  exceptBundles?: Array<string>; // will filter out bundles in this array
};

export const shouldQuery = (
  value: string,
  dataFields: Array<string>,
  props: QueryProps
) => {
  const fields = dataFields.map(function (field, index) {
    return (
      '' +
      field +
      (Array.isArray(props.fieldWeights) && props.fieldWeights[index]
        ? '^' + props.fieldWeights[index]
        : '')
    );
  });

  if (props.searchOperators) {
    return {
      query: value,
      fields: fields,
      default_operator: props.queryFormat,
    };
  }

  if (props.queryFormat === 'and') {
    return [
      {
        multi_match: {
          query: value,
          fields: fields,
          type: 'bool_prefix',
          operator: 'and',
        },
      },
      {
        multi_match: {
          query: value,
          fields: fields,
          type: 'phrase',
          operator: 'and',
        },
      },
    ];
  }

  return [
    {
      multi_match: {
        query: value,
        fields: fields,
        type: 'best_fields',
        operator: 'or',
        fuzziness: props.fuzziness ? props.fuzziness : 0,
      },
    },
    {
      multi_match: {
        query: value,
        fields: fields,
        type: 'phrase',
        operator: 'or',
      },
    },
  ];
};

export const defaultQuery = (value: string, props: QueryProps) => {
  let finalQuery: Record<string, any> | null = null;
  let fields: Array<string> = [];

  if (value && value !== '') {
    if (Array.isArray(props.dataField)) {
      fields = props.dataField;
    } else {
      fields = [props.dataField];
    }

    if (props.searchOperators) {
      finalQuery = {
        simple_query_string: shouldQuery(value, fields, props),
      };
    } else {
      const filter = props.filter || undefined;
      finalQuery = {
        bool: {
          should: shouldQuery(value, fields, props),
          minimum_should_match: '1',
          filter,
        },
      };

      if (props.exceptBundles && props.exceptBundles.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        finalQuery.bool.must_not = {
          terms: { bundle: props.exceptBundles },
        };
      }
    }
  }

  if (finalQuery && props.nestedField) {
    finalQuery = {
      nested: {
        path: props.nestedField,
        query: finalQuery,
      },
    };
  }

  return finalQuery;
};

// ===========================================================================

export const getBundleCount = (key: string, buckets: Array<ElasticBucket> | undefined) =>
  (buckets && buckets.find((bucket) => bucket.key === key)?.doc_count) || 0;

export const createElasticQuery = (
  args: ElasticQueryParms & { preference: string }
): ElasticQuery => {
  const { value, preference, aggs, size, from, _source, filter, exceptBundles } = args;
  return {
    preference,
    query: {
      ...defaultQuery(value, {
        fuzziness: 'AUTO',
        fieldWeights: [10, 2, 1],
        dataField: ['label', 'field_preview_text.value', 'content'],
        queryFormat: 'and',
        filter,
        exceptBundles,
      }),
    },
    aggs,
    size,
    from,
    sort: [{ _score: { order: 'desc' } }, { bundle_weight: { order: 'desc' } }],
    _source,
  };
};

const defaultSource = [
  'label',
  'field_summary',
  'url_alias',
  'url_internal',
  'rendered_search_result',
  // 'content',
];
const defaultAggs = {
  bundle: { terms: { field: 'bundle', order: { _count: 'desc' } } },
};

export const searchResultsPageQuery = (query: ElasticQueryParms): Array<ElasticQuery> => {
  const {
    value,
    preference = 'resultspage',
    size,
    aggs = defaultAggs,
    from,
    _source = defaultSource,
    filter,
  } = query;
  return [
    createElasticQuery({ value, preference, aggs, _source: false }),
    createElasticQuery({ value, preference, size, from, _source, filter }),
  ];
};

export const queryToString = (_query: ElasticQuery) => {
  const { preference, ...rest } = _query;

  return `{ "preference": "${preference}" }` + '\n' + JSON.stringify({ ...rest }) + '\n';
};

const cleanResult = (result: ElasticResult): SimpleResult => {
  const aggregateData = result.aggregations?.bundle?.buckets.reduce(
    (prevBucket, { key, doc_count }) => {
      prevBucket[key] = doc_count;
      return prevBucket;
    },
    {} as SimpleAggregate
  );
  return {
    totalHits: result.hits.total.value,
    items: result.hits.hits.map(({ _source }) => _source),
    aggregateData,
  };
};

export const postQuery = (
  url: string,
  queries: ElasticQuery | Array<ElasticQuery>,
  signal?: AbortSignal
) => {
  queries = Array.isArray(queries) ? queries : [queries];

  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-ndjson',
    },
    signal,
    method: 'POST',
    body: queries.map(queryToString).join(''),
  }).then(async (data) => {
    const jsonData = (await data.json()) as ElasticResponse;
    return (
      (jsonData.responses && jsonData.responses.map((result) => cleanResult(result))) ||
      []
    );
  });
};

// ===========================================================================

declare global {
  interface Window {
    drupalSettings: {
      elasticsearch: DrupalSearchSettings;
      searchPagePath: string;
    };
  }
}

type DrupalSearchSettings = {
  api_uri: string;
  bundle_labels: Record<string, string>;
  id: string;
  indexes: Record<string, string>;
  searchPagePath: string;
};

export type SimpleAggregate = Record<string, number>;
export type SimpleResult = {
  totalHits: number;
  items: Array<ElasticSource>;
  aggregateData?: SimpleAggregate;
};
export type ElasticQuery = {
  preference: string;
  size?: number;
  from?: number;
  aggs?: Record<string, unknown>;
  query: Record<string, unknown>;
  filter?: unknown;
  sort: Array<any>;
  _source?: boolean | Array<string>;
};
export type ElasticQueryParms = {
  value: string;
  preference?: string;
  size?: number;
  from?: number;
  aggs?: Record<string, unknown>;
  filter?: unknown;
  _source?: boolean | Array<string>;
  exceptBundles?: Array<string>;
};

export type ElasticSource = {
  bundle: string;
  bundle_label: string;
  changed: string;
  content: string;
  created: string;
  entity: string;
  entity_label: string;
  field_summary?: Array<Record<'value', string>>;
  field_date?: Array<Record<'value', string>>;
  id: string;
  label: string;
  langcode: string;
  promote: Array<Record<'value', boolean>>;
  rendered_search_result: string;
  status: boolean;
  url_alias: string;
  url_internal: string;
  uuid: string;
};
export type ElasticHit = {
  _id: number;
  _index: string;
  _score: number;
  _source: ElasticSource;
  _type: string;
};
type ElasticBucket = {
  key: string;
  doc_count: number;
};
export type ElasticAggregations = {
  bundle?: {
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: Array<ElasticBucket>;
  };
};
export type ElasticResult = {
  _shards: {
    failed: number;
    skipped: number;
    successful: number;
    total: number;
  };
  hits: {
    hits: Array<ElasticHit>;
    max_score: number;
    total: {
      relation: string;
      value: number;
    };
  };
  aggregations?: ElasticAggregations;
  status: number;
  timed_out: boolean;
  took: number;
};

export type ElasticResponse = {
  responses: Array<ElasticResult>;
};

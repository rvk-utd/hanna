import { TogglerGroupOptions } from '../_abstract/_TogglerGroup.js';
import { TogglerGroupFieldOption } from '../_abstract/_TogglerGroupField.js';

const WHOLE_WORD = 10000;
const STARTS_WITH = 100;
const CONTAINS = 1;
const VALUE_WEIGHT = 1 / 10;
/** Scoring weight modifier based on a word's positional index within the value */
const wordWeight = (wordIndex: number) => 10 / (10 + wordIndex);

// Exported for testing purposes
export const _weights = {
  WHOLE_WORD,
  STARTS_WITH,
  CONTAINS,
  VALUE_WEIGHT,
  wordWeight,
};

/**
 * Calculates a score based on how well an item string (either label or value)
 * matches a given list of query words.
 * Splits the item string into words and scores each word.
 * Favors full matches and matches at the start of the word.
 * Weighs earlier words higher than words near the end.
 *
 * Limitation: Does currently not give extra points when query words
 * appear in the correct order in the item string.
 */
const calcScore = (itemString: string, queryWords: Array<string>) => {
  let score = 0;
  queryWords.forEach((queryWord) => {
    itemString.split(/\s+/).forEach((word, wi) => {
      let wordScore = 0;

      if (word === queryWord) {
        wordScore += WHOLE_WORD;
      } else {
        const pos = word.indexOf(queryWord);
        if (pos === 0) {
          wordScore += STARTS_WITH;
        } else if (pos > 0) {
          wordScore += CONTAINS;
        }
      }

      score += wordScore * wordWeight(wi);
    });
  });
  return score;
};

// ---------------------------------------------------------------------------

export type SearchScoringfn = (
  /** The Multiselect item object to calculate search score for */
  item: TogglerGroupFieldOption<string>,
  /** Trimmed list of `toLowerCase`d query words */
  queryWords: Array<string>,
  /** The raw, untouched search query as typed by the user */
  rawQuery: string
) => number;

export const defaultSearchScoring: SearchScoringfn = (item, queryWords) => {
  if (!item.value) {
    return 0;
  }
  const value = item.value.toLowerCase().trim();
  const label = item.label?.toLowerCase().trim() || value;
  let score = calcScore(label, queryWords);
  if (!score) {
    score = VALUE_WEIGHT * calcScore(value, queryWords);
  }
  return score;
};

// ---------------------------------------------------------------------------

// banana emoji
const SEP = '🍌';

/** Returns a normalized, filtered list of options */
export const filterItems = <Extras = Record<string, never>>(
  options: TogglerGroupOptions<string, Extras>,
  searchQuery: string,
  searchScoringFn = defaultSearchScoring
): TogglerGroupOptions<string, Extras> => {
  if (!searchQuery.trim()) {
    return options;
  }
  const found = new Set<string>();
  const queryWords = searchQuery.toLowerCase().trim().split(/\s+/);
  return (
    options
      .map((item) => ({
        item,
        score: searchScoringFn(item, queryWords, searchQuery),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => (a.score === b.score ? 0 : a.score < b.score ? 1 : -1))
      .map(({ item }) => item)
      // remove duplicates
      .filter((item) => {
        const key = item.value + SEP + item.label;
        if (found.has(key)) {
          return false;
        }
        found.add(key);
        return true;
      })
  );
};

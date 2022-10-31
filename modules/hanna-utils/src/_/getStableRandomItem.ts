const stupidStableRandom = (seed: string) =>
  [1, 5, 11, 17, 29, 37].reduce(
    (sum, idx) => sum + (seed.charCodeAt(idx % seed.length) || 32) - 32,
    42
  );

/**
 * Returns a pseudo random item from a collection of `items` (array or record),
 * based on a given `seed` key/id. The function always returns the same item for
 * a given collection and `seed`.
 *
 * You might want to use this helper inside React components to get a stable
 * randomness, without having to resort to hooks.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#getstablerandomitem
 */
export const getStableRandomItem = <T>(
  items: ReadonlyArray<T> | Record<string, T>,
  seed: string
): T => {
  if (!Array.isArray(items)) {
    const key = getStableRandomItem(Object.keys(items), seed);
    return (items as Record<string, T>)[key]!;
  }
  return items.length > 1 ? items[stupidStableRandom(seed) % items.length] : items[0];
};

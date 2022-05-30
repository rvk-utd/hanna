const stupidStableRandom = (seed: string) =>
  [1, 5, 11, 17, 29, 37].reduce(
    (sum, idx) => sum + (seed.charCodeAt(idx % seed.length) || 32) - 32,
    42
  );

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

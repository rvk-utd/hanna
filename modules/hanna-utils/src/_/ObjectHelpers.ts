/** Hack to add some typing to Object.entries */
/*#__NO_SIDE_EFFECTS__*/
export const ObjectEntries = <T extends object>(object: T) =>
  Object.entries(object) as Array<[keyof T, T[keyof T]]>;

/** Hack to add some typing to Object.fromEntries */
/*#__NO_SIDE_EFFECTS__*/
export const ObjectFromEntries = <K extends string, V>(
  array: ReadonlyArray<readonly [K, V]>
) => Object.fromEntries(array) as Record<K, V>;

/** Hack to add some typing to Object.keys */
/*#__NO_SIDE_EFFECTS__*/
export const ObjectKeys = <T extends object>(object: T) =>
  Object.keys(object) as Array<keyof T>;

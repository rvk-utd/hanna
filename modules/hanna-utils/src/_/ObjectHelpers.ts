/** Hack to add some typing to Object.entries */
export const ObjectEntries = <T extends object>(object: T) =>
  Object.entries(object) as Array<[keyof T, T[keyof T]]>;

/** Hack to add some typing to Object.fromEntries */
export const ObjectFromEntries = <K extends string, V>(array: Array<[K, V]>) =>
  Object.fromEntries(array) as Record<K, V>;

/** Hack to add some typing to Object.keys */
export const ObjectKeys = <T extends object>(object: T) =>
  Object.keys(object) as Array<keyof T>;

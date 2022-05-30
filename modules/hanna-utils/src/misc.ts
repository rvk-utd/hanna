/** Type-guarding filter function to weed out nully values. */
export const notNully = <T>(val: T): val is NonNullable<T> => val != null;

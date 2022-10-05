declare const PositiveInteger__brand: unique symbol;
export type PositiveInteger = number & { [PositiveInteger__brand]: true };

export const ensurePosInt = (cand: unknown): PositiveInteger | undefined => {
  if (typeof cand !== 'number' || isNaN(cand) || cand < 0 || Math.floor(cand) !== cand) {
    return;
  }
  return cand as PositiveInteger;
};

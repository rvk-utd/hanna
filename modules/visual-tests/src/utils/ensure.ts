export const ensureString = (cand: unknown): string | undefined => {
  if (typeof cand === 'string') {
    return cand;
  }
};

export const ensureStringArray = (cand: unknown): Array<string> | undefined => {
  if (Array.isArray(cand) && cand.every(ensureString)) {
    return cand as Array<string>;
  }
};

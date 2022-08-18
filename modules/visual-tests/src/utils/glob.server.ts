import type { IOptions } from 'glob';
import { glob } from 'glob';

export { glob, sync as globSync } from 'glob';

export const globP = (pattern: string, options?: IOptions) =>
  new Promise<Array<string>>((resolve, reject) => {
    glob(pattern, options || {}, (err, files) =>
      err === null ? resolve(files) : reject(err)
    );
  });

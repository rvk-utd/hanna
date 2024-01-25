import { renameSync } from 'fs';
import { sync as glob } from 'glob';

const idealSuffix = `---q50.png`;

glob('src/assets/illustrations/**.png')
  .filter((name) => !name.endsWith(idealSuffix))
  .sort()
  .forEach((filePath) => {
    const newFilePath = filePath.replace(/(?:---q\d{1,3})?\.png/, idealSuffix);
    renameSync(filePath, newFilePath);
  });

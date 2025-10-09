export type CustomFile = { preview?: string } & File;

/**
 * Attaches a `preview` prop to file objects that don't already have a `preview` key defined
 *
 * The preview's value is either a data URI (for image-type files) or `undefined`
 */
export const addPreview = (file: CustomFile): void => {
  if (!('preview' in file)) {
    file.preview = file.type.includes('image/') ? URL.createObjectURL(file) : undefined;
  }
};

/**
 * Revokes `preview` data URIs to avoid memory leaks
 *
 * (See: https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
 */
export const releasePreview = (file: CustomFile): void => {
  file.preview && URL.revokeObjectURL(file.preview);
  delete file.preview;
};

// ---------------------------------------------------------------------------

const k = 1024;
const kThreshold = 970 / k; // Snap up a unit level at this point
const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB' /*, 'EB', 'ZB', 'YB' */];
const decimalSymbols: Record<string, string> = { is: ',', en: '.', pl: ',' };

/**
 * Small+stupid file size pretty-printer.
 */
export const formatBytes = (bytes: number, lang = 'is', decimals = 2): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const i = Math.min(
    Math.floor(Math.log(Math.abs(bytes) / kThreshold) / Math.log(k)),
    units.length - 1
  );
  const scaled = bytes / Math.pow(k, i);
  const formatted = `${parseFloat(scaled.toFixed(decimals))}`.replace(
    '.',
    // NOTE: As of 2022-11 Chrome still doesn't support Icelandic
    decimalSymbols[lang] || (1.1).toLocaleString(lang)[1]!
  );
  return `${formatted} ${units[i]}`;
};

/**
 * Figures out how to handle adding files to a FileInput
 * Which files to retaine, which too delete, and
 * what the updated fileList should look like.
 */
export const getFileListUpdate = (
  oldFileList: Array<File>,
  added: Array<File>,

  /**
   * `replaceMode: true` is the default "single-file" input behavior.
   *
   * Pass `false` to this argument when the "multiple" prop is true.
   */
  replaceMode: boolean
) => {
  const deleted: Array<File> = replaceMode ? oldFileList : [];
  const retained: Array<File> = [];
  if (!replaceMode) {
    oldFileList.forEach((oldFile) => {
      if (added.find(({ name }) => name === oldFile.name)) {
        deleted.push(oldFile);
      } else {
        retained.push(oldFile);
      }
    });
  }

  return {
    fileList: retained.concat(added),
    diff: deleted.length ? { added, deleted } : { added },
  };
};

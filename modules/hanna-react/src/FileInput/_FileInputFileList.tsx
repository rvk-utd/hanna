import React from 'react';

import type { formatBytes } from './_FileInput.utils';
import { CustomFile } from './_FileInput.utils';

export type FileListProps = {
  files: Array<CustomFile>;
  showFileSize?: boolean;
  showImagePreviews?: boolean;
  removeFileText: string;
  removeFile: (file: File | string) => void;
  formatBytes: typeof formatBytes;
};

export const DefaultFileList = (props: FileListProps) => {
  const {
    files,
    showFileSize,
    showImagePreviews,
    removeFileText,
    removeFile,
    formatBytes,
  } = props;
  if (!files.length) {
    return null;
  }
  return (
    <ul className="FileInput__filelist">
      {files.map((file) => (
        <li key={file.name} className="FileInput__file">
          <button
            className="FileInput__file-remove"
            type="button"
            onClick={() => removeFile(file)}
            aria-label={`${removeFileText} ${file.name}`}
          >
            {removeFileText}
          </button>
          <span className="FileInput__fileinfo">
            {showImagePreviews && file.preview && (
              <>
                <span className="FileInput__preview">
                  <img src={file.preview} alt="" />
                </span>{' '}
              </>
            )}
            <span className="FileInput__filename">{file.name}</span>
            {showFileSize && (
              <small className="FileInput__filesize"> - ({formatBytes(file.size)})</small>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};

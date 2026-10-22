import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { Progress } from '../Progress.js';

import type { formatBytes } from './_FileInput.utils.js';
import { CustomFile } from './_FileInput.utils.js';

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
      {files.map((file) => {
        const hasPreview = !!(showImagePreviews && file.preview);
        return (
          <li key={file.name} className="FileInput__file">
            <button
              className="FileInput__file-remove"
              type="button"
              onClick={() => removeFile(file)}
              aria-label={`${removeFileText} ${file.name}`}
            >
              {removeFileText}
            </button>
            <span
              className={modifiedClass('FileInput__fileinfo', [
                'loading',
                hasPreview && 'preview',
              ])}
            >
              <Progress spinner size="small" />
              {hasPreview && (
                <>
                  <span className="FileInput__preview">
                    <img src={file.preview} alt="" />
                  </span>{' '}
                </>
              )}
              <span className="FileInput__filename">{file.name}</span>
              {showFileSize && (
                <small className="FileInput__filesize">
                  {' '}
                  - ({formatBytes(file.size)})
                </small>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

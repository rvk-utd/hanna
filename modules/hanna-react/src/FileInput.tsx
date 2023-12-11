import React, { useEffect, useRef, useState } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { OpenRecord } from '@reykjavik/hanna-utils';
import { DEFAULT_LANG, HannaLang } from '@reykjavik/hanna-utils/i18n';

import { useDropzone } from './_mixed_export_resolution_/ReactDropzone.js';
import {
  addPreview,
  CustomFile,
  formatBytes,
  getFileListUpdate,
  releasePreview,
} from './FileInput/_FileInput.utils.js';
import { DefaultFileList, FileListProps } from './FileInput/_FileInputFileList.js';
import { useDomid } from './utils/useDomid.js';
import FormField, {
  FormFieldWrappingProps,
  groupFormFieldWrapperProps,
} from './FormField.js';

const defaultRemoveFileText: OpenRecord<HannaLang, string> = {
  is: 'Fjarlægja',
  en: 'Remove',
  pl: 'Usuń',
};

const defaultOnFilesRejected: FileInputProps['onFilesRejected'] = (rejectedFiles) => {
  window.alert(
    `Error:\n${rejectedFiles
      .map((elm) => {
        return elm.name;
      })
      .join(', ')}`
  );
};

export type FileInputProps = FormFieldWrappingProps & {
  /**
   * Flags if the input should accept multiple, or just a single file at a time.
   *
   * Default: `true`
   */
  multiple?: boolean;
  /**
   * Accepted file mime type(s).
   *
   * Default: no restrictions.
   */
  accept?: string | Array<string>;
  dropzoneText: string | JSX.Element;
  removeFileText?: string;
  lang?: HannaLang;
  showFileSize?: boolean;
  showImagePreviews?: boolean;
  FileList?: false | ((props: FileListProps) => JSX.Element | null);
  onFilesUpdated?: (
    /** Updated, full list of Files. */
    files: Array<File>,
    /** Information about which Files were added or removed during with this update.
     *
     * NOTE: When a diff contains both added and deleted files, this indicates a
     * name-conflict occurred — i.e. one of the added files has a name that
     * existed in the old file list.
     * In such cases the deletion is more implicit than explicit, and depending
     * on the circumstances, you MIGHT wish to either warn the user, rename
     * one of the files, instead of overwriting/deleting the older file, etc.
     */
    diff: { deleted?: Array<File>; added?: Array<File> }
  ) => void;
  onFilesRejected?: (rejectedFiles: Array<File>) => void;
  name?: string;
  value?: ReadonlyArray<File>;

  /** @deprecated Use props `multiple`, `accept` instead  (Will be removed in v0.11) */
  dropzoneProps?: { accept?: string; multiple?: boolean };
};
// // Do we need more props from this type?
// & Omit<JSX.IntrinsicElements['input'], 'name' | 'value'>

type FileInputWrapper = {
  readonly onFilesUpdated: Event;
} & HTMLDivElement;

const arrayToFileList = (arr: Array<File>): FileList => {
  const fileList = new DataTransfer();
  arr.forEach((item) => {
    fileList.items.add(item);
  });
  return fileList.files;
};

export const FileInput = (props: FileInputProps) => {
  const lang = props.lang || DEFAULT_LANG;
  const {
    dropzoneProps, // eslint-disable-line deprecation/deprecation
    multiple = props.dropzoneProps?.multiple ?? true, // eslint-disable-line deprecation/deprecation
    accept = props.dropzoneProps?.accept, // eslint-disable-line deprecation/deprecation
    dropzoneText,

    removeFileText = defaultRemoveFileText[lang] || defaultRemoveFileText[DEFAULT_LANG],
    FileList = DefaultFileList,
    onFilesUpdated = () => undefined,
    onFilesRejected,
    showFileSize,
    showImagePreviews,

    value = [],
    fieldWrapperProps,
    ...inputElementProps
  } = groupFormFieldWrapperProps(props);

  const domid = useDomid(props.id);
  const fileInputWrapper = useRef<FileInputWrapper>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const files = value as Array<CustomFile>;
  const [isHover, setIsHover] = useState(false);

  const { getRootProps, getInputProps, isDragReject, inputRef } = useDropzone({
    onDrop: (acceptedFiles: Array<File>) => {
      acceptedFiles = acceptedFiles.map((file) => {
        addPreview(file as CustomFile);
        return file;
      });
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      addFiles(acceptedFiles);
      setIsHover(false);
    },
    onDropRejected: onFilesRejected || defaultOnFilesRejected,
    onDragEnter: () => {
      // 'dragLeave' always fires right after 'dragEnter', use 'dragOver' instead
      // console.log('enter');
      // setIsHover(true);
    },
    onDragLeave: () => {
      // console.log('leave');
      setIsHover(false);
    },
    onDragOver: () => {
      // TODO: add error icon? 'isDragReject' gives unstable results
      // console.log(isDragReject);
      setIsHover(true);
    },
    multiple,
    accept,
  });

  // Synchronoyusly add previews on incoming files
  // (NOTE: `addPreview` ignores files that already have preview.)
  files.forEach(addPreview);

  useEffect(() => {
    if (fileInput.current) {
      fileInput.current.files = arrayToFileList(files);
    }
    return () => {
      // Make sure to revoke the data uris on unmount to avoid memory leaks
      files.forEach(releasePreview);
    };
  }, [files]);

  const removeFile = (removeTarget: string | File): void => {
    const deleted: Array<File> = [];
    const targetName =
      typeof removeTarget !== 'string' ? removeTarget.name : removeTarget;

    const fileList = files.filter((file) => {
      if (file.name !== targetName) {
        return true;
      }
      deleted.push(file);
      releasePreview(file);
      return false;
    });
    if (fileInput.current) {
      fileInput.current.files = arrayToFileList(fileList);
    }
    onFilesUpdated(fileList, { deleted });
  };

  const addFiles = (added: Array<File>): void => {
    const { fileList, diff } = getFileListUpdate(files, added, !multiple);
    if (fileInput.current) {
      fileInput.current.files = arrayToFileList(fileList);
    }
    if (inputRef.current) {
      // Empty on every add
      inputRef.current.files = arrayToFileList([]);
    }
    onFilesUpdated(fileList, diff);
  };

  return (
    <FormField
      extraClassName={modifiedClass('FileInput', [multiple && 'multi'])}
      {...fieldWrapperProps}
      id={`${domid}-fake`}
      LabelTag="h4"
      renderInput={(className, inputProps /* , addFocusProps */) => {
        return (
          <div className={className.control} ref={fileInputWrapper}>
            {
              // Explicitly skip rendering of input element if no
              // name prop is provided. This is implicitly what the
              // browser does on form submit.
              // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name
              // In such cases we assume the application controls the upload/submit
              // behavior separately outside of this component.
              inputElementProps.name ? (
                <input
                  className="FileInput__input"
                  name={inputElementProps.name}
                  id={domid}
                  ref={fileInput}
                  type="file"
                  style={{ display: 'none' }}
                  multiple={multiple || undefined}
                  required={inputProps.required} // ??? Bad idea ?? Scream test!!
                />
              ) : null
            }
            <input
              // fake input exclusively used to capture clicks and file drops.
              // it's contents are wiped on every "add" action.
              className="FileInput__input--fake"
              {...getInputProps()}
              tabIndex={undefined}
              style={undefined}
              multiple={multiple || undefined}
              {...inputProps}
              required={undefined}
            />{' '}
            <div
              className={modifiedClass('FileInput__dropzone', [isHover && 'highlight'])}
              {...getRootProps({ isDragReject })}
              tabIndex={undefined}
            >
              <p className="FileInput__droptext">{dropzoneText}</p>
            </div>
            {FileList && (
              <FileList
                {...{
                  files,
                  showFileSize,
                  showImagePreviews,
                  removeFileText,
                  removeFile,
                  formatBytes,
                }}
              />
            )}
          </div>
        );
      }}
    />
  );
};

export default FileInput;

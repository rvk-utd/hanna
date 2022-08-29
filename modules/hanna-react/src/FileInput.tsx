import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone'; // https://react-dropzone.js.org/#!/Dropzone
import { useDomid } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import {
  addPreview,
  CustomFile,
  formatBytes,
  getFileListUpdate,
  releasePreview,
} from './FileInput/FileInput.utils';
import FormField, { FormFieldWrappingProps } from './FormField';

export type FileInputProps = {
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
  removeFileText: string;
  showFileSize?: boolean;
  showImagePreviews?: boolean;
  removeFileText: string;
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
  name?: string;
  value?: ReadonlyArray<File>;

  /**
   * @deprecated Use props `multiple`, `accept` instead  (Will be removed in v0.11)
   */
  dropzoneProps?: { accept?: string; multiple?: boolean };
} & FormFieldWrappingProps;
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

const FileInput = (props: FileInputProps) => {
  const {
    className,
    id,
    label,
    hideLabel,
    dropzoneProps = { multiple: true },
    multiple = dropzoneProps.multiple,
    accept,
    dropzoneText,
    removeFileText,
    assistText,
    disabled,
    invalid,
    errorMessage,
    required,
    reqText,
    onFilesUpdated = () => undefined,
    showFileSize,
    showImagePreviews,

    value = [],
    ...inputElementProps
  } = props;

  const domid = useDomid(id);
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
      addFiles(acceptedFiles); // eslint-disable-line
      setIsHover(false);
    },
    onDropRejected: (rejectedFiles: Array<File>) => {
      window.alert(
        'Error:\n' +
          rejectedFiles
            .map((elm) => {
              return elm.name;
            })
            .join(', ')
      );
    },
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

  // Add previews on incoming files
  // (NOTE: `addPreview` ignores files that already have preview.)
  files.forEach(addPreview);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris on unmount to avoid memory leaks
      files.forEach(releasePreview);
    },
    [files]
  );

  const removeFile = (name: string): void => {
    if (fileInput.current) {
      const deleted: Array<File> = [];
      const newFileList = files.filter((file) => {
        if (file.name !== name) {
          return true;
        }
        deleted.push(file);
        releasePreview(file);
        return false;
      });
      fileInput.current.files = arrayToFileList(newFileList);
      onFilesUpdated(newFileList, { deleted });
    }
  };

  const addFiles = (added: Array<File>): void => {
    if (fileInput.current) {
      const { fileList, diff } = getFileListUpdate(files, added, !multiple);
      fileInput.current.files = arrayToFileList(fileList);
      onFilesUpdated(fileList, diff);
    }

    if (inputRef.current) {
      // Empty on every add
      inputRef.current.files = arrayToFileList([]);
    }
  };

  const filesList: Array<JSX.Element> = files.map((file) => (
    <li key={file.name} className="FileInput__file">
      <button
        className="FileInput__file-remove"
        type="button"
        onClick={() => removeFile(file.name)}
        aria-label={removeFileText}
      >
        {removeFileText}
      </button>
      <span className="FileInput__fileinfo">
        {showImagePreviews && file.preview && (
          <>
            <span className="FileInput__preview">
              <img src={file.preview} />
            </span>{' '}
          </>
        )}
        <span className="FileInput__filename">{file.name}</span>
        {showFileSize && (
          <small className="FileInput__filesize"> - ({formatBytes(file.size)})</small>
        )}
      </span>
    </li>
  ));

  return (
    <FormField
      className={getBemClass('FileInput', [multiple && 'multi'], className)}
      label={label}
      id={domid + '-fake'}
      LabelTag="h4"
      assistText={assistText}
      hideLabel={hideLabel}
      disabled={disabled}
      invalid={invalid}
      errorMessage={errorMessage}
      required={required}
      reqText={reqText}
      renderInput={(className, inputProps /* , addFocusProps */) => {
        return (
          <div className={className.control} ref={fileInputWrapper}>
            <input
              className="FileInput__input"
              name={inputElementProps.name}
              id={domid}
              ref={fileInput}
              type="file"
              style={{ display: 'none' }}
              multiple={multiple || undefined}
              required={inputProps.required} // ??? Bad idea ?? Scream test!!
            />{' '}
            <input
              className="FileInput__input--fake"
              {...getInputProps()}
              tabIndex={undefined}
              style={undefined}
              multiple={multiple || undefined}
              {...inputProps}
              required={undefined}
            />{' '}
            <div
              className={getBemClass('FileInput__dropzone', [isHover && 'highlight'])}
              {...getRootProps({ isDragReject })}
              tabIndex={undefined}
            >
              <p className="FileInput__droptext">{dropzoneText}</p>
            </div>
            {filesList.length ? <ul className="FileInput__filelist">{filesList}</ul> : ''}
          </div>
        );
      }}
    />
  );
};

export default FileInput;

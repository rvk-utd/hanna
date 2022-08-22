import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone'; // https://react-dropzone.js.org/#!/Dropzone
import { useDomid } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import FormField, { FormFieldWrappingProps } from './FormField';

type CustomFile = { preview?: string } & File;

type dropzonePropsProps = {
  accept?: string; // 'image/*'
  multiple?: boolean;
};
export type FileInputProps = {
  dropzoneProps: dropzonePropsProps;
  dropzoneText: string | JSX.Element;
  showFileSize?: boolean;
  showImagePreviews?: boolean;
  removeFileText: string;
  onFilesUpdated?: (
    files: Array<File>,
    diff: { deleted?: Array<File>; added?: Array<File> }
  ) => void;
  name?: string;
  value?: ReadonlyArray<File>;
} & FormFieldWrappingProps;
// // Do we need more props from this type?
// & Omit<JSX.IntrinsicElements['input'], 'name' | 'value'>

type FileInputWrapper = {
  readonly onFilesUpdated: Event;
} & HTMLDivElement;

/**
 * Attaches a `preview` prop to file objects that don't already have a `preview` key defined
 *
 * The preview's value is either a data URI (for image-type files) or `undefined`
 */
const addPreview = (file: CustomFile) => {
  if (!('preview' in file)) {
    file.preview = file.type.includes('image/') ? URL.createObjectURL(file) : undefined;
  }
};

/**
 * Revokes `preview` data URIs to avoid memory leaks
 *
 * (See: https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
 */
const releasePreview = (file: CustomFile) => {
  file.preview && URL.revokeObjectURL(file.preview);
  delete file.preview;
};

const arrayToFileList = (arr: Array<File>) => {
  const fileList = new DataTransfer();
  arr.forEach((item) => {
    fileList.items.add(item);
  });
  return fileList.files;
};

const dedupeFilesArray = (files: Array<File>) => {
  const newArray: Array<File> = [];
  const found: Record<string, true> = {};
  files.forEach((file) => {
    if (!(file.name in found)) {
      newArray.push(file);
      found[file.name] = true;
    } else {
      releasePreview(file);
    }
  });
  return newArray;
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

const FileInput = (props: FileInputProps) => {
  const {
    className,
    id,
    label,
    hideLabel,
    dropzoneProps = { multiple: true },
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
    ...dropzoneProps,
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
      const deleted: Array<File> = [];
      const retained: Array<File> = [];
      const oldFiles = dropzoneProps.multiple ? files : [];
      oldFiles.forEach((oldFile) => {
        if (added.find(({ name }) => name === oldFile.name)) {
          deleted.push(oldFile);
        } else {
          retained.push(oldFile);
        }
      });
      const newFileList = retained.concat(added);
      fileInput.current.files = arrayToFileList(newFileList);
      const diff = deleted.length ? { added, deleted } : { added };
      onFilesUpdated(newFileList, diff);
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
      className={getBemClass('FileInput', [dropzoneProps.multiple && 'multi'], className)}
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
              multiple={dropzoneProps.multiple || undefined}
              required={inputProps.required} // ??? Bad idea ?? Scream test!!
            />{' '}
            <input
              className="FileInput__input--fake"
              {...getInputProps()}
              tabIndex={undefined}
              style={undefined}
              multiple={dropzoneProps.multiple || undefined}
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

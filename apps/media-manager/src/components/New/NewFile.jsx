/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FormattedMessage } from 'react-intl';
import { cardSize } from '../../constants/object';
import styles from './New.module.scss';
import { iconFromExtension } from '../../utils/file';
import { decodeKey, encodeKey, getFileExtension } from '../../utils/path';
import FileMeta from '../Object/FileMeta';
import { uncommittedState, unsortedState } from '../../recoil/objects';
import { createPhantomObject } from '../../utils/objects';

const NewFile = () => {
  const { path } = useParams();
  const [file, setFile] = React.useState(null);
  const [uncommittedObjects, setUncommittedObjects] = useRecoilState(uncommittedState);
  const [unsortedObjects, setUnsortedObjects] = useRecoilState(unsortedState);

  const safeName = React.useMemo(
    () => (
      file === null
        ? null
        : file.name.replaceAll(/((?![\d.A-z-]).)/g, '')
    ),
    [file]
  );

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({ onDrop, maxFiles: 1 });

  const onUpload = () => {
    const key = `${decodeKey(path)}${safeName}`;
    const id = encodeKey(key);

    setUncommittedObjects([
      ...uncommittedObjects,
      { path: key, file },
    ]);
    setUnsortedObjects([
      ...unsortedObjects,
      key,
    ]);

    createPhantomObject({
      id,
      key,
      size: `${file.size}`,
    });

    setFile(null);
  };

  const onClear = (event) => {
    event.stopPropagation();
    setFile(null);
  };

  return (
    <div className={cardSize}>
      <div className={`${styles.new} ${styles.newFile} d-flex flex-column p-3`}>
        <div
          className={`${styles.drop} ${isDragAccept && styles.accept} flex-grow-1 p-3 d-flex flex-column`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className={`${styles.clear} d-flex w-100 justify-content-end`}>
            { file !== null && (
              <Button
                variant="secondary"
                className={styles.clearButton}
                onClick={onClear}
              >
                <Icon icon={faTimesCircle} />
              </Button>
            )}
          </div>
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted">
            {
              file === null
                ? (
                  <React.Fragment>
                    <Icon
                      className="m-4"
                      icon={faUpload}
                      size="2x"
                    />
                    <small className="text-center d-sm-none">
                      <FormattedMessage id="uploadMobile" />
                    </small>
                    <small className="text-center d-none d-sm-block">
                      <FormattedMessage id="uploadDesktop" />
                    </small>
                  </React.Fragment>
                )
                : (
                  <React.Fragment>
                    <Icon
                      className="mb-4"
                      icon={iconFromExtension(getFileExtension(safeName))}
                      size="2x"
                    />
                    <p className="font-weight-bolder text-center text-break">{safeName}</p>
                    <FileMeta size={`${file.size}`} />
                  </React.Fragment>
                )
            }
          </div>
        </div>
        <div>
          <Button
            variant="primary"
            className="d-block w-100 mt-3"
            disabled={file === null}
            onClick={onUpload}
          >
            <FormattedMessage id="uploadButton" />
          </Button>
        </div>
        <small className={`${styles.publicWarning} text-center text-muted mt-1`}>
          <FormattedMessage id="publicWarning" />
        </small>
      </div>
    </div>
  );
};

export default NewFile;

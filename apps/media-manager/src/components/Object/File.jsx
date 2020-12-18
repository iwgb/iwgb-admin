/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import isImage from 'is-image';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getFileExtension, getLongUrl } from '../../utils/path';
import { iconFromExtension } from '../../utils/file';
import { cardSize } from '../../constants/object';
import styles from './Object.module.scss';
import { objectProps } from '../../shapes/objectShape';
import FileCardBody from './FileCardBody/FileCardBody';
import { uncommittedState } from '../../recoil/objects';
import http from '../../axios';
import s3 from '../../utils/s3';
import { errorState } from '../../recoil/error';

const INITIAL_PROGRESS = 20;

const File = ({
  id, path, size, lastModified, refetchObjects,
}) => {
  const [progress, setProgress] = React.useState(0);
  const [uncommittedObjects, setUncommittedObjects] = useRecoilState(uncommittedState);
  const setError = useSetRecoilState(errorState);
  const extension = getFileExtension(path);
  const uncommittedFile = uncommittedObjects.find(({ path: needle }) => needle === path);
  const isUncommitted = uncommittedFile !== undefined;
  const { file = null } = uncommittedFile || {};

  const onProgress = ({ loaded, total }) => {
    setProgress(((70 / total) * loaded) + INITIAL_PROGRESS);
  };

  React.useEffect(() => {
    if (isUncommitted) {
      const { type } = file;
      (async () => {
        setProgress(10);

        try {
          const { data: { url } } = await http.post('/getSignedUrl', { key: path, mime: type });
          setProgress(20);
          await s3.upload(url, file, onProgress);
          await refetchObjects();
        } catch {
          setError({ message: 'error.upload' });
        }

        setUncommittedObjects(
          uncommittedObjects.filter(({ path: needle }) => needle !== path)
        );
        setProgress(0);
      })();
    }
  }, []);

  return (
    <a
      href={getLongUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardSize} ${styles.cardLink} ${isUncommitted && 'disabled'}`}
    >
      <Card className={`${styles.card} ${styles.file} d-flex flex-column`}>
        {
          !isUncommitted && isImage(path)
            ? (
              <div
                className={`flex-grow-1 ${styles.cardBorder} ${styles.image}`}
                style={{ backgroundImage: `url(${getLongUrl(path)})` }}
              />
            )
            : (
              <div className={`${styles.cardBorder} flex-grow-1 bg-secondary text-white d-flex justify-content-center align-items-center`}>
                <div className="d-flex align-items-center">
                  <Icon
                    icon={iconFromExtension(extension)}
                    size="2x"
                  />
                  <p className="font-weight-bolder m-0 ml-2">{extension.toUpperCase()}</p>
                </div>
              </div>
            )
        }
        {progress > 0 && (
          <div className={styles.progress}>
            <div
              className={`${styles.bar} h-100 bg-primary`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <FileCardBody
          id={id}
          className={progress > 0 ? styles.hideProgress : ''}
          path={path}
          size={size}
          lastModified={lastModified}
          isUncommitted={isUncommitted}
        />
      </Card>
    </a>
  );
};

File.propTypes = {
  ...objectProps,
  refetchObjects: PropTypes.func.isRequired,
};

export default File;

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { encodeKey, getYoungestDirectory } from '../../utils/path';
import styles from './Object.module.scss';
import { cardSize } from '../../constants/object';
import http from '../../axios';
import s3 from '../../utils/s3';
import { uncommittedState, unsortedState } from '../../recoil/objects';
import { errorState } from '../../recoil/error';

const Folder = ({ path, refetchObjects }) => {
  const [uncommittedObjects, setUncommittedObjects] = useRecoilState(uncommittedState);
  const setUnsortedObjects = useSetRecoilState(unsortedState);
  const setError = useSetRecoilState(errorState);
  const isUncommitted = uncommittedObjects.some(({ path: needle }) => needle === path);

  React.useEffect(() => {
    if (isUncommitted) {
      (async () => {
        try {
          const { data: { url } } = await http.post('/getSignedUrl', { key: path });
          await s3.upload(url);
          await refetchObjects();
        } catch {
          setError({ message: 'error.upload' });
        }

        setUncommittedObjects(
          uncommittedObjects.filter(({ path: needle }) => needle !== path)
        );
      })();
    }
  }, []);

  const onNavigate = () => {
    setUnsortedObjects([]);
  };

  return (
    <Link
      to={`/${encodeKey(path)}`}
      className={`${cardSize} ${styles.cardLink} ${isUncommitted && 'disabled'}`}
      onClick={onNavigate}
    >
      <Card className={`${styles.card} d-flex flex-row align-items-center justify-content-between p-3`}>
        <div className={`d-flex align-items-center ${isUncommitted && 'text-muted'}`}>
          <Icon icon={faFolder} />
          <p className="font-weight-bolder m-0 ml-2">{getYoungestDirectory(path)}</p>
        </div>
        {isUncommitted && (
          <Spinner
            animation="border"
            size="sm"
          />
        )}
      </Card>
    </Link>
  );
};

Folder.propTypes = {
  path: PropTypes.string.isRequired,
  refetchObjects: PropTypes.func.isRequired,
};

export default Folder;

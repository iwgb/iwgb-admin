import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useIntl } from 'react-intl';
import { cardSize } from '../../constants/object';
import styles from './New.module.scss';
import { decodeKey, encodeKey } from '../../utils/path';
import { createPhantomObject } from '../../utils/objects';
import { uncommittedState, unsortedState } from '../../recoil/objects';

const NewFolder = () => {
  const { path } = useParams();
  const { formatMessage } = useIntl();
  const [newFolder, setNewFolder] = React.useState('');
  const [uncommittedObjects, setUncommittedObjects] = useRecoilState(uncommittedState);
  const [unsortedObjects, setUnsortedObjects] = useRecoilState(unsortedState);

  const onChange = ({ target: { value } }) => {
    if (value.match(/^[\dA-z-]*$/)) {
      setNewFolder(value);
    }
  };

  const onSubmit = async () => {
    const key = `${decodeKey(path)}${newFolder}/`;
    const id = encodeKey(key);

    setUncommittedObjects([
      ...uncommittedObjects,
      { path: key },
    ]);
    setUnsortedObjects([
      ...unsortedObjects,
      key,
    ]);

    createPhantomObject({
      id,
      key,
      size: '0',
    });
    setNewFolder('');
  };

  return (
    <div className={cardSize}>
      <div className={`${styles.new} ${styles.newFolder} px-3 d-flex justify-content-between`}>
        <input
          className={`${styles.newFolderInput} w-100`}
          placeholder={formatMessage({ id: 'newFolder' })}
          value={newFolder}
          onChange={onChange}
        />
        <Button
          className="ml-2"
          variant="primary"
          size="sm"
          disabled={newFolder.length === 0}
          onClick={onSubmit}
        >
          <Icon
            icon={faPlus}
            fixedWidth={true}
          />
        </Button>
      </div>
    </div>
  );
};

export default NewFolder;

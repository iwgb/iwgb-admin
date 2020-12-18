/*
  eslint-disable
  jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { FormattedMessage } from 'react-intl';
import styles from './FileMenuDeleteItem.module.scss';
import Objects from '../../../../gql/objects';
import apollo from '../../../../apollo';
import { uncommittedState } from '../../../../recoil/objects';
import { errorState } from '../../../../recoil/error';

const FileMenuDeleteItem = ({ objectId, path, onClick }) => {
  const [deleteObject] = useMutation(Objects.destroy);
  const [confirmTimer, setConfirmTimer] = React.useState(0);
  const [uncommittedObjects, setUncommittedObjects] = useRecoilState(uncommittedState);
  const setError = useSetRecoilState(errorState);
  const isConfirming = confirmTimer !== 0;

  const onDelete = async (event) => {
    event.preventDefault();

    if (isConfirming) {
      onClick(event);

      setUncommittedObjects([
        ...uncommittedObjects,
        { path },
      ]);

      try {
        await deleteObject({ variables: { id: objectId } });
      } catch {
        setError({ message: 'error.delete' });
      }

      setUncommittedObjects(
        uncommittedObjects.filter(({ path: needle }) => needle !== path)
      );

      apollo.writeQuery({
        query: Objects.list,
        data: {
          objects: apollo.readQuery({ query: Objects.list })
            .objects
            .filter(({ id }) => id !== objectId),
        },
      });
      return;
    }

    setConfirmTimer(
      window.setTimeout(
        () => setConfirmTimer(0),
        2000
      )
    );
  };

  return (
    <a
      className={`${styles.delete} dropdown-item`}
      onClick={onDelete}
      role="button"
    >
      <Icon
        icon={isConfirming ? faQuestionCircle : faTrash}
        fixedWidth={true}
      />
      <span className="ml-3">
        {
          isConfirming
            ? <FormattedMessage id="confirmDelete" />
            : <FormattedMessage id="delete" />
        }
      </span>
    </a>
  );
};

FileMenuDeleteItem.propTypes = {
  objectId: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FileMenuDeleteItem;

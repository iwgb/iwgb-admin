import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestionCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import styles from './SorterResultActions.module.scss';
import SorterResults from '../../../gql/sorterResults';
import isWorkingState from '../../../recoil/isWorkingState';

const SorterResultActions = ({
  id, canSave, onSave, isAdded, removeFromAdded,
}) => {
  const [confirmTimer, setConfirmTimer] = useState(0);
  const setIsWorking = useSetRecoilState(isWorkingState);

  const [deleteSorterResult] = useMutation(SorterResults.remove, {
    update: (cache) => {
      cache.writeQuery({
        query: SorterResults.getAll,
        data: {
          sorterResults: cache
            .readQuery({ query: SorterResults.getAll })
            .sorterResults
            .filter(({ identifier }) => identifier !== id),
        },
      });
    },
  });

  const onDeleteClick = () => {
    if (isAdded) {
      removeFromAdded();
      return;
    }

    if (confirmTimer !== 0) {
      window.clearTimeout(confirmTimer);
      setConfirmTimer(0);
      setIsWorking(true);

      deleteSorterResult({ variables: { id } })
        .catch(() => toast('Error saving your changes'))
        .finally(() => setIsWorking(false));
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
    <React.Fragment>
      {canSave && (
        <Button
          id={`${id}-save`}
          color="success"
          className={`${styles.iconButton} ml-2 d-flex align-items-center`}
          onClick={onSave}
        >
          <Icon
            className="mx-2"
            icon={faCheck}
            fixedWidth={true}
          />
        </Button>
      )}
      <Button
        color="danger"
        className={`${styles.iconButton} ml-2 d-flex align-items-center`}
        onClick={onDeleteClick}
      >
        <Icon
          className="mx-2"
          icon={confirmTimer === 0 ? faTrash : faQuestionCircle}
          fixedWidth={true}
        />
      </Button>
    </React.Fragment>
  );
};

SorterResultActions.propTypes = {
  id: PropTypes.string.isRequired,
  canSave: PropTypes.bool,
  onSave: PropTypes.func,
  isAdded: PropTypes.bool,
  removeFromAdded: PropTypes.func,
};

SorterResultActions.defaultProps = {
  canSave: false,
  onSave: () => {},
  isAdded: false,
  removeFromAdded: () => {},
};

export default SorterResultActions;

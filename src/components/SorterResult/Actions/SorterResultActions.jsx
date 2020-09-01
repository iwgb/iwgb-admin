import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestionCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import styles from './SorterResultActions.module.scss';
import SorterResults from '../../../service/sorterResults.service';

const SorterResultActions = ({ id, canSave, onSave }) => {
  const [confirmTimer, setConfirmTimer] = useState(0);
  const [deleteSorterResult] = useMutation(SorterResults.remove);

  const onDeleteClick = () => {
    if (confirmTimer !== 0) {
      window.clearTimeout(confirmTimer);
      setConfirmTimer(0);

      deleteSorterResult({ variables: { id } })
        .catch(() => {
          toast('Error saving your changes');
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
};

SorterResultActions.defaultProps = {
  canSave: false,
  onSave: () => {},
};

export default SorterResultActions;

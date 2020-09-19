import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import usePrevious from '@rooks/use-previous';
import isWorkingState from '../../recoil/isWorkingState';
import ProvisionAction from './ProvisionAction/ProvisionAction';

const SorterResultListActions = ({ onAdd, isAddEnabled }) => {
  const [loadingTimeout, setLoadingTimeout] = useState(0);
  const isWorking = useRecoilValue(isWorkingState);
  const prevWorking = usePrevious(isWorking);

  const isConfirming = loadingTimeout > 0;

  useEffect(() => {
    if (
      isWorking === false
      && prevWorking === true
    ) {
      window.clearTimeout(loadingTimeout);
      setLoadingTimeout(window.setTimeout(
        () => setLoadingTimeout(0),
        2000
      ));
    }
  }, [isWorking]);

  return (
    <div className="d-flex align-items-center flex-row-reverse flex-sm-row">
      {isWorking && <Spinner size="sm" />}
      {isConfirming && <Icon icon={faCheck} />}
      <Button
        color="secondary"
        onClick={onAdd}
        disabled={!isAddEnabled}
        className="text-nowrap ml-sm-3 mr-3 mr-sm-0"
      >
        <Icon
          icon={faPlus}
          size="sm"
        />
        <span className="ml-2">Add</span>
      </Button>
      <ProvisionAction />
    </div>
  );
};

SorterResultListActions.propTypes = {
  onAdd: PropTypes.func,
  isAddEnabled: PropTypes.bool,
};

SorterResultListActions.defaultProps = {
  onAdd: () => {},
  isAddEnabled: false,
};

export default SorterResultListActions;

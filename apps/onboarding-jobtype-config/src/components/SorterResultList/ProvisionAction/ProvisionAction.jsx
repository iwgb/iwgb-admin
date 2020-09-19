import React, { useState } from 'react';
import {
  Button, ButtonDropdown, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import Provision from '../../../service/provision.service';
import styles from './ProvisionAction.module.scss';
import isWorkingState from '../../../recoil/isWorkingState';
import unprovisionedChangesState from '../../../recoil/unprovisionedChangesState';

const ProvisionAction = () => {
  const [isProvisionMenuOpen, setProvisionMenuOpen] = useState(false);
  const [isWorking, setWorking] = useRecoilState(isWorkingState);
  const [
    areUnprovisionedChanges,
    setUnprovisionedChanges,
  ] = useRecoilState(unprovisionedChangesState);

  const toggleProvisionMenu = () => setProvisionMenuOpen(!isProvisionMenuOpen);

  const onClick = () => {
    setWorking(true);
    Provision.all()
      .then(() => setUnprovisionedChanges(false))
      .catch(() => toast('Provision failed'))
      .finally(() => setWorking(false));
  };

  return (
    <ButtonGroup className="ml-2">
      <Button
        disabled={isWorking || !areUnprovisionedChanges}
        onClick={onClick}
      >Provision
      </Button>
      <ButtonDropdown
        isOpen={isProvisionMenuOpen}
        toggle={toggleProvisionMenu}
      >
        <DropdownToggle
          caret={true}
          className={styles.caret}
        />
        <DropdownMenu right={true}>
          <DropdownItem
            disabled={isWorking}
            onClick={onClick}
          >
            Force re-provision
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </ButtonGroup>
  );
};

export default ProvisionAction;

/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './SorterResultCardHeader.module.scss';
import SorterResultActions from '../Actions/SorterResultActions';

const SorterResultCardHeader = ({
  id, isOpen, onClick, title, canSave, onNameChange, onSave,
}) => {
  const handleNameChange = ({ target: { value } }) => onNameChange(value);

  return (
    <div className="card-header d-flex align-items-center">
      <div
        className={`${styles.iconContainer} pr-3`}
        onClick={onClick}
      >
        <Icon
          className={styles.icon}
          icon={faChevronRight}
          rotation={isOpen ? 90 : 0}
        />
      </div>
      {
        isOpen
          ? (
            <React.Fragment>
              <input
                className="form-control"
                defaultValue={title}
                onChange={handleNameChange}
              />
              <SorterResultActions
                id={id}
                canSave={canSave}
                onSave={onSave}
              />
            </React.Fragment>
          )
          : (
            <span className={styles.name}>
              {title}
            </span>
          )
      }
    </div>
  );
};

SorterResultCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  canSave: PropTypes.bool,
  onNameChange: PropTypes.func,
  onSave: PropTypes.func,
};

SorterResultCardHeader.defaultProps = {
  isOpen: false,
  onClick: () => {},
  canSave: false,
  onNameChange: () => {},
  onSave: () => {},
};

export default SorterResultCardHeader;

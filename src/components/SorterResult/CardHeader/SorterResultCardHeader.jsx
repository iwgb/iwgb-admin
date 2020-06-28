/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faCheck, faChevronRight, faExclamationCircle, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Spinner } from 'reactstrap';
import styles from './SorterResultCardHeader.module.scss';

class SorterResultCardHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmTimer: false,
    };
  }

  onDeleteClick = () => {
    const { confirmTimer } = this.state;
    const { onDelete } = this.props;
    if (confirmTimer !== false) {
      window.clearTimeout(confirmTimer);
      this.setState({ confirmTimer: false });
      onDelete();
    } else {
      this.setState({
        confirmTimer: window.setTimeout(
          () => this.setState({
            confirmTimer: false,
          }),
          2/* s */ * 1000
        ),
      });
    }
  };

  render() {
    const {
      id, isOpen, onClick, title, canSave, onNameChange, onSave, isSaving,
    } = this.props;
    const { confirmTimer } = this.state;
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
                  onChange={onNameChange}
                />
                {canSave && (
                  <Button
                    id={`${id}-save`}
                    color="success"
                    className={`${styles.iconButton} ml-2 d-flex align-items-center`}
                    onClick={onSave}
                    disabled={isSaving}
                  >
                    {
                      isSaving
                        ? (
                          <Spinner
                            className="mx-2"
                            size="sm"
                          />
                        )
                        : (
                          <Icon
                            className="mx-2"
                            icon={faCheck}
                            fixedWidth={true}
                          />
                        )
                    }
                  </Button>
                )}
                <Button
                  color="danger"
                  className={`${styles.iconButton} ml-2 d-flex align-items-center`}
                  onClick={this.onDeleteClick}
                >
                  <Icon
                    className="mx-2"
                    icon={confirmTimer === false ? faTrash : faExclamationCircle}
                    fixedWidth={true}
                  />
                </Button>
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
  }
}

SorterResultCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  canSave: PropTypes.bool,
  onNameChange: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  isSaving: PropTypes.bool,
};

SorterResultCardHeader.defaultProps = {
  isOpen: false,
  onClick: () => {},
  canSave: false,
  onNameChange: () => {},
  onSave: () => {},
  onDelete: () => {},
  isSaving: false,
};

export default SorterResultCardHeader;

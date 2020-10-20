/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { Button, Spinner } from 'reactstrap';
import usePrevious from '@rooks/use-previous';
import styles from './LangpackHeader.module.scss';

const LangpackHeader = ({
  onClick, isOpen, title, isProvisioning, formRef,
}) => {
  const [confirmTimeout, setConfirmTimeout] = useState(0);
  const wasProvisioning = usePrevious(isProvisioning);

  useEffect(() => {
    if (
      isProvisioning === false
      && wasProvisioning === true
    ) {
      window.clearTimeout(confirmTimeout);
      setConfirmTimeout(window.setTimeout(
        () => setConfirmTimeout(0),
        2000
      ));
    }
  }, [isProvisioning]);

  return (
    <div className="card-header px-3 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center mr-3">
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
        <span className="my-2">
          <FormattedMessage id={`langpack.${title}`} />
        </span>
      </div>
      <div className="d-flex align-items-center">
        {isOpen && (
          <React.Fragment>
            {
              confirmTimeout > 0
                ? (
                  <React.Fragment>
                    <Icon icon={faCheck} />
                    <span className="ml-2 mr-3">
                      <FormattedMessage id="status.complete" />
                    </span>
                  </React.Fragment>
                )
                : isProvisioning && (
                  <React.Fragment>
                    <FormattedMessage id="status.provisioning" />
                    <Spinner
                      className="ml-2 mr-3"
                      size="sm"
                    />
                  </React.Fragment>
                )
            }
            <Button
              onClick={() => formRef.current.handleSubmit()}
              disabled={isProvisioning}
            >
              <FormattedMessage id="provisionButton" />
            </Button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

LangpackHeader.propTypes = {
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isProvisioning: PropTypes.bool,
  formRef: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]).isRequired,
};

LangpackHeader.defaultProps = {
  onClick: () => {},
  isOpen: false,
  isProvisioning: false,
};

export default LangpackHeader;

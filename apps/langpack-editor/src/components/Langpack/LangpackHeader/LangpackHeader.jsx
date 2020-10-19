/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import styles from './LangpackHeader.module.scss';

const LangpackHeader = ({ onClick, isOpen, title }) => (
  <div className="card-header px-3 d-flex align-items-center">
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
    <span>
      <FormattedMessage id={`langpack.${title}`} />
    </span>
  </div>
);

LangpackHeader.propTypes = {
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

LangpackHeader.defaultProps = {
  onClick: () => {},
  isOpen: false,
};

export default LangpackHeader;

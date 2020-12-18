import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './FileMenuCopyItem.module.scss';

const FileMenuCopyItem = ({ copyText, children }) => (
  <Dropdown.Item className={`${styles.copyItem} p-0`}>
    <Clipboard
      component="span"
      data-clipboard-text={copyText}
    >
      <div className="d-flex align-items-center">
        <Icon
          icon={faCopy}
          fixedWidth={true}
        />
        <span className="ml-3">
          {children}
        </span>
      </div>
    </Clipboard>
  </Dropdown.Item>
);

FileMenuCopyItem.propTypes = {
  copyText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FileMenuCopyItem;

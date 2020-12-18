import React from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { getFileName, getLongUrl, getShortUrl } from '../../../utils/path';
import { objectProps } from '../../../shapes/objectShape';
import FileMenuToggle from './FileMenuToggle';
import FileMenuCopyItem from './FileMenuCopyItem/FileMenuCopyItem';
import FileMenuDeleteItem from './FileMenuDeleteItem/FileMenuDeleteItem';
import FileMeta from '../FileMeta';

const FileCardBody = ({
  id, path, lastModified, size, isUncommitted, className,
}) => (
  <Card.Body className={`${className} flex-grow-0 d-flex justify-content-between`}>
    <div>
      <p className={`font-weight-bolder m-0 text-break ${isUncommitted && 'text-muted'}`}>{getFileName(path)}</p>
      <FileMeta
        lastModified={lastModified}
        size={size}
      />
    </div>
    <div className="d-flex align-items-center ml-2">
      {
        isUncommitted
          ? (
            <Spinner
              className="ml-3 mr-2"
              animation="border"
              size="sm"
            />
          )
          : (
            <Dropdown>
              <Dropdown.Toggle
                id={`${id}_menu`}
                as={FileMenuToggle}
              />
              <Dropdown.Menu>
                <FileMenuCopyItem copyText={getLongUrl(path)}>
                  <FormattedMessage id="copyLink" />
                </FileMenuCopyItem>
                <FileMenuCopyItem copyText={getShortUrl(path)}>
                  <FormattedMessage id="copyShortlink" />
                </FileMenuCopyItem>
                <Dropdown.Divider />
                <Dropdown.Item
                  as={FileMenuDeleteItem}
                  objectId={id}
                  path={path}
                />
              </Dropdown.Menu>
            </Dropdown>
          )
      }
    </div>
  </Card.Body>
);

FileCardBody.propTypes = {
  ...objectProps,
  className: PropTypes.string,
  isUncommitted: PropTypes.bool,
};

FileCardBody.defaultProps = {
  className: '',
  isUncommitted: false,
};

export default FileCardBody;

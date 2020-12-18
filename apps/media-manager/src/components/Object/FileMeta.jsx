import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';
import { useRecoilValue } from 'recoil';
import { getTimestamp } from '../../utils/file';
import { localeState } from '../../recoil/locale';

const FileMeta = ({ size, lastModified }) => {
  const locale = useRecoilValue(localeState);
  return (
    <small className="text-muted">
      {lastModified && (
        <React.Fragment>
          <span className="text-nowrap">{getTimestamp(lastModified, locale)}</span>
          <span> · </span>
        </React.Fragment>
      )}
      <span className="text-nowrap">{filesize(size, { round: 0 })}</span>
    </small>
  );
};

FileMeta.propTypes = {
  size: PropTypes.string.isRequired,
  lastModified: PropTypes.string,
};

FileMeta.defaultProps = {
  lastModified: '',
};

export default FileMeta;

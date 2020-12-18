import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useRecoilValue } from 'recoil';
import { errorState } from '../../recoil/error';

const ObjectListLoadFailed = ({ messageId }) => {
  const { message: stateMessageId } = useRecoilValue(errorState);

  const displayMessageId = messageId || stateMessageId || 'error.default';

  return (
    <Alert variant="danger">
      <span className="align-middle">
        <FormattedMessage id={displayMessageId} />
      </span>
      <Button
        variant="link"
        className="pl-1"
        onClick={() => {
          window.location.reload();
          return false;
        }}
      >
        <FormattedMessage id="refresh" />
      </Button>
    </Alert>
  );
};

ObjectListLoadFailed.propTypes = {
  messageId: PropTypes.string,
};

ObjectListLoadFailed.defaultProps = {
  messageId: '',
};

export default ObjectListLoadFailed;

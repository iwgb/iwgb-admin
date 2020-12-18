import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const FileMenuToggle = ({ onClick }, ref) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <Button
      ref={ref}
      variant="light"
      onClick={handleClick}
    >
      <Icon icon={faEllipsisV} />
    </Button>
  );
};

FileMenuToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.forwardRef(FileMenuToggle);

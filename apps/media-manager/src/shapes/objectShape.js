import PropTypes from 'prop-types';

export const objectProps = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  lastModified: PropTypes.string,
  size: PropTypes.string.isRequired,
};

export default PropTypes.shape({
  id: objectProps.id,
  key: objectProps.path,
  lastModified: objectProps.lastModified,
  size: objectProps.size,
});

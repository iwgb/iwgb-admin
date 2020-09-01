import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { Spinner } from 'reactstrap';

const Select = ({
  controlId, label, options, onChange, value, labelKey, isSorting,
}) => {
  const handleChange = ({ target: { value: newValue } }) => onChange(newValue);

  return (
    <div className="form-group">
      <label
        htmlFor={controlId}
        className="d-flex align-items-center"
      >
        {label}
        {options.length === 0 && (
          <Spinner
            className="ml-1"
            size="sm"
          />
        )}
      </label>
      <select
        id={controlId}
        className="custom-select"
        onChange={handleChange}
        disabled={options.length === 0}
        value={value}
      >
        {
          (isSorting ? sortBy(options, labelKey) : options)
            .map(({ id, [labelKey]: option }) => (
              <option
                key={id}
                value={id}
              >
                {option}
              </option>
            ))
        }
      </select>
    </div>
  );
};

Select.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func,
  value: PropTypes.string,
  labelKey: PropTypes.string,
  isSorting: PropTypes.bool,
};

Select.defaultProps = {
  options: [],
  value: null,
  onChange: () => {},
  labelKey: 'title',
  isSorting: true,
};

export default Select;

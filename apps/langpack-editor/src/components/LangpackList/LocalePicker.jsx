import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AVAILABLE_LOCALES } from '../../constants/i18n';
import getNativeName from '../../utils/getNativeName';

const LocalePicker = ({
  id, value, onChange, exclude,
}) => (
  <div className="d-flex align-items-center my-2">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label
      className="m-0 text-nowrap mr-2"
      htmlFor={id}
    >
      <FormattedMessage id={id} />
    </label>
    <select
      id={id}
      className="custom-select"
      value={value}
      onChange={onChange}
    >
      {
        AVAILABLE_LOCALES
          .filter((locale) => !exclude.includes(locale))
          .map((localeCode) => (
            <option
              key={localeCode}
              value={localeCode}
            >
              {getNativeName(localeCode)}
            </option>
          ))
      }
    </select>
  </div>
);

LocalePicker.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  exclude: PropTypes.arrayOf(PropTypes.string),
};

LocalePicker.defaultProps = {
  onChange: () => {},
  exclude: [],
};

export default LocalePicker;

/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { Field } from 'formik';
import { DEFAULT_LOCALE } from '../../../constants/i18n';
import getNativeName from '../../../utils/getNativeName';

const LangpackKeyInput = ({ keyName, language }) => {
  const domInput = useRef(null);

  useEffect(() => {
    domInput.current.style.height = `${domInput.current.scrollHeight}px`;
  }, []);

  return (
    <React.Fragment>
      {language !== DEFAULT_LOCALE && (
        <label
          className="sr-only"
          htmlFor={`${keyName}.${language}`}
        >
          {`${keyName} - ${getNativeName(language)}`}
        </label>
      )}
      <div
        className="col-2 d-flex flex-column justify-content-center d-sm-none"
        aria-hidden="true"
      >
        {language}
      </div>
      <Field name={`${keyName}.${language}`}>
        {({ field }) => (
          <div className="col-10 col-sm-4">
            <Input
              id={`${keyName}.${language}`}
              innerRef={domInput}
              className="mx-1 my-2"
              type="textarea"
              {...field}
            />
          </div>
        )}
      </Field>
    </React.Fragment>
  );
};

LangpackKeyInput.propTypes = {
  keyName: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default LangpackKeyInput;

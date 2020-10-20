import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { DEFAULT_LOCALE } from '../../../constants/i18n';
import { secondLanguageState } from '../../../recoil/localeState';
import LangpackKeyInput from '../LangpackKeyInput/LangpackKeyInput';
import styles from './LangpackKey.module.scss';

const LangpackKey = ({ keyName }) => {
  const secondLanguage = useRecoilValue(secondLanguageState);

  return (
    <div className="row border-top">
      <div className="col-2 d-block d-sm-none" />
      <label
        className={`${styles.label} col-10 col-sm-4 d-flex flex-column justify-content-center mt-3 mt-sm-0 mb-0`}
        htmlFor={`${keyName}.${DEFAULT_LOCALE}`}
      >
        {keyName.replace('_', '.')}
      </label>
      <LangpackKeyInput
        keyName={keyName}
        language={DEFAULT_LOCALE}
      />
      <LangpackKeyInput
        keyName={keyName}
        language={secondLanguage}
      />
    </div>
  );
};

LangpackKey.propTypes = {
  keyName: PropTypes.string.isRequired,
};

export default LangpackKey;

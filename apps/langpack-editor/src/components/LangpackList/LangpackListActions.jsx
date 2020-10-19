import React from 'react';
import { useRecoilState } from 'recoil';
import { FormattedMessage } from 'react-intl';
import localeState from '../../recoil/localeState';
import { AVAILABLE_LOCALES } from '../../constants/i18n';
import getNativeName from '../../utils/getNativeName';

const LangpackListActions = () => {
  const [locale, setLocale] = useRecoilState(localeState);

  const onChange = ({ target: { value } }) => setLocale(value);

  return (
    <div className="d-flex align-items-center">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="m-0 text-nowrap mr-2"
        htmlFor="locale-picker"
      >
        <FormattedMessage id="header.languageLabel" />
      </label>
      <select
        id="locale-picker"
        className="custom-select"
        value={locale}
        onChange={onChange}
      >
        {AVAILABLE_LOCALES.map((localeCode) => (
          <option
            key={localeCode}
            value={localeCode}
          >
            {getNativeName(localeCode)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LangpackListActions;

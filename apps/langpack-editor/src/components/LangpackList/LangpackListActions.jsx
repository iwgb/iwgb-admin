import React from 'react';
import { useRecoilState } from 'recoil';
import { secondLanguageState, uiLocaleState } from '../../recoil/localeState';
import LocalePicker from './LocalePicker';
import { DEFAULT_LOCALE } from '../../constants/i18n';

const LangpackListActions = () => {
  const [uiLocale, setUiLocale] = useRecoilState(uiLocaleState);
  const [secondLanguage, setSecondLanguage] = useRecoilState(secondLanguageState);

  return (
    <React.Fragment>
      <LocalePicker
        id="header.uiLocalePicker"
        value={uiLocale}
        onChange={({ target: { value } }) => setUiLocale(value)}
      />
      <LocalePicker
        id="header.secondLanguagePicker"
        value={secondLanguage}
        onChange={({ target: { value } }) => setSecondLanguage(value)}
        exclude={[DEFAULT_LOCALE]}
      />
    </React.Fragment>

  );
};

export default LangpackListActions;

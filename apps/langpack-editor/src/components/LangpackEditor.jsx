import React from 'react';
import { useRecoilValue } from 'recoil';
import { IntlProvider } from 'react-intl';
import localeState from '../recoil/localeState';
import messages from '../utils/intl';
import LangpackList from './LangpackList/LangpackList';

const LangpackEditor = () => {
  const locale = useRecoilValue(localeState);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <LangpackList />
    </IntlProvider>
  );
};

export default LangpackEditor;

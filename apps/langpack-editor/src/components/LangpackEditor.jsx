import React from 'react';
import { useRecoilValue } from 'recoil';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import { uiLocaleState } from '../recoil/localeState';
import messages from '../utils/intl';
import LangpackList from './LangpackList/LangpackList';

const LangpackEditor = () => {
  const locale = useRecoilValue(uiLocaleState);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <LangpackList />
      <ToastContainer position="bottom-left" />
    </IntlProvider>
  );
};

export default LangpackEditor;

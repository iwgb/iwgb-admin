import React from 'react';
import { IntlProvider } from 'react-intl';
import { useRecoilValue } from 'recoil';
import Header from './Header/Header';
import ObjectList from './ObjectList/ObjectList';
import { localeState } from '../recoil/locale';
import messages from '../utils/intl';

const MediaManager = () => {
  const locale = useRecoilValue(localeState);
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
    >
      <Header />
      <ObjectList />
    </IntlProvider>
  );
};

export default MediaManager;

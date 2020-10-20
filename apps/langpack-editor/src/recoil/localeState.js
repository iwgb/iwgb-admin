import { atom } from 'recoil';
import { DEFAULT_LOCALE, DEFAULT_SECOND_LANGUAGE } from '../constants/i18n';

export const uiLocaleState = atom({
  key: 'uiLocale',
  default: DEFAULT_LOCALE,
});

export const secondLanguageState = atom({
  key: 'secondLanguage',
  default: DEFAULT_SECOND_LANGUAGE,
});

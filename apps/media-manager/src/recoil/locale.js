import { atom } from 'recoil';
import { DEFAULT_LOCALE } from '../constants/intl';

export const localeState = atom({
  key: 'locale',
  default: DEFAULT_LOCALE,
});

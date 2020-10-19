import { atom } from 'recoil';
import { DEFAULT_LOCALE } from '../constants/i18n';

const localeState = atom({
  key: 'language',
  default: DEFAULT_LOCALE,
});

export default localeState;

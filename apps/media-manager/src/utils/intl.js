import { by639_1 as languages } from 'iso-language-codes';
import en from '../intl/en.json';
import es from '../intl/es.json';

export const getNativeName = (localeCode) => languages[localeCode].nativeName.split(',')[0];

export default { en, es };

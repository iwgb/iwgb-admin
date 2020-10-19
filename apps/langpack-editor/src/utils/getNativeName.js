import { by639_1 as languages } from 'iso-language-codes';

const getNativeName = (localeCode) => languages[localeCode].nativeName.split(',')[0];

export default getNativeName;

import { faFile } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import extensions from '../constants/extensions';

export const iconFromExtension = (extension) => extensions[extension] || faFile;

export const getTimestamp = (timestamp, locale) => DateTime
  .fromISO(timestamp)
  .setLocale(locale)
  .toLocaleString(DateTime.DATETIME_MED);

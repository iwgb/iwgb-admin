import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSetRecoilState } from 'recoil';
import {
  getPathWithoutRoot, getParentDirectory, getYoungestDirectory, decodeKey, encodeKey,
} from '../../utils/path';
import { AVAILABLE_LOCALES } from '../../constants/intl';
import { getNativeName } from '../../utils/intl';
import styles from './Header.module.scss';
import { localeState } from '../../recoil/locale';

const Header = () => {
  const { path: encodedPath } = useParams();
  const history = useHistory();
  const { formatMessage } = useIntl();
  const setLocale = useSetRecoilState(localeState);

  const path = decodeKey(encodedPath);
  const publicKey = getPathWithoutRoot(path);
  const currentDirectory = getYoungestDirectory(publicKey);
  const title = currentDirectory.length === 0
    ? formatMessage({ id: 'defaultDirectory' })
    : currentDirectory;

  const onNavigateBack = () => {
    history.push(`/${encodeKey(`${getParentDirectory(path)}/`)}`);
  };

  const onChangeLanguage = ({ target: { value } }) => {
    setLocale(value);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="row mt-5">
        <div className="col d-flex justify-content-between">
          <div>
            {publicKey !== '' && (
              <Button
                className={`${styles.back} position-relative`}
                onClick={onNavigateBack}
                variant="light"
              >
                <Icon
                  icon={faArrowLeft}
                  size="lg"
                />
              </Button>
            )}
          </div>
          <div className="d-flex align-items-center">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className="sr-only"
              htmlFor="locale-picker"
            >
              <FormattedMessage id="language" />
            </label>
            <select
              id="locale-picker"
              className="custom-select"
              onChange={onChangeLanguage}
            >
              {AVAILABLE_LOCALES.map((locale) => (
                <option
                  key={locale}
                  value={locale}
                >
                  {getNativeName(locale)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <h1 className={`${styles.title} text-break`}>
            {title}
          </h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;

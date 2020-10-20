import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import http from 'axios';
import { toast } from 'react-toastify';
import { CardBody } from 'reactstrap';
import { Form, Formik } from 'formik';
import { useRecoilValue } from 'recoil';
import { FormattedMessage } from 'react-intl';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import api from '../../../utils/axios';
import LangpackKey from '../LangpackKey/LangpackKey';
import { DEFAULT_LOCALE } from '../../../constants/i18n';
import getNativeName from '../../../utils/getNativeName';
import { secondLanguageState } from '../../../recoil/localeState';
import { S3_PRESIGNED_REQUEST_CONFIG } from '../../../constants/api';

const PROCESSED_DEFAULT_LOCALE = 0;
const PROCESSED_SECOND_LANG = 1;

const INTL_KEY_SEPARATOR = '.';
const FORMIK_KEY_SEPARATOR = '_';

const intlToFormikKey = (key) => key.replace(INTL_KEY_SEPARATOR, FORMIK_KEY_SEPARATOR);
const formikToIntlKey = (key) => key.replace(FORMIK_KEY_SEPARATOR, INTL_KEY_SEPARATOR);

const LangpackBody = ({
  name, languages, setProvisioning, formRef,
}) => {
  const [langpack, setLangpack] = useState(null);
  const secondLanguage = useRecoilValue(secondLanguageState);

  useEffect(() => {
    Promise.all(languages.map(({ url }) => http.get(`${url}?t=${Date.now()}`)))
      .then((langpacks) => {
        const parsedLangpack = {};
        const masterLangpackIndex = languages
          .findIndex(({ language }) => language === DEFAULT_LOCALE);
        const masterLangpack = langpacks[masterLangpackIndex];

        Object.keys(masterLangpack.data).forEach((key) => {
          parsedLangpack[intlToFormikKey(key)] = { [DEFAULT_LOCALE]: masterLangpack.data[key] };
        });

        Object.keys(parsedLangpack).forEach((key) => {
          langpacks.forEach(({ data }, i) => {
            if (i !== masterLangpackIndex) {
              parsedLangpack[key][languages[i].language] = data[formikToIntlKey(key)] || '';
            }
          });
        });

        setLangpack(parsedLangpack);
      })
      .catch(() => toast(
        <FormattedMessage
          id="error.langpackLoad"
          values={{ name }}
        />
      ));
  }, [languages, name]);

  const uploadToS3 = ({ data: { uploadUrl } }, data) => http
    .put(uploadUrl, JSON.stringify(data), S3_PRESIGNED_REQUEST_CONFIG);

  const onError = () => {
    setProvisioning(false);
    toast(<FormattedMessage id="error.provision" />);
  };

  const onSubmit = (values) => {
    setProvisioning(true);
    const processedLangpacks = Object.keys(values)
      .reduce((keysByLanguage, key) => ({
        [PROCESSED_DEFAULT_LOCALE]: {
          ...keysByLanguage[PROCESSED_DEFAULT_LOCALE],
          [formikToIntlKey(key)]: values[key][DEFAULT_LOCALE],
        },
        [PROCESSED_SECOND_LANG]: {
          ...keysByLanguage[PROCESSED_SECOND_LANG],
          [formikToIntlKey(key)]: values[key][secondLanguage],
        },
      }), {});

    Promise.all([
      api.get(`/${name}/${DEFAULT_LOCALE}/put`),
      api.get(`/${name}/${secondLanguage}/put`),
    ])
      .then((uploadUrls) => {
        Promise.all(uploadUrls.map((response, i) => uploadToS3(response, processedLangpacks[i])))
          .then(() => setProvisioning(false))
          .catch(onError);
      })
      .catch(onError);
  };

  return (
    <CardBody className="px-3">
      {
        langpack === null
          ? (
            <SkeletonTheme color="#f7f7f7">
              {[...new Array(5)].fill().map(() => (
                <div className="row my-3 my-sm-0">
                  <div className="col-10 offset-2 col-sm-2 offset-sm-0 d-flex flex-column justify-content-center">
                    <Skeleton height="1.5rem" />
                  </div>
                  <div className="col-10 col-sm-4 offset-2 my-1">
                    <Skeleton height="3rem" />
                  </div>
                  <div className="col-10 offset-2 col-sm-4 offset-sm-0 my-1">
                    <Skeleton height="3rem" />
                  </div>
                </div>
              ))}
            </SkeletonTheme>
          )
          : (
            <Formik
              initialValues={langpack}
              onSubmit={onSubmit}
              innerRef={formRef}
            >
              <Form>
                <div className="row d-none d-sm-flex">
                  <div className="col-sm-4">
                    <h6><FormattedMessage id="keyColumnHeading" /></h6>
                  </div>
                  <div className="col-sm-4">
                    <h6 className="mx-3">{getNativeName(DEFAULT_LOCALE)}</h6>
                  </div>
                  <div className="col-sm-4">
                    <h6 className="mx-3">{getNativeName(secondLanguage)}</h6>
                  </div>
                </div>
                {Object.keys(langpack).map((keyName) => (
                  <LangpackKey keyName={keyName} />
                ))}
              </Form>
            </Formik>
          )
      }
    </CardBody>
  );
};

LangpackBody.propTypes = {
  name: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    language: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  formRef: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]).isRequired,
  setProvisioning: PropTypes.func,
};

LangpackBody.propTypes = {
  setProvisioning: () => {},
};

export default LangpackBody;

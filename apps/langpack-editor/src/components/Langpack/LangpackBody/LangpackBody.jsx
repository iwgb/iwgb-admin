import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import http from 'axios';
import { toast } from 'react-toastify';
import { CardBody, Spinner } from 'reactstrap';

const LangpackBody = ({ name, languages }) => {
  const [langpack, setLangpack] = useState(null);

  useEffect(() => {
    Promise.all(languages.map(({ url }) => http.get(url)))
      .then((langpacks) => {
        const parsedLangpack = {};
        langpacks.forEach(({ data }, i) => {
          const { language } = languages[i];
          Object.keys(data).forEach((key) => {
            parsedLangpack[key] = {
              ...parsedLangpack[key],
              [language]: data[key],
            };
          });
        });
        setLangpack(parsedLangpack);
      })
      .catch(() => toast(`Failed to load ${name}`));
  }, []);

  return (
    <CardBody className="px-3">
      <pre>
        {
          langpack === null
            ? <Spinner size="md" />
            : JSON.stringify(langpack, null, 2)
        }
      </pre>
    </CardBody>
  );
};

LangpackBody.propTypes = {
  name: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    language: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

export default LangpackBody;

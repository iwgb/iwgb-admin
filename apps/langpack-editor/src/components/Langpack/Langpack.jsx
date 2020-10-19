import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'reactstrap';
import SlideDown from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import LangpackHeader from './LangpackHeader/LangpackHeader';
import LangpackBody from './LangpackBody/LangpackBody';

const Langpack = ({ name, languages }) => {
  const [isOpen, setOpen] = useState(false);

  const onHeaderClick = () => setOpen(!isOpen);

  return (
    <Card className="my-2">
      <LangpackHeader
        title={name}
        onClick={onHeaderClick}
        isOpen={isOpen}
      />
      <SlideDown>
        {isOpen && (
          <LangpackBody
            languages={languages}
            name={name}
          />
        )}
      </SlideDown>
    </Card>
  );
};

Langpack.propTypes = {
  name: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    language: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

export default Langpack;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select/Select';

const SelectConditional = ({
  id, question, selectedAnswer, onChange,
}) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (question === undefined) {
      return;
    }

    const newAnswers = (() => {
      switch (question.type || '') {
        case 'multiple_choice':
          return question.properties.choices.map(({ label }) => ({
            id: label,
            title: label,
          }));
        case 'yes_no':
          return [
            {
              id: 'true',
              title: 'Yes',
            },
            {
              id: 'false',
              title: 'No',
            },
          ];
        default:
          return [];
      }
    })();

    setAnswers(newAnswers);

    if (
      !newAnswers
        .map(({ id: answerId }) => answerId)
        .includes(selectedAnswer)
    ) {
      onChange(newAnswers[0].id);
    }
  }, [question]);

  return (
    <Select
      controlId={`${id}-conditional`}
      label="Answer"
      options={answers}
      value={selectedAnswer}
      onChange={onChange}
    />
  );
};

SelectConditional.propTypes = {
  id: PropTypes.string.isRequired,
  selectedAnswer: PropTypes.string,
  onChange: PropTypes.func,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    properties: PropTypes.shape({
      choices: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
      })),
    }),
  }),
};

SelectConditional.defaultProps = {
  selectedAnswer: '',
  onChange: () => {},
  question: undefined,
};

export default SelectConditional;

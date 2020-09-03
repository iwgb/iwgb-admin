import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select/Select';
import JobTypes from '../../service/jobTypes.service';
import SelectConditional from './SelectConditional';

const SelectQuestionAndConditional = ({
  id, form, selectedQuestionId, selectedAnswer, onQuestionChange, onAnswerChange,
}) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions([]);
    if (form !== '') {
      JobTypes.get(form)
        .then(({ data: { fields } }) => {
          setQuestions(fields);
          if (
            !fields
              .map(({ id: fieldId }) => fieldId)
              .includes(selectedQuestionId)
          ) {
            onQuestionChange(fields[0].id);
          }
        });
    }
  }, [form]);

  const question = useMemo(
    () => questions.find(({ id: questionId }) => questionId === selectedQuestionId),
    [questions, selectedQuestionId]
  );

  return (
    <React.Fragment>
      <div className="col-md-4">
        <Select
          controlId={`${id}-question`}
          label="Question"
          options={questions}
          value={selectedQuestionId}
          onChange={onQuestionChange}
          isSorting={false}
        />
      </div>
      <div className="col-md-4">
        <SelectConditional
          id={id}
          question={question}
          selectedAnswer={selectedAnswer}
          onChange={onAnswerChange}
        />
      </div>
    </React.Fragment>
  );
};

SelectQuestionAndConditional.propTypes = {
  id: PropTypes.string.isRequired,
  form: PropTypes.string,
  selectedQuestionId: PropTypes.string,
  selectedAnswer: PropTypes.string,
  onQuestionChange: PropTypes.func,
  onAnswerChange: PropTypes.func,
};

SelectQuestionAndConditional.defaultProps = {
  form: '',
  selectedQuestionId: '',
  selectedAnswer: '',
  onQuestionChange: () => {},
  onAnswerChange: () => {},
};

export default SelectQuestionAndConditional;

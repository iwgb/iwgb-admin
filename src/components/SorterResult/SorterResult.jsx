import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import SlideDown from 'react-slidedown';
import { Card, CardBody } from 'reactstrap';
import { isEqual } from 'lodash';
import { toast } from 'react-toastify';
import SorterResults from '../../gql/sorterResults';
import SorterResultCardHeader from './CardHeader/SorterResultCardHeader';
import Select from '../Select/Select';
import SelectQuestionAndConditional from './SelectQuestionAndConditional';
import 'react-slidedown/lib/slidedown.css';

const SorterResult = ({
  sorterResult, sorterResult: { identifier }, jobTypes, plans,
}) => {
  const [originalState, setOriginalState] = useState({});
  const [isOpen, setOpen] = useState(false);

  const [friendlyName, setFriendlyName] = useState(sorterResult.friendlyName);
  const [form, setForm] = useState(sorterResult.form);
  const [question, setQuestion] = useState(sorterResult.question);
  const [conditional, setConditional] = useState(sorterResult.conditional);
  const [plan, setPlan] = useState(sorterResult.plan);

  const [updateSorterResult] = useMutation(SorterResults.update);

  const onHeaderClick = () => {
    setOpen(!isOpen);
  };

  const currentState = {
    identifier,
    friendlyName,
    form,
    question,
    conditional,
    plan,
  };

  const setOriginalStateWithAllowedKeys = (stateObject) => {
    const filteredStateObject = Object.keys(stateObject)
      .filter((key) => Object.keys(currentState).includes(key))
      .reduce((obj, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = stateObject[key];
        return obj;
      }, {});
    setOriginalState(filteredStateObject);
  };

  useEffect(() => setOriginalStateWithAllowedKeys(sorterResult),
    [sorterResult]);

  const onSave = () => {
    updateSorterResult({
      variables: {
        ...currentState,
        id: identifier,
      },
    })
      .catch(() => toast(`Could not save your changes to ${friendlyName}`));
  };

  const canSave = !isEqual(originalState, currentState);

  return (
    <Card className="my-2">
      <SorterResultCardHeader
        id={identifier}
        title={friendlyName}
        onClick={onHeaderClick}
        isOpen={isOpen}
        onNameChange={setFriendlyName}
        canSave={canSave}
        onSave={onSave}
      />
      <SlideDown>
        {isOpen && (
          <CardBody>
            <form>
              <div className="row">
                <div className="col-md-4">
                  <Select
                    controlId={`${identifier}-form`}
                    label="Form"
                    options={jobTypes}
                    value={form}
                    onChange={setForm}
                  />
                </div>
                <SelectQuestionAndConditional
                  id={identifier}
                  form={form}
                  selectedQuestionId={question}
                  selectedAnswer={conditional}
                  onQuestionChange={setQuestion}
                  onAnswerChange={setConditional}
                />
              </div>
              <div className="row">
                <div className="col">
                  <Select
                    controlId={`${identifier}-plan`}
                    label="Sorts in to plan"
                    options={plans}
                    value={plan}
                    labelKey="Name"
                    onChange={setPlan}
                  />
                </div>
              </div>
            </form>
          </CardBody>
        )}
      </SlideDown>
    </Card>
  );
};

SorterResult.propTypes = {
  sorterResult: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    conditional: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
  }).isRequired,
  jobTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  plans: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
  })),
};

SorterResult.defaultProps = {
  jobTypes: [],
  plans: [],
};

export default SorterResult;

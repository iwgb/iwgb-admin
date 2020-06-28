import React from 'react';
import PropTypes from 'prop-types';
import { clone, isEqual } from 'lodash';
import { Card, CardBody } from 'reactstrap';
import SlideDown from 'react-slidedown';
import Select from '../Select/Select';
import JobTypes from '../../service/jobTypes.service';
import SorterResultCardHeader from './CardHeader/SorterResultCardHeader';
import 'react-slidedown/lib/slidedown.css';

const areChanges = (previous, current) => {
  const trimmedPrevious = clone(previous);
  Object.keys(previous).forEach((key) => {
    if (!Object.keys(current).includes(key)) {
      delete trimmedPrevious[key];
    }
  });
  return !isEqual(trimmedPrevious, current);
};

class SorterResult extends React.Component {
  constructor(props) {
    super(props);

    const {
      sorterResult: {
        friendlyName: initialName,
        form: initialForm,
        question: initialQuestion,
        plan: initialPlan,
        conditional: initialConditional,
      },
    } = this.props;

    this.state = {
      open: false,
      form: initialForm,
      question: initialQuestion,
      conditional: initialConditional,
      plan: initialPlan,
      name: initialName,
      questions: [],
      answers: [],
    };
  }

  componentDidMount() {
    this.updateQuestions();
  }

  updateQuestions = () => {
    const { form } = this.state;
    this.setState({
      questions: [],
      answers: [],
    });
    JobTypes.get(form)
      .then(({ data }) => {
        this.setState(
          { questions: data.fields },
          () => this.updateAnswers()
        );
      });
  };

  updateAnswers = () => {
    const questionDetail = this.getQuestionObject();
    this.setState({
      answers: (() => {
        switch (questionDetail.type || '') {
          case 'multiple_choice':
            return questionDetail.properties.choices.map(({ label }) => ({
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
      })(),
    });
  }

  onSelectForm = ({ target: { value: form } }) => {
    this.setState(
      { form },
      () => this.updateQuestions()
    );
  };

  getQuestionObject = () => {
    const { question, questions } = this.state;
    return questions.filter(({ id }) => id === question)[0] || questions[0];
  };

  onSelectQuestion = ({ target: { value: question } }) => {
    this.setState(
      { question },
      () => this.updateAnswers()
    );
  };

  onSelectConditional = ({ target: { value: conditional } }) => this.setState({ conditional });

  onSelectPlan = ({ target: { value: plan } }) => this.setState({ plan });

  onHeaderClick = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  onNameChange = ({ target: { value: name } }) => this.setState({ name });

  onSaveClick = () => {
    const { onSave } = this.props;
    const {
      form, question, plan, conditional, name,
    } = this.state;
    onSave({
      form,
      question,
      plan,
      conditional,
      friendlyName: name,
    });
  }

  render() {
    const {
      jobTypes,
      plans,
      onDelete,
      isSaving,
      sorterResult: initialValues,
      sorterResult: {
        identifier,
        friendlyName,
      },
    } = this.props;
    const {
      open,
      questions,
      form,
      question,
      plan,
      conditional,
      answers,
      name,
    } = this.state;

    return (
      <Card className="my-2">
        <SorterResultCardHeader
          id={identifier}
          title={friendlyName}
          onNameChange={this.onNameChange}
          onClick={this.onHeaderClick}
          isOpen={open}
          onSave={this.onSaveClick}
          onDelete={onDelete}
          isSaving={isSaving}
          canSave={areChanges(initialValues, {
            form,
            question,
            conditional,
            plan,
            friendlyName: name,
          })}
        />
        <SlideDown transitionOnAppear={false}>
          { open && (
            <CardBody>
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <Select
                      controlId={`${identifier}-form`}
                      label="Form"
                      onChange={this.onSelectForm}
                      options={jobTypes}
                      value={form}
                    />
                  </div>
                  <div className="col-md-4">
                    <Select
                      controlId={`${identifier}-question`}
                      label="Question"
                      options={questions}
                      value={question}
                      onChange={this.onSelectQuestion}
                      isSorting={false}
                    />
                  </div>
                  <div className="col-md-4">
                    <Select
                      controlId={`${identifier}-conditional`}
                      label="Answer"
                      options={answers}
                      value={conditional}
                      isSorting={false}
                      onChange={this.onSelectConditional}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Select
                      controlId={`${identifier}-plan`}
                      label="Sorts in to plan"
                      options={plans}
                      value={plan}
                      labelKey="Name"
                      onChange={this.onSelectPlan}
                    />
                  </div>
                </div>
              </form>
            </CardBody>
          )}
        </SlideDown>
      </Card>
    );
  }
}

SorterResult.propTypes = {
  sorterResult: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    form: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    conditional: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
  }).isRequired,
  jobTypes: PropTypes.arrayOf(PropTypes.shape({})),
  plans: PropTypes.arrayOf(PropTypes.shape({})),
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  isSaving: PropTypes.bool,
};

SorterResult.defaultProps = {
  jobTypes: [],
  plans: [],
  onSave: () => {},
  onDelete: () => {},
  isSaving: false,
};

export default SorterResult;

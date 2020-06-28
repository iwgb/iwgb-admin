import React from 'react';
import SorterResult from '../SorterResult/SorterResult';
import SorterResults from '../../service/sorterResults.service';
import JobTypes from '../../service/jobTypes.service';
import Plans from '../../service/plans.service';

class SorterResultList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sorterResults: [],
      jobTypes: [],
      plans: [],
      saving: '',
    };
  }

  componentDidMount() {
    this.updateSorterResults();
    JobTypes.getAll()
      .then(({ data: { items: jobTypes } }) => this.setState({ jobTypes }));
    Plans.getAll()
      .then(({ data: plans }) => this.setState({ plans }));
  }

  updateSorterResults = () => {
    SorterResults.getAll()
      .then(({ sorterResults }) => this.setState({
        sorterResults,
        saving: '',
      }));
  }

  onSave = (identifier) => ({
    friendlyName,
    form,
    question,
    conditional,
    plan,
  }) => {
    this.setState({ saving: identifier });
    SorterResults.update({
      identifier,
      friendlyName,
      form,
      question,
      conditional,
      plan,
    }).then(() => this.updateSorterResults());
  };

  onDelete = (identifier) => () => {
    const { sorterResults } = this.state;
    SorterResults.remove(identifier)
      .then(() => this.setState({
        sorterResults: sorterResults.filter(
          ({ identifier: sorterResultId }) => sorterResultId !== identifier
        ),
      }));
  };

  render() {
    const {
      sorterResults, jobTypes, plans, saving,
    } = this.state;
    return (
      <div>
        { sorterResults.map((sorterResult) => (
          <span key={sorterResult.identifier}>
            <SorterResult
              sorterResult={sorterResult}
              jobTypes={jobTypes}
              plans={plans}
              onSave={this.onSave(sorterResult.identifier)}
              onDelete={this.onDelete(sorterResult.identifier)}
              isSaving={saving === sorterResult.identifier}
            />
          </span>
        ))}
      </div>
    );
  }
}

export default SorterResultList;

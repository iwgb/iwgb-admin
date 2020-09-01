import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import SorterResults from '../../service/sorterResults.service';
import JobTypes from '../../service/jobTypes.service';
import Plans from '../../service/plans.service';
import SorterResult from '../SorterResult/SorterResult';

const SorterResultList = () => {
  const [plans, setPlans] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    JobTypes.getAll()
      .then(({ data: { items } }) => setJobTypes(items));
    Plans.getAll()
      .then(({ data }) => setPlans(data));
  }, []);

  const { loading, error, data: { sorterResults = [] } = {} } = useQuery(SorterResults.getAll);

  if (loading) {
    return 'Loading';
  }
  if (error) {
    return 'Error';
  }

  return (
    <div>
      { sorterResults.map((sorterResult) => (
        <span key={sorterResult.identifier}>
          <SorterResult
            sorterResult={sorterResult}
            jobTypes={jobTypes}
            plans={plans}
          />
        </span>
      ))}
    </div>
  );
};

export default SorterResultList;

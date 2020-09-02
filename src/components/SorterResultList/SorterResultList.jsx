import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import SorterResults from '../../gql/sorterResults';
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

  if (error) {
    toast('Could not load data');
  }

  return (
    <div>
      {
        loading
          ? (
            <SkeletonTheme color="#f7f7f7">
              {[...new Array(15)].fill().map(() => (
                <Skeleton height="4rem" className="my-1" />
              ))}
            </SkeletonTheme>
          )
          : sorterResults.map((sorterResult) => (
            <span key={sorterResult.identifier}>
              <SorterResult
                sorterResult={sorterResult}
                jobTypes={jobTypes}
                plans={plans}
              />
            </span>
          ))
      }
    </div>
  );
};

export default SorterResultList;

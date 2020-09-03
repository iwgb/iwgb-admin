import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SorterResults from '../../gql/sorterResults';
import JobTypes from '../../service/jobTypes.service';
import Plans from '../../service/plans.service';
import SorterResult from '../SorterResult/SorterResult';

const SorterResultList = () => {
  const [plans, setPlans] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [added, setAdded] = useState([]);
  const [createdIds, setCreatedIds] = useState([]);

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

  const onAdd = () => setAdded([{
    friendlyName: 'New sort result',
    form: jobTypes[0].id,
    question: '',
    conditional: '',
    plan: plans[0].id,
  }, ...added]);

  const removeFromAdded = (index) => (id) => {
    setAdded(added.filter((e, i) => i !== index));
    if (id !== undefined) {
      setCreatedIds([...createdIds, id]);
    }
  };

  const sortResults = (a, b) => {
    if (createdIds.includes(a.identifier)) {
      return -1;
    }
    if (createdIds.includes(b.identifier)) {
      return 1;
    }
    return a.friendlyName.localeCompare(b.friendlyName);
  };

  const optionsLoading = jobTypes.length === 0 || plans.length === 0;

  return (
    <div className="my-5">
      <div className="d-flex my-3 px-3 justify-content-between align-items-center">
        <h2 className="m-0">Applicant sorter config</h2>
        <div>
          <Button
            color="secondary"
            onClick={onAdd}
            disabled={optionsLoading}
            className="text-nowrap ml-3"
          >
            <Icon
              icon={faPlus}
              size="sm"
            />
            <span className="ml-2">Add</span>
          </Button>
        </div>

      </div>
      {
        loading
          ? (
            <SkeletonTheme color="#f7f7f7">
              {[...new Array(15)].fill().map(() => (
                <Skeleton height="4rem" className="my-1" />
              ))}
            </SkeletonTheme>
          )
          : (
            <React.Fragment>
              {added.map((sorterResult, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={`added-${i}`}>
                  <SorterResult
                    sorterResult={sorterResult}
                    jobTypes={jobTypes}
                    plans={plans}
                    isAdded={true}
                    removeFromAdded={removeFromAdded(i)}
                  />
                </span>
              ))}
              {
                [...sorterResults]
                  .sort(sortResults)
                  .map((sorterResult) => (
                    <span key={sorterResult.identifier}>
                      <SorterResult
                        sorterResult={sorterResult}
                        jobTypes={jobTypes}
                        plans={plans}
                      />
                    </span>
                  ))
              }
            </React.Fragment>
          )
      }
    </div>
  );
};

export default SorterResultList;

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { cardSize } from '../../constants/object';

const ObjectListLoading = () => (
  <React.Fragment>
    <div className="row">
      {[...new Array(6).fill()].map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cardSize}
        >
          <Skeleton height={50} />
        </div>
      ))}
    </div>
    <div className="row">
      {[...new Array(4).fill()].map((_, i) => (
        // eslint-disable-next-line react/jsx-key
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cardSize}
        >
          <Skeleton height="20rem" />
        </div>
      ))}
    </div>
  </React.Fragment>
);

export default ObjectListLoading;

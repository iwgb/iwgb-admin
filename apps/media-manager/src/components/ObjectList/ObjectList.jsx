import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useRecoilValue } from 'recoil';
import Folder from '../Object/Folder';
import File from '../Object/File';
import NewFile from '../New/NewFile';
import NewFolder from '../New/NewFolder';
import ObjectListLoading from './ObjectListLoading';
import ObjectListLoadFailed from './ObjectListLoadFailed';
import { splitFilesAndFolders } from '../../utils/objects';
import { decodeKey } from '../../utils/path';
import Objects from '../../gql/objects';
import { unsortedState } from '../../recoil/objects';
import { errorState } from '../../recoil/error';

const ObjectList = () => {
  const {
    loading,
    error,
    refetch: refetchObjects,
    data: { objects = [] } = {},
  } = useQuery(Objects.list);
  const { path } = useParams();
  const unsortedObjects = useRecoilValue(unsortedState);
  const isError = useRecoilValue(errorState);

  const [files, directories] = React.useMemo(
    () => splitFilesAndFolders(
      decodeKey(path),
      [...objects].sort(({ key: keyA }, { key: keyB }) => {
        if (unsortedObjects.includes(keyA)) {
          return 1;
        }
        if (unsortedObjects.includes(keyB)
        ) {
          return -1;
        }
        return keyA.localeCompare(keyB);
      })
    ),
    [objects, unsortedObjects, path]
  );

  if (loading) {
    return <ObjectListLoading />;
  }

  if (error || isError) {
    return <ObjectListLoadFailed />;
  }

  return (
    <React.Fragment>
      <div className="row">
        {
          directories.map(({ id, key }) => (
            <Folder
              key={id}
              path={key}
              refetchObjects={refetchObjects}
            />
          ))
        }
        <NewFolder />
      </div>
      <div className="row mb-5">
        {
          files.map(({
            id, key, size, lastModified = '',
          }) => (
            <File
              id={id}
              key={id}
              path={key}
              size={size}
              lastModified={lastModified}
              refetchObjects={refetchObjects}
            />
          ))
        }
        <NewFile />
      </div>
    </React.Fragment>
  );
};

export default ObjectList;

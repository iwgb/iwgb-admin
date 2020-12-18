import { DateTime } from 'luxon';
import { getDirectoryString, getParentDirectory } from './path';
import apollo from '../apollo';
import Objects from '../gql/objects';
import http from '../axios';
import s3 from './s3';

const isImmediateChild = (current, key, isDirectory) => (
  isDirectory
    ? current === `${getParentDirectory(key)}/`
    : current === `${getDirectoryString(key)}/`
);

export const splitFilesAndFolders = (currentPath, objects) => objects.reduce(
  ([files, directories], object) => {
    const isDirectory = object.key.slice(-1) === '/';
    if (isImmediateChild(currentPath, object.key, isDirectory)) {
      return isDirectory
        ? [
          files,
          [...directories, object],
        ]
        : [
          [...files, object],
          directories,
        ];
    }
    return [files, directories];
  },
  [[], []]
);

export const createPhantomObject = (newObject) => {
  apollo.writeQuery({
    query: Objects.list,
    data: {
      objects: [
        ...apollo.readQuery({ query: Objects.list }).objects,
        {
          ...newObject,
          lastModified: DateTime.local().toISO(),
        },
      ],
    },
  });
};

export const upload = async ({
  path, uncommittedObjects, setUncommittedObjects, refetchObjects,
}) => {
  const { data: { url } } = await http.post('/getSignedUrl', { key: path });
  await s3.upload(url);
  await refetchObjects();
  setUncommittedObjects(
    uncommittedObjects.filter(({ path: needle }) => needle !== path)
  );
};

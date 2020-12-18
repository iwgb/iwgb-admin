export const getPathWithoutRoot = (path) => path.replace(process.env.REACT_APP_MEDIA_PUBLIC_ROOT, '');

export const encodeKey = (path) => window.btoa(path);

export const decodeKey = (path) => window.atob(path);

export const getYoungestDirectory = (key) => {
  const directories = key.split('/');
  return directories[directories.length - 2] || '';
};

export const getParentDirectory = (key) => key
  .split('/')
  .slice(0, -2)
  .join('/');

export const getFileName = (key) => key.split('/').pop();

export const getDirectoryString = (key) => key
  .split('/')
  .slice(0, -1)
  .join('/');

export const getLongUrl = (path) => `${process.env.REACT_APP_MEDIA_LONG_BASE_URL}/${getPathWithoutRoot(path)}`;

export const getShortUrl = (path) => `${process.env.REACT_APP_MEDIA_SHORT_BASE_URL}/${getPathWithoutRoot(path)}`;

export const getFileExtension = (path) => path.split('.').pop();

export const API_BASE_URL = process.env.REACT_APP_LANGPACKS_API_BASE_URL;

export const REQUEST_CONFIG = {
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_LANGPACKS_API_KEY}`,
  },
  baseURL: API_BASE_URL,
};

export const S3_PRESIGNED_REQUEST_CONFIG = {
  headers: {
    'x-amz-acl': 'public-read',
    'content-type': 'application/json',
  },
};

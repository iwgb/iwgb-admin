export const API_BASE_URL = process.env.REACT_APP_LANGPACKS_API_BASE_URL;

export const REQUEST_CONFIG = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_LANGPACKS_API_KEY}`,
  },
  baseURL: API_BASE_URL,
};

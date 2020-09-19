import http from '../helpers/axios';

const getAll = () => http.get('/onboarding/jobtypes');

const get = (form) => http.get(`/onboarding/jobtypes/${form}`);

export default {
  get,
  getAll,
};

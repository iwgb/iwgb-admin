import http from '../helpers/axios';

const getAll = () => http.get('/jobtypes');

const get = (form) => http.get(`/jobtypes/${form}`);

export default {
  get,
  getAll,
};

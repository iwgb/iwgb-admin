import http from '../helpers/axios';

const getAll = () => http.get('/plans');

export default {
  getAll,
};

import http from '../helpers/axios';

const getAll = () => http.get('/onboarding/plans');

export default {
  getAll,
};

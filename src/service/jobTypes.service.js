import http from 'axios';
import { API_BASE_URL, REQUEST_CONFIG } from '../constants/api.constants';

const getAll = () => http.get(`${API_BASE_URL}/jobtypes`, REQUEST_CONFIG);

const get = (form) => http.get(`${API_BASE_URL}/jobtypes/${form}`, REQUEST_CONFIG);

export default {
  get,
  getAll,
};

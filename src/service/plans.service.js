import http from 'axios';
import { API_BASE_URL, REQUEST_CONFIG } from '../constants/api.constants';

const getAll = () => http.get(`${API_BASE_URL}/plans`, REQUEST_CONFIG);

export default {
  getAll,
};

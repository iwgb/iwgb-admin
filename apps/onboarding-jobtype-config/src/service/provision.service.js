import axios from 'axios';
import {
  REQUEST_CONFIG as WEBSITE_REQUEST_CONFIG, WEBSITE_PURGE_URL,
} from '../constants/website.constants';
import { API_BASE_URL, REQUEST_CONFIG as API_REQUEST_CONFIG } from '../constants/api.constants';

const all = () => Promise.allSettled([
  axios.get(`${API_BASE_URL}/flushCache`, API_REQUEST_CONFIG),
  axios.post(WEBSITE_PURGE_URL, {}, WEBSITE_REQUEST_CONFIG),
]);

export default {
  all,
};

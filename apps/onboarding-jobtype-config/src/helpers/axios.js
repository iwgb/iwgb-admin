import { setupCache } from 'axios-cache-adapter';
import axios from 'axios';
import { API_BASE_URL, REQUEST_CONFIG } from '../constants/api.constants';

const { adapter } = setupCache({
  maxAge: 15 * 60 * 1000,
});

const http = axios.create({
  adapter,
  baseURL: API_BASE_URL,
  ...REQUEST_CONFIG,
});

export default http;

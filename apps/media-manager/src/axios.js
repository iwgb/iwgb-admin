import axios from 'axios';
import { REQUEST_CONFIG } from './constants/api';

const http = axios.create({
  baseURL: process.env.REACT_APP_OBJECTS_API_BASE_URL,
  ...REQUEST_CONFIG,
});

export default http;

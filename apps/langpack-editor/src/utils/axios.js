import axios from 'axios';
import { REQUEST_CONFIG } from '../constants/api';

const http = axios.create(REQUEST_CONFIG);

export default http;

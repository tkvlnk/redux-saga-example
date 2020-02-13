import axios from 'axios';
import { stringify } from 'qs';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  paramsSerializer: (paramsObj: {}) =>
    stringify(paramsObj, {
      arrayFormat: 'repeat'
    })
});

export default httpClient;

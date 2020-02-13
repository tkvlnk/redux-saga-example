import axios from 'axios';
import { stringify } from 'qs';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  paramsSerializer: (params: object) =>
    stringify(params, {
      arrayFormat: 'repeat'
    })
});

export default httpClient;

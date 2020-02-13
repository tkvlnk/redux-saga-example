import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const NetworkActionTypes = {
  ApiCallStart: 'ApiCallStart',
  ApiCallSuccess: 'ApiCallSuccess',
  ApiCallFailure: 'ApiCallFailure'
} as const;

export const networkActions = {
  apiCallStart: (payload: { req: AxiosRequestConfig; alias: string }) => ({
    type: NetworkActionTypes.ApiCallStart,
    payload
  }),
  apiCallSuccess: (payload: {
    req: AxiosRequestConfig;
    res: AxiosResponse;
    alias: string;
  }) => ({
    type: NetworkActionTypes.ApiCallSuccess,
    payload
  }),
  apiCallFailure: (payload: {
    req: AxiosRequestConfig;
    res: AxiosError;
    alias: string;
  }) => ({
    type: NetworkActionTypes.ApiCallFailure,
    payload
  })
};

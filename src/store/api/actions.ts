import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const ApiCallActionTypes = {
  ApiCallStart: 'ApiCallStart',
  ApiCallSuccess: 'ApiCallSuccess',
  ApiCallFailure: 'ApiCallFailure'
} as const;

export const apiCallActions = {
  apiCallStart: (payload: { req: AxiosRequestConfig; alias: string }) => ({
    type: ApiCallActionTypes.ApiCallStart,
    payload,
    meta: {}
  }),
  apiCallSuccess: (payload: {
    req: AxiosRequestConfig;
    res: AxiosResponse;
    alias: string;
  }) => ({
    type: ApiCallActionTypes.ApiCallSuccess,
    payload
  }),
  apiCallFailure: (payload: {
    req: AxiosRequestConfig;
    res: AxiosError;
    alias: string;
  }) => ({
    type: ApiCallActionTypes.ApiCallFailure,
    payload
  })
};

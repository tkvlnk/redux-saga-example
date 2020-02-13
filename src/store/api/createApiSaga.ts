import { AxiosRequestConfig } from 'axios';
import { put, call } from 'redux-saga/effects';
import { apiCallActions } from './actions';
import httpClient from './http-client';

const createApiSaga = <R, P>({
  buildReqConfig = () => ({}),
  addApiKey = false,
  alias
}: {
  buildReqConfig?: (params: P) => AxiosRequestConfig;
  addApiKey?: boolean;
  alias: string;
}) =>
  function* apiSaga(params: P) {
    const reqConfig = buildReqConfig(params);

    if (addApiKey) {
      if (!reqConfig.params) {
        reqConfig.params = {};
      }

      reqConfig.params.key = process.env.REACT_APP_API_KEY;
    }

    yield put(
      apiCallActions.apiCallStart({
        req: reqConfig,
        alias
      })
    );

    try {
      const res = yield call(httpClient.request, reqConfig);

      yield put(
        apiCallActions.apiCallSuccess({
          req: reqConfig,
          res,
          alias
        })
      );

      return res.data;
    } catch (e) {
      yield put(
        apiCallActions.apiCallFailure({
          req: reqConfig,
          res: e,
          alias
        })
      );

      throw e;
    }
  };

export default createApiSaga;

import { AxiosRequestConfig } from 'axios';
import { call, put } from 'redux-saga/effects';
import httpClient from './httpClient';
import { networkActions } from './actions';

const createApiSaga = <P>({
  buildReqConfig,
  addApiKey,
  alias
}: {
  buildReqConfig: (params: P) => AxiosRequestConfig;
  addApiKey: boolean;
  alias: string;
}) =>
  function* apiSaga(params: P) {
    const reqConfig = buildReqConfig(params);

    yield put(
      networkActions.apiCallStart({
        req: reqConfig,
        alias
      })
    );

    if (addApiKey) {
      if (!reqConfig.params) {
        reqConfig.params = {};
      }

      reqConfig.params.key = process.env.REACT_APP_API_KEY;
    }

    try {
      const response = yield call(httpClient.request, reqConfig);

      yield put(
        networkActions.apiCallSuccess({
          req: reqConfig,
          res: response,
          alias
        })
      );

      return response.data;
    } catch (e) {
      yield put(
        networkActions.apiCallFailure({
          req: reqConfig,
          res: e,
          alias
        })
      );

      throw e;
    }
  };

export default createApiSaga;

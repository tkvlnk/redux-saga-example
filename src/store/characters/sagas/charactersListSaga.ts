import {
  getContext,
  takeLatest,
  delay,
  put,
  call,
  select,
  fork
} from 'redux-saga/effects';
import { stringify, parse } from 'qs';
import { History } from 'history';
import axios from 'axios';
import { characterActions, CharacterActionTypes } from '../actions';
import { CharacterSearchParameters } from '../index';
import { getCharacterSearchParams } from '../selectors';
import httpClient from '../../api/http-client';
import { fetchCharactersList } from '../../api/services/characters';

export default function* charactersListSaga() {
  yield takeLatest(CharacterActionTypes.ListParamsChanged, fetchCharactersSaga);

  yield fork(initialSearchFromUrlSaga);
}

function* fetchCharactersSaga() {
  yield put(characterActions.listLoading(true));

  const searchParams = yield select(getCharacterSearchParams);

  yield call(storeSearchInUrlSaga, searchParams);

  yield delay(2000);

  try {
    const data = yield call(fetchCharactersList, searchParams);

    yield put(characterActions.listFetchSuccess(data));
  } catch (err) {
    yield put(
      characterActions.listFetchError(
        err?.response?.data?.error ?? err?.message ?? err
      )
    );
  }

  yield put(characterActions.listLoading(false));
}

function* storeSearchInUrlSaga(searchParams: CharacterSearchParameters) {
  const history: History = yield getContext('history');

  history.push({
    search: stringify(searchParams, { arrayFormat: 'repeat' })
  });
}

function* initialSearchFromUrlSaga() {
  const history: History = yield getContext('history');

  const searchParams = parse(history.location.search.substr(1));

  yield put(characterActions.listParamsChanged(searchParams));
}

import {
  delay,
  takeLatest,
  select,
  put,
  call,
  getContext
} from 'redux-saga/effects';
import { stringify, parse } from 'qs';
import { characterActions, CharacterActionTypes } from '../actions';
import { getCharacterSearchParams } from '../selectors';
import httpClient from '../../network/httpClient';
import { fetchCharactersListSaga } from '../../network/services/charactes';

export default function* characterListSaga() {
  yield takeLatest(CharacterActionTypes.ListParamsChanged, characterSearchSaga);

  const history = yield getContext('history');

  const searchParamsFromUrl = parse(history.location.search.substr(1));

  yield put(characterActions.listParamsChanged(searchParamsFromUrl));
}

function* characterSearchSaga() {
  const searchParams = yield select(getCharacterSearchParams);

  const searchInUrl = stringify(searchParams, {
    arrayFormat: 'repeat'
  });

  const history = yield getContext('history');

  history.push({
    search: searchInUrl
  });

  yield put(characterActions.listLoading(true));

  yield delay(1000);

  try {
    const data = yield call(fetchCharactersListSaga, searchParams);

    yield put(characterActions.listFetchSuccess(data));
  } catch (err) {
    yield put(characterActions.listFetchError(err?.message ?? err));
  } finally {
    yield put(characterActions.listLoading(false));
  }
}

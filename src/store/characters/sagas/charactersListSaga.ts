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
import { characterActions, CharacterActionTypes } from '../actions';
import { Character, CharacterSearchParameters } from '../index';
import { getCharacterSearchParams } from '../selectors';

export default function* charactersListSaga() {
  yield takeLatest(CharacterActionTypes.ListParamsChanged, fetchCharactersSaga);

  yield fork(initialSearchFromUrlSaga);
}

function* fetchCharactersSaga() {
  yield put(characterActions.listLoading(true));

  const searchParams = yield select(getCharacterSearchParams);

  yield call(storeSearchInUrlSaga, searchParams);

  yield delay(2000);

  const params = stringify(
    {
      key: process.env.REACT_APP_API_KEY,
      ...searchParams
    },
    {
      arrayFormat: 'repeat'
    }
  );

  try {
    const fetchedData: Character[] = yield call(() =>
      fetch(
        `${process.env.REACT_APP_API_BASE}/characters?${params}`
      ).then(res => res.json())
    );

    yield put(characterActions.listFetchSuccess(fetchedData));
  } catch (e) {
    yield put(characterActions.listFetchError(e?.message ?? e));
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

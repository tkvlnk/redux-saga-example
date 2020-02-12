import { stringify } from 'qs';
import { call, put, select } from 'redux-saga/effects';
import { Character } from '../index';
import { characterActions } from '../actions';
import { getCharacterById } from '../selectors';

export default function* characterDetailsSaga(characterId: Character['_id']) {
  if (yield select(getCharacterById(characterId))) {
    return;
  }

  yield put(characterActions.detailsLoading(true));

  try {
    const params = stringify({
      key: process.env.REACT_APP_API_KEY
    });

    const fetchedData = yield call(() =>
      fetch(
        `${process.env.REACT_APP_API_BASE}/characters/${characterId}?${params}`
      ).then(res => res.json())
    );

    yield put(characterActions.detailsFetchSuccess(fetchedData));
  } catch (err) {
    yield put(characterActions.detailsFetchError(err?.message ?? err));
  }

  yield put(characterActions.detailsLoading(false));
}

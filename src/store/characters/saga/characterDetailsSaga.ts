import { call, select, put } from 'redux-saga/effects';
import { Character } from '../index';
import { getCharacterById } from '../selectors';
import { fetchCharacterDetails } from '../../network/services/charactes';
import { characterActions } from '../actions';

export default function* characterDetailsSaga(characterId: Character['_id']) {
  if (yield select(getCharacterById(characterId))) {
    return;
  }

  yield put(characterActions.detailsLoading(true));

  try {
    const data = yield call(fetchCharacterDetails, characterId);
    yield put(characterActions.detailsFetchSuccess(data));
  } catch (err) {
    yield put(characterActions.detailsFetchError(err?.message ?? err));
  } finally {
    yield put(characterActions.detailsLoading(false));
  }
}

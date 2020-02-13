import { call, put, select } from 'redux-saga/effects';
import { Character } from '../index';
import { characterActions } from '../actions';
import { getCharacterById } from '../selectors';
import { fetchCharacterDetails } from '../../api/services/characters';

export default function* characterDetailsSaga(characterId: Character['_id']) {
  if (yield select(getCharacterById(characterId))) {
    return;
  }

  yield put(characterActions.detailsLoading(true));

  try {
    const data = yield call(fetchCharacterDetails, characterId);

    console.log('>__data:::', data);

    yield put(characterActions.detailsFetchSuccess(data));
  } catch (err) {
    yield put(
      characterActions.detailsFetchError(
        err?.response?.data?.error ?? err?.message ?? err
      )
    );
  }

  yield put(characterActions.detailsLoading(false));
}

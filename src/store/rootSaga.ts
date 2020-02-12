import { all } from 'redux-saga/effects';
import charactersListSaga from './characters/sagas/charactersListSaga';

export default function* rootSaga() {
  yield all([charactersListSaga()]);
}

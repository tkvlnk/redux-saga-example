import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { History } from 'history';
import characters, { CharactersState } from './characters';
import characterListSaga from './characters/saga/characterListSaga';

export interface AppState {
  characters: CharactersState;
}

export default function configureStore({ history }: { history?: History }) {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      history
    }
  });

  const store = createStore(
    combineReducers({
      characters
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(function* helloSaga() {
    yield fork(characterListSaga);
  });

  return store;
}

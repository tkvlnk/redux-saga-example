import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { History } from 'history';
import characters, { CharactersState } from './characters';

export interface AppState {
  characters: CharactersState;
}

export default function configureStore({
  history,
  rootSaga
}: {
  history?: History;
  rootSaga?: Saga;
} = {}) {
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

  if (rootSaga) {
    sagaMiddleware.run(rootSaga);
  }

  return store;
}

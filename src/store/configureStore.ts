import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Saga, SagaMiddleware } from 'redux-saga';
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

  Object.assign(store, createSagaInjector(sagaMiddleware.run, rootSaga));

  return store as typeof store & ReturnType<typeof createSagaInjector>;
}

function createSagaInjector(runSaga: SagaMiddleware['run'], rootSaga?: Saga) {
  const injectedSagas = new Map();
  const isInjected = (key: string) => injectedSagas.has(key);
  const injectSaga = <S extends Saga>(
    key: string,
    saga: S,
    ...args: Parameters<S>
  ) => {
    if (isInjected(key)) {
      return;
    }
    const task = runSaga(saga, ...args);
    injectedSagas.set(key, task);
  };

  const ejectSaga = (key: string) => {
    const task = injectedSagas.get(key);

    if (task.isRunning()) {
      task.cancel();
    }

    injectedSagas.delete(key);
  };

  if (rootSaga) {
    injectSaga('root', rootSaga);
  }

  return { injectSaga, ejectSaga };
}

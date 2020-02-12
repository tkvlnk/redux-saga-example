import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Saga } from 'redux-saga';
import rootSaga from '../../store/rootSaga';
import configureStore from '../../store/configureStore';

const history = createBrowserHistory();

const store = configureStore({
  rootSaga,
  history
});

const AppWrapper: React.FC = ({ children }) => (
  <Router history={history}>
    <Provider store={store}>{children}</Provider>
  </Router>
);

export default AppWrapper;

export const useInjectSaga: <S extends Saga>(
  key: string,
  saga: S,
  ...args: Parameters<S>
) => void = (key, saga, ...args) => {
  useEffect(() => {
    store.injectSaga(key, saga, ...args);

    return () => {
      store.ejectSaga(key);
    };
  }, [key, saga]);
};

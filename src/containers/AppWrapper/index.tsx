import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Saga } from 'redux-saga';
import configureStore from '../../store/configureStore';

const history = createBrowserHistory();

const store = configureStore({
  history
});

const AppWrapper: React.FC = ({ children }) => (
  <Provider store={store}>
    <Router history={history}>{children}</Router>
  </Provider>
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

import { combineReducers } from 'redux';
import { AppReducer } from '../types';
import { ApiCallActionTypes } from './actions';

export interface ApiState {
  pendingRequests: number;
}

const pendingRequests: AppReducer<number> = (state = 0, action) => {
  switch (action.type) {
    case ApiCallActionTypes.ApiCallStart:
      return state + 1;
    case ApiCallActionTypes.ApiCallSuccess:
    case ApiCallActionTypes.ApiCallFailure:
      return state - 1;
    default:
      return state;
  }
};

const api = combineReducers({
  pendingRequests
});

export default api;

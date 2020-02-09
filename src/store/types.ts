import { ActionCreator, AnyAction, Reducer } from 'redux';
import { Selector } from 'reselect';
import { characterActions } from './characters/actions';
import { AppState } from './configureStore';

type ExtractActionInterfaces<
  T extends { [key: string]: ActionCreator<AnyAction> }
> = ReturnType<T[keyof T]>;

export type AppActions = ExtractActionInterfaces<typeof characterActions>;

export type AppReducer<S> = Reducer<S, AppActions>;

export type AppSelector<R> = Selector<AppState, R>;

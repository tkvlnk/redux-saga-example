import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import characters, { CharactersState } from './characters';

export interface AppState {
  characters: CharactersState;
}

export default function configureStore() {
  return createStore(
    combineReducers({
      characters
    }),
    composeWithDevTools()
  );
}

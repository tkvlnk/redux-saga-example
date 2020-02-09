import { combineReducers } from 'redux';
import { CharacterActionTypes } from './actions';
import { AppActions, AppReducer } from '../types';
import bloodStatuses from '../../constants/bloodStatus';
import houses from '../../constants/houses';

export interface Character {
  _id: string;
  name: string;
  role: string;
  house: typeof houses[keyof typeof houses]['name'];
  school: string;
  __v: number;
  ministryOfMagic: boolean;
  orderOfThePhoenix: boolean;
  dumbledoresArmy: boolean;
  deathEater: boolean;
  bloodStatus: typeof bloodStatuses[keyof typeof bloodStatuses]['value'];
  species: string;
}

export interface CharacterSearchParameters {
  house: Character['house'][];
  bloodStatus?: Character['bloodStatus'];
  deathEater?: boolean;
  dumbledoresArmy?: boolean;
  orderOfThePhoenix?: boolean;
  ministryOfMagic?: boolean;
}

export interface CharactersState {
  listPage: {
    ids: Character['_id'][];
    loading: boolean;
    error: string;
    searchParams: CharacterSearchParameters;
  };
  detailsPage: {
    loading: boolean;
    error: string;
  };
  byId: Record<Character['_id'], Character>;
}

const listPage = combineReducers<CharactersState['listPage'], AppActions>({
  ids: (state = [], action) => {
    switch (action.type) {
      case CharacterActionTypes.ListFetchSuccess:
        return action.payload.map(({ _id }) => _id);
      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case CharacterActionTypes.ListLoading:
        return action.payload;
      default:
        return state;
    }
  },
  error: (state = '', action) => {
    switch (action.type) {
      case CharacterActionTypes.ListFetchError:
        return action.payload;
      default:
        return state;
    }
  },
  searchParams: (
    state = {
      house: []
    },
    action
  ) => {
    switch (action.type) {
      case CharacterActionTypes.ListParamsChanged: {
        const { house, bloodStatus } = state;

        // eslint-disable-next-line prefer-object-spread
        return Object.assign(
          {
            house,
            bloodStatus
          },
          { ...state },
          action.payload
        );
      }
      default:
        return state;
    }
  }
});

const detailsPage = combineReducers<CharactersState['detailsPage'], AppActions>(
  {
    loading: (state = false, action) => {
      switch (action.type) {
        case CharacterActionTypes.DetailsLoading:
          return action.payload;
        default:
          return state;
      }
    },
    error: (state = '', action) => {
      switch (action.type) {
        case CharacterActionTypes.DetailsFetchError:
          return action.payload;
        default:
          return state;
      }
    }
  }
);

const byId: AppReducer<CharactersState['byId']> = (state = {}, action) => {
  switch (action.type) {
    case CharacterActionTypes.ListFetchSuccess: {
      return action.payload.reduce(
        // eslint-disable-next-line no-underscore-dangle
        (nextState, char) => ({ ...nextState, [char._id]: char }),
        state
      );
    }
    case CharacterActionTypes.DetailsFetchSuccess: {
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        [action.payload._id]: action.payload
      };
    }
    default:
      return state;
  }
};

const characters = combineReducers({
  listPage,
  detailsPage,
  byId
});

export default characters;

import { Character, CharacterSearchParameters } from './index';

export const CharacterActionTypes = {
  ListFetchSuccess: 'ListFetchSuccess',
  ListFetchError: 'ListFetchError',
  ListLoading: 'ListLoading',
  ListParamsChanged: 'ListParamsChanged',
  DetailsLoading: 'DetailsLoading',
  DetailsFetchSuccess: 'DetailsFetchSuccess',
  DetailsFetchError: 'DetailsFetchError'
} as const;

export const characterActions = {
  listFetchSuccess: (payload: Character[]) => ({
    type: CharacterActionTypes.ListFetchSuccess,
    payload
  }),
  listFetchError: (payload: string) => ({
    type: CharacterActionTypes.ListFetchError,
    payload
  }),
  listLoading: (payload: boolean) => ({
    type: CharacterActionTypes.ListLoading,
    payload
  }),
  listParamsChanged: (payload: Partial<CharacterSearchParameters>) => ({
    type: CharacterActionTypes.ListParamsChanged,
    payload
  }),
  detailsLoading: (payload: boolean) => ({
    type: CharacterActionTypes.DetailsLoading,
    payload
  }),
  detailsFetchSuccess: (payload: Character) => ({
    type: CharacterActionTypes.DetailsFetchSuccess,
    payload
  }),
  detailsFetchError: (payload: string) => ({
    type: CharacterActionTypes.DetailsFetchError,
    payload
  })
};

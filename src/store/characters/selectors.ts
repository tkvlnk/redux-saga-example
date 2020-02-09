import { createSelector } from 'reselect';
import { AppSelector } from '../types';
import { Character, CharacterSearchParameters } from './index';
import organizations from '../../constants/organizations';

export const getCharacterById: (
  characterId: Character['_id']
) => AppSelector<Character | null> = characterId => state =>
  state.characters.byId[characterId] ?? null;

export const getManyCharactersById: (
  characterId: Character['_id'][]
) => AppSelector<Character[]> = characterIds =>
  createSelector(
    state => state.characters.byId,
    byId => Object.values(byId).filter(({ _id }) => characterIds.includes(_id))
  );

export const getCharactersList: AppSelector<Character[]> = createSelector(
  [state => state.characters.byId, state => state.characters.listPage.ids],
  (byId, ids) => ids.map(id => byId[id] as Character).filter(Boolean)
);

export const getOrgFilters: AppSelector<Array<
  keyof typeof organizations
>> = createSelector(
  state => state.characters.listPage.searchParams,
  params =>
    (Object.keys(organizations) as Array<keyof typeof organizations>).filter(
      key => params[key]
    )
);

export const getCharacterSearchParams: AppSelector<CharacterSearchParameters> = state =>
  state.characters.listPage.searchParams;

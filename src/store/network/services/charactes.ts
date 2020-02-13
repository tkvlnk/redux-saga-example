import createApiSaga from '../createApiSaga';
import { CharacterSearchParameters } from '../../characters';

export const fetchCharactersListSaga = createApiSaga({
  alias: 'FETCH_CHARACTERS_LIST',
  addApiKey: true,
  buildReqConfig: (searchParams: CharacterSearchParameters) => ({
    url: '/characters',
    method: 'GET',
    params: searchParams
  })
});

export const fetchCharacterDetails = createApiSaga({
  alias: 'FETCH_CHARACTER_DETAILS',
  addApiKey: true,
  buildReqConfig: characterId => ({
    url: `/characters/${characterId}`,
    method: 'GET'
  })
});

import createApiSaga from '../createApiSaga';
import { Character, CharacterSearchParameters } from '../../characters';

export const fetchCharactersList = createApiSaga({
  buildReqConfig: (searchParams: CharacterSearchParameters) => ({
    method: 'GET',
    url: '/characters',
    params: searchParams
  }),
  alias: 'fetch_characters',
  addApiKey: true
});

export const fetchCharacterDetails = createApiSaga({
  buildReqConfig: (characterId: Character['_id']) => ({
    method: 'GET',
    url: `/characters/${characterId}`
  }),
  alias: 'fetch_character_details',
  addApiKey: true
});

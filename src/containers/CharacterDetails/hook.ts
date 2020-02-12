import { useParams } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { stringify } from 'qs';
import { getCharacterById } from '../../store/characters/selectors';
import { characterActions } from '../../store/characters/actions';
import { AppState } from '../../store/configureStore';
import { useInjectSaga } from '../AppWrapper';
import characterDetailsSaga from '../../store/characters/sagas/characterDetailsSaga';

export default function useCharacterDetails() {
  const { characterId } = useParams<{ characterId: string }>();

  const character = useSelector(getCharacterById(characterId));

  const { loading, error } = useSelector(
    (state: AppState) => state.characters.detailsPage,
    shallowEqual
  );

  useInjectSaga('characterDetails', characterDetailsSaga, characterId);

  return {
    data: character,
    loading,
    error
  };
}

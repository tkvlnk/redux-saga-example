import { useParams } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { stringify } from 'qs';
import { getCharacterById } from '../../store/characters/selectors';
import { characterActions } from '../../store/characters/actions';
import { AppState } from '../../store/configureStore';

export default function useCharacterDetails() {
  const { characterId } = useParams<{ characterId: string }>();

  const character = useSelector(getCharacterById(characterId));

  const { loading, error } = useSelector(
    (state: AppState) => state.characters.detailsPage,
    shallowEqual
  );

  const {
    detailsFetchSuccess,
    detailsFetchError,
    detailsLoading
  } = bindActionCreators(characterActions, useDispatch());

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (character?._id === characterId) {
      return;
    }

    (async () => {
      try {
        const params = stringify({
          key: process.env.REACT_APP_API_KEY
        });

        detailsLoading(true);

        const fetchedData = await fetch(
          `${process.env.REACT_APP_API_BASE}/characters/${characterId}?${params}`
        ).then(res => res.json());

        detailsFetchSuccess(fetchedData);
      } catch (err) {
        detailsFetchError(err?.message ?? err);
      } finally {
        detailsLoading(false);
      }
    })();
  }, [character?._id, characterId]);

  return {
    data: character,
    loading,
    error
  };
}

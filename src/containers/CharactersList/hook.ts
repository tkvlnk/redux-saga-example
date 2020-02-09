import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { stringify } from 'qs';
import { bindActionCreators } from 'redux';
import {
  getCharacterSearchParams,
  getCharactersList
} from '../../store/characters/selectors';
import { AppState } from '../../store/configureStore';
import { characterActions } from '../../store/characters/actions';
import { Character } from '../../store/characters';

export default function useCharactersList() {
  const data = useSelector(getCharactersList);

  const { loading, error } = useSelector(
    (state: AppState) => state.characters.listPage,
    shallowEqual
  );

  const searchParams = useSelector(getCharacterSearchParams, shallowEqual);

  const dispatch = useDispatch();

  const { listFetchError, listFetchSuccess, listLoading } = bindActionCreators(
    characterActions,
    dispatch
  );

  useEffect(() => {
    (async () => {
      try {
        const params = stringify(
          {
            key: process.env.REACT_APP_API_KEY,
            ...searchParams
          },
          {
            arrayFormat: 'repeat'
          }
        );

        listLoading(true);

        const fetchedData: Character[] = await fetch(
          `${process.env.REACT_APP_API_BASE}/characters?${params}`
        ).then(res => res.json());

        listFetchSuccess(fetchedData);
      } catch (err) {
        listFetchError(err?.message ?? err);
      } finally {
        listLoading(false);
      }
    })();
  }, [searchParams]);

  return {
    data,
    loading,
    error
  };
}

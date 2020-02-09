import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { CharacterSearchParameters } from '../../store/characters';
import { characterActions } from '../../store/characters/actions';

export default function useFilterChange<F extends unknown[]>(
  transformToSearchParams: (...args: F) => Partial<CharacterSearchParameters>
) {
  const dispatch = useDispatch();

  return useCallback(
    (...args: F) =>
      dispatch(
        characterActions.listParamsChanged(transformToSearchParams(...args))
      ),
    []
  );
}

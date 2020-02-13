import React from 'react';
import { Alert, Empty, Spin } from 'antd';
import { useParams } from 'react-router';
import { shallowEqual, useSelector } from 'react-redux';
import CharacterCard from '../../ui/CharacterCard';
import sm from './styles.module.scss';
import { useInjectSaga } from '../AppWrapper';
import characterDetailsSaga from '../../store/characters/saga/characterDetailsSaga';
import { getCharacterById } from '../../store/characters/selectors';
import { AppState } from '../../store/configureStore';

const CharacterDetails: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();

  useInjectSaga('characterDetails', characterDetailsSaga, characterId);

  const data = useSelector(getCharacterById(characterId));

  const { loading, error } = useSelector(
    (state: AppState) => state.characters.detailsPage,
    shallowEqual
  );

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return (
      <Alert
        showIcon
        type="error"
        message="Characters details fetch error"
        description={error}
      />
    );
  }

  if (!data) {
    return <Empty />;
  }

  return (
    <div className={sm.CharacterDetails}>
      <CharacterCard character={data} detailed />
    </div>
  );
};

export default CharacterDetails;

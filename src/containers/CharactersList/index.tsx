import React from 'react';
import { Alert, Empty, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import CharacterCard from '../../ui/CharacterCard';
import sm from './styles.module.scss';
import { getCharactersList } from '../../store/characters/selectors';
import { AppState } from '../../store/configureStore';

const CharactersList: React.FC = () => {
  const data = useSelector(getCharactersList);

  const { loading, error } = useSelector(
    (state: AppState) => state.characters.listPage,
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
        message="Characters list fetch error"
        description={error}
      />
    );
  }

  if (!data?.length) {
    return <Empty />;
  }

  return (
    <div className={sm.ListWrap}>
      <div className={sm.List}>
        {data.map(char => (
          // eslint-disable-next-line no-underscore-dangle
          <div key={char._id} className={sm.ListItem}>
            {/* eslint-disable-next-line no-underscore-dangle */}
            <Link to={`/${char._id}`}>
              <CharacterCard character={char} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersList;

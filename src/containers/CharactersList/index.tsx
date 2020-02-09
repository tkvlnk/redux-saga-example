import React from 'react';
import { Alert, Empty, Spin } from 'antd';
import { Link } from 'react-router-dom';
import CharacterCard from '../../ui/CharacterCard';
import useCharactersList from './hook';
import sm from './styles.module.scss';

const CharactersList: React.FC = () => {
  const { loading, data, error } = useCharactersList();

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

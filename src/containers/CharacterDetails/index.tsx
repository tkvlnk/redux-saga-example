import React from 'react';
import { Alert, Empty, Spin } from 'antd';
import CharacterCard from '../../ui/CharacterCard';
import useCharacterDetails from './hook';

const CharacterDetails: React.FC = () => {
  const { data, loading, error } = useCharacterDetails();

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
    <div>
      <CharacterCard character={data} />
    </div>
  );
};

export default CharacterDetails;

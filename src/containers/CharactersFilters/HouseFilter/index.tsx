import React, { useMemo } from 'react';
import { Select } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import houses from '../../../constants/houses';
import { AppState } from '../../../store/configureStore';
import { Character } from '../../../store/characters';
import useFilterChange from '../useFilterChange';

const HouseFilter: React.FC = () => {
  const houseFilter = useSelector(
    (state: AppState) => state.characters.listPage.searchParams.house,
    shallowEqual
  );

  const onFilterChange = useFilterChange((house: Character['house'][]) => ({
    house
  }));

  return (
    <Select
      onChange={onFilterChange}
      value={houseFilter}
      placeholder="Select houses"
      mode="multiple"
      style={{ minWidth: 200 }}
    >
      {useMemo(
        () =>
          Object.values(houses).map(house => (
            <Select.Option
              key={house.name}
              value={house.name}
              label={`${house.emoji}${house.name}`}
            >{`${house.emoji}${house.name}`}</Select.Option>
          )),
        []
      )}
    </Select>
  );
};

export default HouseFilter;

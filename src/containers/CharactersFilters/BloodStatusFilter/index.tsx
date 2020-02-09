import React, { useCallback, useMemo } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { Character } from '../../../store/characters';
import bloodStatuses from '../../../constants/bloodStatus';
import { AppState } from '../../../store/configureStore';
import useFilterChange from '../useFilterChange';

const BloodStatusFilter: React.FC = () => {
  const bloodFilter = useSelector(
    (state: AppState) => state.characters.listPage.searchParams.bloodStatus
  );

  const onFilterChange = useFilterChange(
    (bloodStatus: Character['bloodStatus']) => ({
      bloodStatus
    })
  );

  return (
    <Select<Character['bloodStatus']>
      value={bloodFilter}
      style={{ minWidth: 200 }}
      placeholder="Select blood status"
      onSelect={onFilterChange}
    >
      {useMemo(
        () =>
          Object.values(bloodStatuses).map(({ value, displayName }) => (
            <Select.Option key={value} value={value}>
              {displayName}
            </Select.Option>
          )),
        []
      )}
    </Select>
  );
};

export default BloodStatusFilter;

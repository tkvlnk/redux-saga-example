import React, { useCallback, useMemo } from 'react';
import { Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import organizations from '../../../constants/organizations';
import { getOrgFilters } from '../../../store/characters/selectors';
import useFilterChange from '../useFilterChange';

const OrganizationFilter: React.FC = () => {
  const orgFilters = useSelector(getOrgFilters);

  const onFilterChange = useFilterChange((orgs: string[]) =>
    Object.keys(organizations).reduce(
      (acc, key) => ({
        ...acc,
        [key]: orgs.includes(key) ? true : undefined
      }),
      {}
    )
  );

  return (
    <Checkbox.Group
      value={orgFilters}
      onChange={value => onFilterChange(value as string[])}
      options={useMemo(
        () =>
          Object.entries(organizations).map(([key, { emoji, title }]) => ({
            label: `${emoji}${title}`,
            value: key
          })),
        []
      )}
    />
  );
};

export default OrganizationFilter;

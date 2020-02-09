import React from 'react';
import sm from './styles.module.scss';

import BloodStatusFilter from './BloodStatusFilter';
import OrganizationFilter from './OrganizationFilter';
import HouseFilter from './HouseFilter';

const CharactersFilters: React.FC = () => {
  return (
    <div className={sm.FiltersWrap}>
      <div className={sm.FilterItem}>
        <HouseFilter />
      </div>

      <div className={sm.FilterItem}>
        <OrganizationFilter />
      </div>

      <div className={sm.FilterItem}>
        <BloodStatusFilter />
      </div>
    </div>
  );
};

export default CharactersFilters;

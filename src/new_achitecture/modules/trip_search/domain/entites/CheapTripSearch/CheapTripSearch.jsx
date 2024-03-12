import React from 'react';
import RouteCard from './RouteCard';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import useCheapTripSearch from '../../../presentation/hooks/useCheapTripSearch';
import {
  SORT_OPTIONS,
} from '../utils/constants/sortConstants';
import SearchForm from '../../../presentation/components/SearchForm/SearchForm';

function CheapTripSearch(props) {
  const { routes, filteredRoutes, PAGINATION_LIMIT, filterBy, selectSortBy } =
    useCheapTripSearch();

  const handleSelectSortBy = (event) => {
    selectSortBy(event.target.value);
  };
  return (
    <>
      <SearchForm />
      <div>
        {routes && filteredRoutes ? (
          <>
            <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={filterBy}
              label='Sort'
              onChange={handleSelectSortBy}
            >
              {SORT_OPTIONS.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : null}
        {routes &&
          filteredRoutes &&
          filteredRoutes.slice(0, PAGINATION_LIMIT).map((route, index) => {
            return <RouteCard route={route} key={route + index} />;
          })}
        {routes && filteredRoutes && filteredRoutes.length === 0 && (
          <p>No such routes</p>
        )}
      </div>
    </>
  );
}

export default CheapTripSearch;

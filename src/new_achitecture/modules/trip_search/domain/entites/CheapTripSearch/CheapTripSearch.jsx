import React from 'react';
import RouteCard from './RouteCard';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import useCheapTripSearch from '../../../presentation/hooks/useCheapTripSearch';
import {
  SORT_OPTIONS,
} from '../utils/constants/sortConstants';
import SearchForm from '../../../presentation/components/SearchForm/SearchForm';
import SelectSortRoutes from '../../../presentation/components/SelectSortRoutes/SelectSortRoutes';

function CheapTripSearch(props) {
  const { routes, filteredRoutes, PAGINATION_LIMIT, filterBy, selectSortBy } =
    useCheapTripSearch();

  return (
    <>
      <SearchForm />
      <div>
        {routes && filteredRoutes ? (
          <>
            <SelectSortRoutes/>
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

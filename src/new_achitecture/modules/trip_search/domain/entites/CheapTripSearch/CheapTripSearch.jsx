import React from 'react';
import RouteCard from './RouteCard';
import useCheapTripSearch from '../../../presentation/hooks/useCheapTripSearch';
import SearchForm from '../../../presentation/components/SearchForm/SearchForm';
import SelectSortRoutes from '../../../presentation/components/SelectSortRoutes/SelectSortRoutes';
import {Box} from "@material-ui/core";

function CheapTripSearch({setIsSearchListIsOpen}) {
  const { routes, filteredRoutes, PAGINATION_LIMIT, style } = useCheapTripSearch();


  return (
    <>
      <SearchForm />
      <div>
        {routes &&
          filteredRoutes &&
          filteredRoutes.slice(0, PAGINATION_LIMIT).map((route, index) => {
            return <RouteCard route={route} key={route + index} setIsSearchListIsOpen={setIsSearchListIsOpen}/>;
          })}
        {routes && filteredRoutes && filteredRoutes.length === 0 && (
          <p>No such routes</p>
        )}
      </div>
    </>
  );
}

export default CheapTripSearch;

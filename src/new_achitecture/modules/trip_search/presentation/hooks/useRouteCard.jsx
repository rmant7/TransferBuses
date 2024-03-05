import React, { useState, useEffect } from 'react';
import { resultStyle } from '../components/searchResult/style';
import { useMediaQuery } from '@material-ui/core';
import directRoutes from '../../data/jsons/cheapTripData/direct_routes.json';
import { useSelector } from 'react-redux';

const useRouteCard = (route) => {
  const { filterBy } = useSelector((state) => {
    return state.cheapTripSearch;
  });
  const style = useMediaQuery('(max-width:650px)')
    ? resultStyle.sm
    : resultStyle.lg;

  const timeTravel = `${Math.floor(route.duration / 60)}h ${
    route.duration % 60
  }m`;
  console.log(route);

  const priceTravel = `€ ${route.price}`;

  const [travelInfo, setTravelInfo] = useState(null);
  useEffect(() => {
    if (!directRoutes) return;
    let tempKeys = route.direct_routes.split(',');
    let temp = [];
    tempKeys.forEach((key) => {
      const routeItem = {
        route: key,
        ...directRoutes[key],
      };
      temp.push(routeItem);
    });
    setTravelInfo(temp);
  }, [directRoutes, filterBy, route]);

  // useEffect(() => {
  //   console.log(travelInfo);
  // }, [travelInfo]);

  return { style, timeTravel, priceTravel, travelInfo };
};

export default useRouteCard;

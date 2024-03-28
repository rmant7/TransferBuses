import React, { useState, useEffect } from 'react';
import { resultStyle } from '../components/searchResult/style';
import { useMediaQuery } from '@material-ui/core';
import directRoutes from '../../data/jsons/cheapTripData/direct_routes.json';

const useRouteCard = (route) => {
  const style = useMediaQuery('(max-width:650px)')
    ? resultStyle.sm
    : resultStyle.lg;

  const calculateTravelTime = (duration) => {
    const days = Math.floor(duration / (24 * 60))
    const hours = Math.floor((duration % (24 * 60)) / 60)
    const minutes = duration % 60

    let displayTime = ''

    if(days > 0)
      displayTime += `${days}d`
    if(hours > 0)
      displayTime += ` ${hours}h`
    displayTime += ` ${minutes}min`

    return displayTime
  }

  const timeTravel = calculateTravelTime(route.duration)

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
  }, [directRoutes, route]);

  // useEffect(() => {
  //   console.log(travelInfo);
  // }, [travelInfo]);

  return { style, timeTravel, priceTravel, travelInfo };
};

export default useRouteCard;

import React, { useState, useEffect } from 'react';
import common_routes from '../../data/jsons/cheapTripData/routes.json';
import fixed_routes from '../../data/jsons/cheapTripData/fixed_routes.json';
import flying_routes from '../../data/jsons/cheapTripData/flying_routes.json';
import locations from '../../data/jsons/cheapTripData/locations.json';
import { asyncAutocomplete } from '../../domain/entites/CheapTripSearch/asyncAutocomplete';
import {
  SORT_OPTIONS,
  SORT_DIRECTION_OPTIONS,
} from '../../domain/entites/utils/constants/sortConstants';

const useCheapTripSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromKey, setFromKey] = useState('');
  const [toKey, setToKey] = useState('');
  const [asyncFromOptions, setAsyncFromOptions] = useState([]);
  const [asyncToOptions, setAsyncToOptions] = useState([]);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTION_OPTIONS[0]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filteredRoutes, setFilteredRoutes] = useState(null);
  const open = Boolean(anchorEl);

  const PAGINATION_LIMIT = 10;

  const routes = { ...flying_routes, ...fixed_routes, ...common_routes };

  // Here the routes with a common key will merge into an array like: 89091: [{...}, {...}]
  const routesForRender = {};
  for (const key in flying_routes) {
    routesForRender[key] = [flying_routes[key]];
  }
  for (const key in fixed_routes) {
    if (routesForRender[key]) {
      routesForRender[key].push(fixed_routes[key]);
    } else {
      routesForRender[key] = fixed_routes[key] ? [fixed_routes[key]] : [];
    }
  }
  for (const key in common_routes) {
    if (routesForRender[key]) {
      routesForRender[key].push(common_routes[key]);
    } else {
      routesForRender[key] = common_routes[key] ? [common_routes[key]] : [];
    }
  }

  const locationsKeysSorted = (function () {
    if (!locations) return;
    let temp = { ...locations };
    return Object.keys(temp).sort((a, b) => {
      return temp[a].name > temp[b].name ? 1 : -1;
    });
  })();

  const fromOptions = locationsKeysSorted
    ? locationsKeysSorted.map((key) => ({
        label: locations[key].name,
        key: key,
      }))
    : [];
  const toOptions = locationsKeysSorted
    ? [
        { label: 'Anywhere', key: '0' },
        ...locationsKeysSorted.map((key) => ({
          label: key !== '0' ? locations[key].name : '',
          key: key,
        })),
      ]
    : [];

  const cleanForm = () => {
    setFrom('');
    setTo('');
    setFromKey('');
    setToKey('');
    setSelectedRoutesKeys(null);
  };
  const submit = () => {
    if (from === '') return;
    let routesKeys = Object.keys(routes);
    const filteredByFrom = routesKeys.filter(
      (key) => routes[key].from === +fromKey
    );
    if (to === '') {
      setTo('Anywhere');
      setToKey('0');
    } else if (to === 'Anywhere') {
      // const sortedByPrice = filteredByFrom.sort(
      //   (a, b) => routes[a].price - routes[b].price
      // );
      // console.log(`in anywhere sortedByPrice`, sortedByPrice);
      setSelectedRoutesKeys(filteredByFrom);
    } else {
      const filteredByTo = filteredByFrom.filter(
        (key) => routes[key].to === +toKey
      );
      const sortedByPrice = filteredByTo.sort(
        (a, b) => routes[a].price - routes[b].price
      );
      setSelectedRoutesKeys(sortedByPrice);
    }
    setSortBy(SORT_OPTIONS[0]);
  };

  const startAsyncAutocomplete = (e, setState, options) => {
    // get geolocation
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    asyncAutocomplete(e, setState, options, geoLocation);
  };

  const checkFromOption =
    asyncFromOptions.length !== 0 ? asyncFromOptions : fromOptions;
  const checkToOption =
    asyncToOptions.length !== 0 ? asyncToOptions : toOptions;

  const selectFrom = (value) => {
    setFrom(value.label);
    setFromKey(value.key);
  };
  const selectTo = (value) => {
    setTo(value.label);
    setToKey(value.key);
  };

  const sortByDuration = (arr) => {
    const allRoutes = [].concat(...arr.map((key) => routesForRender[key]));
    return allRoutes.sort(
      (route1, route2) => route1.duration - route2.duration
    );
  };

  const sortByPrice = (arr) => {
    const allRoutes = [].concat(...arr.map((key) => routesForRender[key]));
    return allRoutes.sort((route1, route2) => route1.price - route2.price);
  };

  const sortByLayovers = (arr) => {
    const allRoutes = [].concat(...arr.map((key) => routesForRender[key]));
    return allRoutes.sort(
      (route1, route2) => route1.direct_routes - route2.direct_routes
    );
  };

  const openFilterMenu = (target) => {
    setAnchorEl(target);
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
  };

  const changeDirection = () => {
    sortDirection === SORT_DIRECTION_OPTIONS[0]
      ? setSortDirection(SORT_DIRECTION_OPTIONS[1])
      : setSortDirection(SORT_DIRECTION_OPTIONS[0]);
  };

  const selectSortBy = (value) => {
    setSortBy(value);
  };

  useEffect(() => {
    if (selectedRoutesKeys) {
      let sortedRoutes;
      switch (sortBy) {
        case SORT_OPTIONS[0]:
          sortedRoutes = sortByPrice([...selectedRoutesKeys]);
          break;
        case SORT_OPTIONS[1]:
          sortedRoutes = sortByDuration([...selectedRoutesKeys]);
          break;
        case SORT_OPTIONS[2]:
          sortedRoutes = sortByLayovers([...selectedRoutesKeys]);
          console.log(`in sorting by layovers`, sortedRoutes);
          break;
        default:
          return;
      }
      setFilteredRoutes(sortedRoutes);
    }
  }, [sortBy, selectedRoutesKeys]);

  return {
    from,
    selectFrom,
    selectTo,
    checkFromOption,
    to,
    checkToOption,
    cleanForm,
    submit,
    routes,
    filteredRoutes,
    PAGINATION_LIMIT,
    routesForRender,
    sortByDuration,
    sortByPrice,
    anchorEl,
    openFilterMenu,
    closeFilterMenu,
    open,
    sortDirection,
    sortBy,
    changeDirection,
    selectSortBy,
  };
};

export default useCheapTripSearch;

import React, { useState } from 'react';
import common_routes from '../../data/jsons/cheapTripData/routes.json';
import fixed_routes from '../../data/jsons/cheapTripData/fixed_routes.json';
import flying_routes from '../../data/jsons/cheapTripData/flying_routes.json';
import locations from '../../data/jsons/cheapTripData/locations.json';
import { asyncAutocomplete } from '../../domain/entites/CheapTripSearch/asyncAutocomplete';

const useCheapTripSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromKey, setFromKey] = useState('');
  const [toKey, setToKey] = useState('');
  const [asyncFromOptions, setAsyncFromOptions] = useState([]);
  const [asyncToOptions, setAsyncToOptions] = useState([]);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null);

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
  //console.log(routesForRender);

  const locationsKeysSorted = (function () {
    if (!locations) return;
    let temp = { ...locations };
    return Object.keys(temp).sort((a, b) => {
      return temp[a].name > temp[b].name ? 1 : -1;
    });
  })();

  const fromOptions = locationsKeysSorted
    ? locationsKeysSorted.map((key) => ({
        label: locations[key].name + ', ' + locations[key].country_name,
        key: key,
      }))
    : [];
  const toOptions = locationsKeysSorted
    ? [
        { label: 'Anywhere', key: '0' },
        ...locationsKeysSorted.map((key) => ({
          label:
            key !== '0'
              ? locations[key].name + ', ' + locations[key].country_name
              : '',
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
    // console.log(from)
    // console.log(fromKey)
    let routesKeys = Object.keys(routes);
    const filteredByFrom = routesKeys.filter(
      (key) => routes[key].from === +fromKey
    );
    if (to === '') {
      setTo('Anywhere');
      setToKey('0');
    } else if (to === 'Anywhere') {
      const sortedByPrice = filteredByFrom.sort(
        (a, b) => routes[a].euro_price - routes[b].euro_price
      );
      setSelectedRoutesKeys(sortedByPrice);
    } else {
      const filteredByTo = filteredByFrom.filter(
        (key) => routes[key].to === +toKey
      );
      const sortedByPrice = filteredByTo.sort(
        (a, b) => routes[a].euro_price - routes[b].euro_price
      );
      setSelectedRoutesKeys(sortedByPrice);
    }
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

  return {
    from,
    setFrom,
    setFromKey,
    checkFromOption,
    to,
    setTo,
    setToKey,
    checkToOption,
    cleanForm,
    submit,
    routes,
    selectedRoutesKeys,
    PAGINATION_LIMIT,
    routesForRender,
  }
};

export default useCheapTripSearch;

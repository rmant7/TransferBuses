import React, { useState, useEffect } from 'react';
import common_routes from '../../data/jsons/cheapTripData/routes.json';
import fixed_routes from '../../data/jsons/cheapTripData/fixed_routes.json';
import flying_routes from '../../data/jsons/cheapTripData/flying_routes.json';
import locations from '../../data/jsons/cheapTripData/locations.json';
import { asyncAutocomplete } from '../../domain/entites/CheapTripSearch/asyncAutocomplete';
import { SORT_OPTIONS } from '../../domain/entites/utils/constants/sortConstants';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilter,
  setFilteredRoutes,
} from '../redux/reducers/cheapTripSearch/cheapTripSearchSlice';

const useCheapTripSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromKey, setFromKey] = useState('');
  const [toKey, setToKey] = useState('');
  const [asyncFromOptions, setAsyncFromOptions] = useState([]);
  const [asyncToOptions, setAsyncToOptions] = useState([]);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null);
  const [inputValueFrom, setInputValueFrom] = useState('');
  const [inputValueTo, setInputValueTo] = useState('');
  const { filterBy, filteredRoutes } = useSelector((state) => {
    return state.cheapTripSearch;
  });
  const dispatch = useDispatch();

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

  const clearFromField = () => {
    setFrom('');
    setInputValueFrom('');
    setFromKey('');
  };
  const clearToField = () => {
    setTo('');
    setInputValueTo('');
    setToKey('');
  };

  const fromOptions = locationsKeysSorted
    ? locationsKeysSorted
        .map((key) => ({
          label: locations[key].name,
          key: key,
        }))
        .sort((a, b) => {
          if (
            a.label.toLowerCase().startsWith(inputValueFrom.toLowerCase()) &&
            !b.label.toLowerCase().startsWith(inputValueFrom.toLowerCase())
          )
            return -1;
        })
    : [];
  const toOptions = locationsKeysSorted
    ? [
        { label: 'Anywhere', key: '0' },
        ...locationsKeysSorted
          .map((key) => ({
            label: key !== '0' ? locations[key].name : '',
            key: key,
          }))
          .sort((a, b) => {
            if (
              a.label.toLowerCase().startsWith(inputValueTo.toLowerCase()) &&
              !b.label.toLowerCase().startsWith(inputValueTo.toLowerCase())
            )
              return -1;
          }),
      ]
    : [];

  const cleanForm = () => {
    setFrom('');
    setTo('');
    setFromKey('');
    setToKey('');
    setSelectedRoutesKeys(null);
    setInputFrom('');
    setInputValueTo('');
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
    dispatch(setFilter(SORT_OPTIONS[0]));
  };

  useEffect(() => {
    if (selectedRoutesKeys) {
      let sortedRoutes = [];
      switch (filterBy) {
        case SORT_OPTIONS[0]:
          sortedRoutes = sortByPrice([...selectedRoutesKeys]);
          break;
        case SORT_OPTIONS[1]:
          sortedRoutes = sortByDuration([...selectedRoutesKeys]);
          break;
        case SORT_OPTIONS[2]:
          sortedRoutes = sortByLayovers([...selectedRoutesKeys]);
          break;
        default:
          return;
      }

      dispatch(setFilteredRoutes(sortedRoutes));
    }
  }, [filterBy, selectedRoutesKeys]);

  // const startAsyncAutocomplete = (e, setState, options) => {
  //   // get geolocation
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     setGeoLocation({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });
  //   });
  //   asyncAutocomplete(e, setState, options, geoLocation);
  // };

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
      (route1, route2) =>
        route1.direct_routes.length - route2.direct_routes.length
    );
  };

  const setInputFrom = (value) => {
    setInputValueFrom(value);
  };
  const setInputTo = (value) => {
    setInputValueTo(value);
  };

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
    sortByDuration,
    sortByPrice,
    filterBy,
    clearFromField,
    clearToField,
    inputValueFrom,
    inputValueTo,
    setInputFrom,
    setInputTo,
  };
};

export default useCheapTripSearch;

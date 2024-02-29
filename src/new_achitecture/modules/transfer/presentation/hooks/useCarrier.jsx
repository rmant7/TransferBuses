import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading } from '../../../trip_search/presentation/redux/reducers/selectors';
import { timeZones } from '../carrierPage/timezones/timezones';
import cities_json from '../../../trip_search/domain/entites/utils/jsons/cities';
import citiesApi from './../../data/api/cityApi/api';
import { loadingUploadTransferAction } from '../../../trip_search/presentation/redux/reducers/actions/loading-actions';
import { uploadTransfer } from '../../../trip_search/data/api/data-service';
import i18n from '../../../../../i18n';

const useCarrier = () => {
  const dispatch = useDispatch();
  const cur = useSelector((state) => state.app.currency);
  const lang = useSelector((state) => state.app.lang);
  const loading = useSelector(getLoading).isLoadingNewTransfer;
  const [rideCurrency, setRideCurrency] = useState(cur);
  // const [messenger, setMessenger] = useState();
  // const [nearestCity, setNearestCity] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [userTimeZone, setUserTimeZone] = useState(() => {
    const timeZone = timeZones.find(
      (tz) => tz.shift === '' + new Date().getTimezoneOffset() / -60
    );
    return timeZone || timeZones[0];
  });

  const [message, setMessage] = useState({ type: 'info', msg: '' });
  const [open, setOpen] = useState(false);

  const submitForm = (values) => {
    console.log('SUBMITTING');
    const departureTimeGMT = values.departureTime.split(':');
    departureTimeGMT[0] -= values.timeZone;
    values.departureTime = departureTimeGMT.join(':');
    console.log(values);
    // dispatch(saveNewTransferAction(values));
    // history.push("/");
    dispatch(loadingUploadTransferAction(true));
    uploadTransfer(values)
      .then((response) => {
        console.log(response);
        setMessage({ type: 'success', msg: i18n.t('SuccessTrip') });
        dispatch(loadingUploadTransferAction(false));
        setOpen(true);
        // history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setMessage({ type: 'error', msg: error });
        setOpen(true);
      });
  };

  // !! Compute Distance Between current city and nearest City in autoComplete "From".
  const getDefaultCity = () => {
    cities_json.forEach((element) => {
      // debugger;
      let absLat = Math.round(latitude);
      let elementAbsLat = Math.round(element.latitude);
      let absLng = Math.round(longitude);
      let elementAbsLng = Math.round(element.longitude);
      if (absLat === elementAbsLat && absLng === elementAbsLng) {
        console.log('est');
      } else {
        const getDistance = (cityLat, cityLng) => {
          const R = 6371e3;
          const φ1 = (latitude * Math.PI) / 180; // φ, λ in radians
          const φ2 = (cityLat * Math.PI) / 180;
          const Δφ = ((cityLat - latitude) * Math.PI) / 180;
          const Δλ = ((cityLng - longitude) * Math.PI) / 180;
          const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = R * c; // in metres
          return d;
        };
        const getNearestCity = (arr) => {
          let lowest = {};
          let temp;
          arr.forEach((element) => {
            if (
              Object.keys(lowest).length === 0 &&
              lowest.constructor === Object
            ) {
              lowest = {
                id: element.id,
                Name: element.Name,
                distanceBetween: element.distanceBetween,
              };
            } else {
              temp = element.distanceBetween;
              if (temp < lowest)
                lowest = {
                  id: element.id,
                  Name: element.Name,
                  distanceBetween: element.distanceBetween,
                };
            }
          });
          return lowest;
        };
        let intervals = cities_json.map((element) => {
          return {
            id: element.ID,
            Name: element.name,
            distanceBetween: getDistance(element.latitude, element.longitude),
          };
        });
        //console.log(intervals);
      }
      // console.log(intervals);
    });
    // console.log("Nearest City", getNearestCity(intervals));
  };

  const cities =
    lang === 'ru'
      ? [
          ...cities_json
            .reduce((acc, val) => {
              acc.push({ id: val.ID, title: val['name_ru'] });
              return acc;
            }, [])
            .sort((a, b) => (a.title < b.title ? -1 : 1)),
          ...cities_json
            .reduce((acc, val) => {
              acc.push({ id: val.ID, title: val.name });
              return acc;
            }, [])
            .sort((a, b) => (a.title < b.title ? -1 : 1)),
        ]
      : cities_json
          .reduce((acc, val) => {
            acc.push({ id: val.ID, title: val.name });
            acc.push({ id: val.ID, title: val['name_ru'] });
            return acc;
          }, [])
          .sort((a, b) => (a.title < b.title ? -1 : 1));

  useEffect(() => {
    let startPos;
    const geoSuccess = function (position) {
      startPos = position;
      setLatitude(startPos.coords.latitude);
      setLongitude(startPos.coords.longitude);
      citiesApi.get(startPos.coords.latitude, startPos.coords.longitude);
    };
    // geolocation determination is temporary commented out. To turn it on, uncomment the line bellow
    // navigator.geolocation.getCurrentPosition(geoSuccess);
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getDefaultCity();
    }
  });

  const carrierData = {
    loading,
    rideCurrency,
    setRideCurrency,
    cities,
    message,
    open,
    setOpen,
    latitude,
    longitude,
    submitForm,
    getDefaultCity,
    userTimeZone,
  };

  return {
    ...carrierData,
  };
};

export default useCarrier;

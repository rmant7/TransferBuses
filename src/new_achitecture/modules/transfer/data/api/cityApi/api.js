import axios from 'axios';

const BASE_URL = 'https://cheaptrip.guru:8443/CheapTrip';

const citiesApi = {
  get: (lat, long) =>
    axios(
      BASE_URL + `format=json&lat=${lat}&lon=${long}&accept-language=en`
    ).then(({ data }) => data),
};

export default citiesApi;

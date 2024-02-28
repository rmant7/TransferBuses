import axios from "axios";

const instance = axios.create({
  baseURL: 'https://cheaptrip.guru:8443/CheapTrip'
})

export const getCurrencies = () => {
  return instance.get(`GetCurrencyRate`)
    .then(response => {
      return response.data;
    });
}
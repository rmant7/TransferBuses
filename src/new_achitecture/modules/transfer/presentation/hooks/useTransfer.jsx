import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { currencies } from '../currenciesSelector/currencies';
import cities from './../../../trip_search/domain/entites/utils/jsons/cities';
import i18n from '../../../../../i18n';
import {getCurrency, getLanguage} from "../../../../general/redux/selectors";

const useTransfer = (transfer, id) => {
  const globalCurrencyCode = useSelector(getCurrency);
  const history = useHistory();
  const lang = useSelector(getLanguage);
  const cityFrom = cities.find((city) => city.ID === transfer.from);
  const cityTo = cities.find((city) => city.ID === transfer.to);
  let priceNum;
  let priceToDisplay;

  // check if currency selected in app (globalCurrency)
  const globalCurrency = currencies.find(
    (cur) => cur.code === globalCurrencyCode
  );
  const transferCurrency =
    currencies.find((cur) => cur.code === transfer.currency) ||
    currencies.find((cur) => cur.code === 'EUR');

  console.log('depTime = ', transfer.departureTime);
  console.log('transferPage.timeZone = ', transfer.timeZone);
  //const timeZoneName = timeZones.find(tz => tz.shift === transferPage.timeZone)?.name
  const timeZoneName =
    'GMT+' + transfer.timeZone + ' ' + i18n.t('timezone.' + transfer.timeZone);

  const departureTimeSplit = transfer.departureTime.split(':');

  if (currencies.map((cur) => cur.code).includes(transfer.currency)) {
    // IF transferPage.currency IS IN THE currencies ARRAY

    if (transfer.currency === globalCurrencyCode) {
      // NO NEED TO RECALCULATE IF CURRENCIES ARE EQUAL
      priceNum = transfer.price;
    } else {
      priceNum =
        Math.round(
          ((transfer.price * globalCurrency.oneEuroRate) /
            transferCurrency.oneEuroRate +
            Number.EPSILON) *
            100
        ) / 100;
    }
  } else {
    // IF transferPage.currency IS not IN THE currencies ARRAY, ASSUME IT IS EURO
    if (globalCurrencyCode === 'EUR') {
      priceNum = transfer.price;
    } else {
      priceNum =
        Math.round(
          (transfer.price * globalCurrency.oneEuroRate + Number.EPSILON) * 100
        ) / 100;
    }
  }

  if (globalCurrencyCode === 'USD') {
    priceToDisplay = globalCurrency.r2rSymbol + priceNum;
  } else {
    priceToDisplay = priceNum + ' ' + globalCurrency.r2rSymbol;
  }
  return { priceToDisplay, history, cityFrom, cityTo, departureTimeSplit, lang };
};

export default useTransfer;

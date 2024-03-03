import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import RouteCard from './RouteCard';
import s from './cheaptrip.module.css';
import classes from '../../../presentation/components/searchResult/SearchComponent.module.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Button } from '@material-ui/core';
import i18n from '../utils/language/i18n';
import useCheapTripSearch from '../../../presentation/hooks/useCheapTripSearch';

function CheapTripSearch(props) {
  const {
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
  } = useCheapTripSearch();

  return (
    <div>
      <form action='' className={s.autocomplete}>
        <Autocomplete
          value={from || null}
          onChange={(e, newValue) => {
            setFrom(newValue ? newValue.label : '');
            console.log(newValue);
            setFromKey(newValue ? newValue.key : '');
          }}
          // onInputChange={(e) => startAsyncAutocomplete(e, setAsyncFromOptions, fromOptions)}
          disablePortal
          blurOnSelect
          openOnFocus
          options={checkFromOption}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label='From' />}
          isOptionEqualToValue={(option, value) => option.label === value}
        />
        <DoubleArrowIcon className={classes.media_icon} />
        <Autocomplete
          value={to || null}
          onChange={(e, newValue) => {
            setTo(newValue ? newValue.label : '');
            setToKey(newValue ? newValue.key : '');
          }}
          // onInputChange={(e) => startAsyncAutocomplete(e, setAsyncToOptions, toOptions)}
          disablePortal
          blurOnSelect
          openOnFocus
          options={checkToOption}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label='To' />}
          isOptionEqualToValue={(option, value) => option.label === value}
        />
      </form>
      <div className={classes.filter_buttons}>
        <Button variant='outlined' onClick={cleanForm} type='reset'>
          {i18n.t('Clean')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={submit}
          style={{ marginLeft: '10px' }}
          type='button'
        >
          {i18n.t("Let's Go")}
        </Button>
      </div>
      <div>
        {routes &&
          selectedRoutesKeys &&
          selectedRoutesKeys
            .sort(
              (a, b) =>
                routes[a].direct_routes.length - routes[b].direct_routes.length
            )
            .slice(0, PAGINATION_LIMIT)
            .map((key) => {
              return routesForRender[key].map((route, index) => {
                return <RouteCard route={route} key={key + index} />;
              });
            })}
        {routes && selectedRoutesKeys && selectedRoutesKeys.length === 0 && (
          <p>No such routes</p>
        )}
      </div>
    </div>
  );
}

export default CheapTripSearch;

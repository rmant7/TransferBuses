import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import RouteCard from './RouteCard';
import s from './cheaptrip.module.css';
import classes from '../../../presentation/components/searchResult/SearchComponent.module.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Button, InputLabel, Menu, MenuItem, Select } from '@material-ui/core';
import i18n from '../utils/language/i18n';
import useCheapTripSearch from '../../../presentation/hooks/useCheapTripSearch';
import {
  SORT_OPTIONS,
  SORT_DIRECTION_OPTIONS,
} from '../utils/constants/sortConstants';

function CheapTripSearch(props) {
  const {
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
    openFilterMenu,
    closeFilterMenu,
    anchorEl,
    open,
    sortDirection,
    sortBy,
    filterBy,
    changeDirection,
    selectSortBy,
  } = useCheapTripSearch();

  const handleSelectFrom = (value) => {
    selectFrom(value);
  };
  const handleSelectTo = (value) => {
    selectTo(value);
  };

  const handleCleanForm = () => {
    cleanForm();
  };
  const handleSubmit = () => {
    submit();
  };

  const handleOpenFilter = (event) => {
    openFilterMenu(event.currentTarget);
  };
  const handleCloseFilter = () => {
    closeFilterMenu(null);
  };

  const handleChangeDirection = (event) => {
    changeDirection(event.target.value);
  };

  const handleSelectSortBy = (event) => {
    selectSortBy(event.target.value);
  };

  return (
    <div>
      <form action='' className={s.autocomplete}>
        <Autocomplete
          value={from || null}
          onChange={(e, newValue) => {
            handleSelectFrom(newValue ? newValue : '');
          }}
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
            handleSelectTo(newValue ? newValue : '');
          }}
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
        <Button variant='outlined' onClick={handleCleanForm} type='reset'>
          {i18n.t('Clean')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          style={{ marginLeft: '10px' }}
          type='button'
        >
          {i18n.t("Let's Go")}
        </Button>
      </div>
      <div>
        {routes && filteredRoutes ? (
          <>
            <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={filterBy}
              label='Sort'
              onChange={handleSelectSortBy}
            >
              {SORT_OPTIONS.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : null}
        {routes &&
          filteredRoutes &&
          filteredRoutes
            // .sort(
            //   (a, b) =>
            //     routes[a].direct_routes.length - routes[b].direct_routes.length
            // )
            .slice(0, PAGINATION_LIMIT)
            .map((route, index) => {
              // return routesForRender[key]
              // .sort((route1, route2) => route1.price - route2.price)
              // .map((route, index) => {
              return <RouteCard route={route} key={route + index} />;
              // });
            })}
        {routes && filteredRoutes && filteredRoutes.length === 0 && (
          <p>No such routes</p>
        )}
      </div>
    </div>
  );
}

export default CheapTripSearch;

import React, { useEffect } from 'react'
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import { Button, Menu } from '@material-ui/core';
import useCheapTripSearch from '../../hooks/useCheapTripSearch';
import s from './../../../domain/entites/CheapTripSearch/cheaptrip.module.css';
import classes from './../../../presentation/components/searchResult/SearchComponent.module.css'
import i18n from './../../../domain/entites/utils/language/i18n';
import ClearIcon from '@material-ui/icons/Clear';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const SearchForm = () => {
  const {
    from,
    selectFrom,
    selectTo,
    checkFromOption,
    to,
    checkToOption,
    cleanForm,
    submit,
    clearFromField,
    clearToField,
    inputValueFrom,
    inputValueTo,
    setInputFrom,
    setInputTo,
  } = useCheapTripSearch();

  const handleSelectFrom = (value) => {
    selectFrom(value);
  };
  const handleSelectTo = (value) => {
    selectTo(value);
  };

  const handleClearInput = (value) => {
    value === 'from' ? clearFromField() : clearToField();
  };

  const handleCleanForm = () => {
    cleanForm();
  };
  const handleSubmit = () => {
    submit();
  };

  const handleFromInputValue = (value) => {
    setInputFrom(value);
  };
  const handleToInputValue = (value) => {
    setInputTo(value);
  };

  let inputFromStyle = {
    color: 'rgb(118, 118, 118)',
  };
  let inputToStyle = {
    color: 'rgb(118, 118, 118)',
  };

  return (
    <>
          <form action='' className={s.autocomplete}>
        <Autocomplete
          value={from || null}
          onChange={(e, newValue) => {
            handleSelectFrom(newValue ? newValue : '');
          }}
          onInputChange={(e, newValue) => {
            handleFromInputValue(newValue);
          }}
          inputValue={inputValueFrom}
          disablePortal
          freeSolo
          blurOnSelect
          openOnFocus
          options={checkFromOption}
          sx={{ width: '100%' }}
          onFocus={() => (inputFromStyle = { color: '#ff5722' })}
          onBlur={() => (inputFromStyle = { color: 'rgb(118, 118, 118)' })}
          disableClearable
          ListboxProps={{ style: { maxHeight: 140 } }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='From'
              variant='standard'
              InputLabelProps={{
                style: inputFromStyle,
              }}
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'rgb(118, 118, 118)',
                },
                '& .MuiInput-underline:after': { borderBottomColor: '#ff5722' },
              }}
            />
          )}
          isOptionEqualToValue={(option, value) => option.label === value}
        />
        <ClearIcon
          style={{ color: 'rgb(118, 118, 118)' }}
          onClick={() => {
            handleClearInput('from');
          }}
        />
        <DoubleArrowIcon className={classes.media_icon} />
        <Autocomplete
          value={to || null}
          onChange={(e, newValue) => {
            handleSelectTo(newValue ? newValue : '');
          }}
          onInputChange={(e, newValue) => {
            handleToInputValue(newValue);
          }}
          inputValue={inputValueTo}
          disablePortal
          freeSolo
          blurOnSelect
          openOnFocus
          options={checkToOption}
          sx={{ width: '100%' }}
          onFocus={() => (inputToStyle = { color: '#ff5722' })}
          onBlur={() => (inputToStyle = { color: 'rgb(118, 118, 118)' })}
          disableClearable
          ListboxProps={{ style: { maxHeight: 140 } }}
          renderInput={(params) => (
            <TextField
              {...params}
              label='To'
              variant='standard'
              InputLabelProps={{
                style: inputToStyle,
              }}
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'rgb(118, 118, 118)',
                },
                '& .MuiInput-underline:after': { borderBottomColor: '#ff5722' },
              }}
            />
          )}
          isOptionEqualToValue={(option, value) => option.label === value}
        />
        <ClearIcon
          style={{ color: 'rgb(118, 118, 118)' }}
          onClick={() => {
            handleClearInput('to');
          }}
        />
      </form>
      <div className={classes.filter_buttons}>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleCleanForm}
          type='reset'
          disableElevation // disable shade
          style={{ textTransform: 'none' }}
        >
          {/* {i18n.t('Clear form')} */}
          Clear form
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          style={{ marginLeft: '10px', textTransform: 'none', color: '#fff' }}
          type='button'
          disableElevation
          disabled={to === '' || from === ''}
        >
          {/* {i18n.t("Let's go")} */}
          Let's go
        </Button>
      </div>
    </>
  )
}

export default SearchForm
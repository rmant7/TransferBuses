import React from 'react';
import { Button } from '@material-ui/core';
import useCheapTripSearch from '../../hooks/useCheapTripSearch';
import s from './../../../domain/entites/CheapTripSearch/cheaptrip.module.css';
import classes from './../../../presentation/components/searchResult/SearchComponent.module.css';
import i18n from './../../../domain/entites/utils/language/i18n';
import ClearIcon from '@material-ui/icons/Clear';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AutocompleteEl from './AutocompleteEl/AutocompleteEl';
import { inputFromStyle, inputToStyle, basicColor } from './searchFormStyles';

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

  return (
    <>
      <form action='' className={s.autocomplete}>
        <AutocompleteEl
          value={from || null}
          handleChange={handleSelectFrom}
          handleInputChange={handleFromInputValue}
          inputValue={inputValueFrom}
          options={checkFromOption}
          textFieldLabel={'From'}
          inputStyle={inputFromStyle}
        />
        <ClearIcon
          style={basicColor}
          onClick={() => {
            handleClearInput('from');
          }}
        />
        <DoubleArrowIcon className={classes.media_icon} />
        <AutocompleteEl
          value={to || null}
          handleChange={handleSelectTo}
          handleInputChange={handleToInputValue}
          inputValue={inputValueTo}
          options={checkToOption}
          textFieldLabel={'To'}
          inputStyle={inputToStyle}
        />
        <ClearIcon
          style={basicColor}
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
          {i18n.t('Clear form')}
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
          {i18n.t("Let's go")}
        </Button>
      </div>
    </>
  );
};

export default SearchForm;

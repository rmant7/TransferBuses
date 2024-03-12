import { Autocomplete } from '@mui/material';
import React from 'react';
import {
  inputFromStyle,
  inputToStyle,
  basicColor,
  colorOnFocus,
  colorOnBlur,
  sxForTextField,
  sxForAutocomplete,
} from './../searchFormStyles';
import { TextField } from '@material-ui/core';

const AutocompleteEl = ({
  value,
  handleChange,
  handleInputChange,
  inputValue,
  options,
  textFieldLabel,
  inputStyle,
}) => {
  console.log(value);
  return (
    <Autocomplete
      value={value || null}
      onChange={(e, newValue) => {
        handleChange(newValue ? newValue : '');
      }}
      onInputChange={(e, newValue) => {
        handleInputChange(newValue);
      }}
      inputValue={inputValue}
      disablePortal
      freeSolo
      blurOnSelect
      openOnFocus
      options={options}
      sx={sxForAutocomplete}
      onFocus={() => (inputStyle = { colorOnFocus })}
      onBlur={() => (inputStyle = colorOnBlur)}
      disableClearable
      ListboxProps={{ style: { maxHeight: 140 } }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={textFieldLabel}
          variant='standard'
          InputLabelProps={{
            style: inputStyle,
          }}
          sx={sxForTextField}
        />
      )}
      isOptionEqualToValue={(option, value) => option.label === value}
    />
  );
};

export default AutocompleteEl;

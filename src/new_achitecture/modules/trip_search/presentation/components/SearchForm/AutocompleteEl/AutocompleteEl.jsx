import React, { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  colorOnFocus,
  colorOnBlur,
  sxForTextField,
  sxForAutocomplete,
} from './../searchFormStyles';

const AutocompleteEl = ({
  value,
  handleChange,
  handleInputChange,
  inputValue,
  options,
  textFieldLabel,
  inputStyle,
}) => {
  const filterOptions = createFilterOptions({
    matchFrom: [2],
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(inputValue.length >= 2 ? true : false);
  }, [inputValue]);

  return (
    <Autocomplete
      value={value || null}
      onChange={(e, newValue) => {
        handleChange(newValue ? newValue : '');
        setTimeout(() => setIsOpen(false), 100);
      }}
      onInputChange={(e, newValue) => {
        handleInputChange(newValue);
      }}
      inputValue={inputValue}
      disablePortal
      freeSolo
      blurOnSelect
      disableClearable
      filterOptions={filterOptions}
      options={options}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={sxForAutocomplete}
      onFocus={() => (inputStyle = colorOnFocus)}
      onBlur={() => (inputStyle = colorOnBlur)}
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

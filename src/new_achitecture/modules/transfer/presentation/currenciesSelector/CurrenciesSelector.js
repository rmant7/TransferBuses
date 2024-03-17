import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { currencies } from './currencies';
import { useStyles } from '../../../../general/MUI/useStyles';
import {setCurrency} from "../../../../general/redux/slices/appSettingsSlice";
import {getCurrency} from "../../../../general/redux/selectors";

const CurrenciesSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cur = useSelector(getCurrency);

  const handleClick = (code) => {
    localStorage.setItem('currency', code);
    dispatch(setCurrency(code));
  };
  return (
    <FormControl>
      <Select
        className={classes.whiteSelect}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        value={cur}
        renderValue={(value) => `${value.toUpperCase()}`}
        disableUnderline
      >
        {currencies.map((item) => {
          return (
            <MenuItem key={item.code} onClick={() => handleClick(item.code)}>
              {item.code + `  ` + item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CurrenciesSelector;

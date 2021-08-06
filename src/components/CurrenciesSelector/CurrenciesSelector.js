import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../utils/useStyles';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { currencies } from '../../utils/currencies';
import { setCurrency } from '../../redux/reducers/appReducer';

const CurrenciesSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cur = useSelector((state) => state.app.currency);
  return (
    <FormControl>
      <Select
        inputProps={{
          classes: {
            root: classes.select,
            icon: classes.icon,
          },
        }}
        value={cur}
        renderValue={(value) => `${value.toUpperCase()}`}
        disableUnderline>
        {currencies.map((item) => {
          return (
            <MenuItem key={item.code} onClick={() => dispatch(setCurrency(item.code))}>
              {item.code + `  ` + item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CurrenciesSelector;

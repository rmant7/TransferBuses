import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../utils/useStyles';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { currencies } from '../../utils/currencies';
import { setCurrency } from '../../redux/reducers/appReducer';
import { getCurrency } from '../../redux/selectors';
import { setCurrencyAction } from '../../redux/actions/appActions';

const CurrenciesSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cur = useSelector(getCurrency);
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
        renderValue={value => `${value.toUpperCase()}`}
        disableUnderline
      >
        {currencies.map(item => {
          return (
            <MenuItem
              key={item.code}
              onClick={() => {
                localStorage.setItem("currency", item.code);
                dispatch(setCurrencyAction(item.code));
              }}
            >
              {item.code + `  ` + item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CurrenciesSelector;

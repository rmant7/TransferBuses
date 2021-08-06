import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { useStyles } from '../../utils/useStyles';
import { languages } from '../../utils/languages';
import { setLanguage } from '../../redux/reducers/appReducer';

const LanguageSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang);

  return (
    <FormControl>
      <Select
        inputProps={{
          classes: {
            root: classes.select,
            icon: classes.icon,
          },
        }}
        value={lang}
        renderValue={(value) => `${value.toUpperCase()}`}
        disableUnderline>
        {languages.map((lng) => {
          return (
            <MenuItem key={lng.locale} onClick={() => dispatch(setLanguage(lng.locale))}>
              <img className={classes.flag} src={lng.icon} alt={lng.label} />
              {lng.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;

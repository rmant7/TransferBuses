import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { useStyles } from '../../utils/useStyles';
import { languages } from '../../utils/languages';
import { setLanguage } from '../../redux/reducers/appReducer';
import {useTranslation} from "react-i18next";



const LanguageSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.app.lang);

  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n
      .changeLanguage(language)
      .then()
      .catch((err) => console.error(err));
  };

  return (
    <FormControl>
      <Select
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        value={lang}
        renderValue={(value) => `${value.toUpperCase()}`}
        disableUnderline>
        {languages.map((lng) => {
          return (
            <MenuItem key={lng.locale} onClick={() => {
              localStorage.setItem("locale", lng.locale);
              changeLanguage(lng.locale);
              dispatch(setLanguage(lng.locale))
            }}>
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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { languages } from './languages';
import {useTranslation} from "react-i18next";
import { getLanguage } from '../../../../../presentation/redux/reducers/selectors';
import { setLanguageAction } from '../../../../../presentation/redux/reducers/actions/app-actions';
import {useStyles} from "../../../../../../../general/MUI/useStyles";



const LanguageSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lang = useSelector(getLanguage);

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
        className={classes.whiteSelect}
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        value={lang}
        renderValue={value => `${value.toUpperCase()}`}
        disableUnderline
      >
        {languages.map(lng => {
          return (
            <MenuItem
              key={lng.locale}
              onClick={() => {
                localStorage.setItem("locale", lng.locale);
                changeLanguage(lng.locale);
                dispatch(setLanguageAction(lng.locale));
              }}
            >
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

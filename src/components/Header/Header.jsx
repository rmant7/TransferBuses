import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
// import { Trans, useTranslation } from "react-i18next";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import currenciesList from "../../currencies.json"
import {Divider} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const languagesList = [
  {locale: "en", label: "English"},
  {locale: "ru", label: "Русский"},
  {locale: "ua", label: "Українська"},
]

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#fff",
    },
  },
});

const preferableCurrencies = ['EUR', 'USD', 'RUB', 'UAH', 'BYN', 'ILS', 'INR']

export default function Header({changeLanguage}) {
  const history = useHistory();

  const topCurrencies = preferableCurrencies
    .map(cur => currenciesList.find(item => item.IsoCode === cur))

  const otherCurrencies = currenciesList
    .filter(item => !preferableCurrencies.includes(item.IsoCode))
    // .slice(0,7)
    .sort((a, b) => {
      return a.IsoCode < b.IsoCode ? -1 : 1
    })

  const [currency, setCurrency] = React.useState(localStorage.getItem('currency')
    || preferableCurrencies[0] || 'EUR');


  const [locale, setLocale] = React.useState(localStorage.getItem('locale') || 'en');
  const handleLocaleChange = (event) => {
    localStorage.setItem('locale', event.target.value);
    setLocale(event.target.value)
    changeLanguage(event.target.value)
  }

  const handleCurrencyChange = (event) => {
    localStorage.setItem('currency', event.target.value);
    setCurrency(event.target.value)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3" onClick={() => history.push("/")}
                        style={{"cursor": "pointer"}}
            >TransferBuses</Typography>
            <Grid
              container
              spacing={2}
              alignItems="baseline"
              justifyContent="flex-end"
              item
              xs
            >
              <Button color="inherit">Login</Button>
              <FormControl>
                <Select
                  labelId="currencies-select-label"
                  id="currencies-select"
                  value={currency}
                  onChange={handleCurrencyChange}
                  renderValue={(value) => `${value}`}
                  disableUnderline
                >
                  {topCurrencies.map(cur => {
                    return <MenuItem value={cur.IsoCode}>{`${cur.IsoCode} ${cur.currency}`}</MenuItem>
                  })}
                  <Divider/>
                  {otherCurrencies.map(cur => {
                    return <MenuItem value={cur.IsoCode}>{`${cur.IsoCode} ${cur.currency}`}</MenuItem>
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={locale}
                  onChange={handleLocaleChange}
                  renderValue={(value) => `${value.toUpperCase()}`}
                  disableUnderline
                >
                  {languagesList.map(lng => {
                    return <MenuItem value={lng.locale}>{lng.label}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

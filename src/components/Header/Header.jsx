import React, {useEffect} from "react";
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
// import currenciesList from "../../currencies.json"
import {Divider} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import axios from "axios";

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
let topCurrencies = [];
let otherCurrencies = [];

const instance = axios.create({
  baseURL: 'https://cheaptrip.guru:8443/CheapTrip'
})

const getCurrencies = () => {
  return instance.get(`GetCurrencyRate`)
    .then(response => {
      return response.data;
    });
}

export default function Header({changeLanguage}) {
  const [currenciesList, setCurrenciesList] = React.useState([
    {
      "name": "Euro",
      "code": "EUR",
      "oneEuroRate": 1.0,
      "r2rSymbol": "€"
    },
  ]);


  useEffect(() => {
    getCurrencies().then(res => {
      setCurrenciesList([...res])
    })
  }, [])

  const history = useHistory();

  if (currenciesList.length > 1) {
    topCurrencies = preferableCurrencies
      .map(cur => currenciesList.find(item => {
        return item.code === cur
      }))
    otherCurrencies = currenciesList
      .filter(item => !preferableCurrencies.includes(item.code))
      // .slice(0,7)
      .sort((a, b) => {
        return a.code < b.code ? -1 : 1
      })
  }

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
                    return <MenuItem value={cur.code} id={cur.code + cur.name}>{`${cur.code} ${cur.name}`}</MenuItem>
                  })}
                  <Divider/>
                  {otherCurrencies.map(cur => {
                    return <MenuItem value={cur.code} id={cur.code + cur.name}>{`${cur.code} ${cur.name}`}</MenuItem>
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
                    return <MenuItem value={lng.locale} id={lng.locale + lng.label}>{lng.label}</MenuItem>
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

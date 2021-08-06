import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { AppRouter, Navbar } from './components';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { theme } from './utils/useStyles';
function App() {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n
      .changeLanguage(language)
      .then()
      .catch((err) => console.error(err));
  };
  i18n.reloadResources().then();
  const lang = useSelector((state) => state.app.lang);
  useEffect(() => {
    changeLanguage(lang);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;

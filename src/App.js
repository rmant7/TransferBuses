import React, { useState, useEffect } from 'react';
import './App.css';
import { AppRouter, Navbar, Sidebar } from './components';
import { ThemeProvider } from '@material-ui/core/styles';
import Header from './components/Header/Header';
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

  useEffect(() => {
    changeLanguage(localStorage.getItem('locale') || 'en');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {/* <Route path="/" render={() => <Header changeLanguage={changeLanguage} />} /> */}
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;

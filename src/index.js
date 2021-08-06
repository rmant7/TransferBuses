import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import './i18n.js';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
      dark: '#c41c00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#607d8b',
      dark: '#34515e',
      contrastText: '#fff',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

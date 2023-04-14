import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import 'typeface-roboto';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Box, LinearProgress } from '@material-ui/core';

console.log(performance.now())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <Suspense fallback={<div>loading...</div>}> */}
        <Suspense fallback={
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        }>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

console.log(performance.now())
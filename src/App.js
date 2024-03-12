import React from 'react';
// import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core';
import HeaderComponent from './new_achitecture/modules/mainPage/presentation/components/HeaderComponent/HeaderComponent';
import { AppRouter } from './new_achitecture/general/routes/AppRouter';
import { theme } from './new_achitecture/general/MUI/useStyles';
import useApp from './new_achitecture/general/hooks/useApp';

function App() {
  const { i18n, lang } = useApp();

  console.log(
    'process.env.REACT_APP_BUILD_MODE = ',
    process.env.REACT_APP_BUILD_MODE
  );

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <HeaderComponent />
        {/* <Navbar/> */}
        <AppRouter />
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
// import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core';
import HeaderComponent from './new_achitecture/modules/mainPage/presentation/components/HeaderComponent/HeaderComponent';
import { AppRouter } from './new_achitecture/general/routes/AppRouter';
import { theme } from './new_achitecture/general/MUI/useStyles';
import useApp from './new_achitecture/general/hooks/useApp';
import {useLocation} from "react-router";
import {PAGES_WITH_MUI_HEADER} from "./new_achitecture/general/routes/publicRoutes";

function App() {
  const { i18n, lang } = useApp();
  const { pathname } = useLocation();
    console.log(pathname);
  console.log(
    'process.env.REACT_APP_BUILD_MODE = ',
    process.env.REACT_APP_BUILD_MODE
  );

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>
          {
              (PAGES_WITH_MUI_HEADER.includes(pathname))?<CityHeaderComponent/>:<></>
          }
        {/* <Navbar/> */}
        <AppRouter />
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;

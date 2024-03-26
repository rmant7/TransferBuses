import React from 'react';
// import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core';
import Header from './new_achitecture/modules/Header/presentation/components/HeaderComponent';
import { AppRouter } from './new_achitecture/general/routes/AppRouter';
import { theme } from './new_achitecture/general/MUI/useStyles';
import useChangeLanguage from './new_achitecture/general/hooks/useChangeLanguage';
import { useLocation } from 'react-router';
import PlayStoreModal from './new_achitecture/general/components/PlayStoreModal/PlayStoreModal';
import usePlayStoreModal from './new_achitecture/general/hooks/usePlayStoreModal';

function App() {
  const { i18n, lang } = useChangeLanguage();
  const {open} = usePlayStoreModal();
  const { pathname } = useLocation();
  // console.log(
  //   'process.env.REACT_APP_BUILD_MODE = ',
  //   process.env.REACT_APP_BUILD_MODE
  // );

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <Header />
        {open ? <PlayStoreModal open={open} /> : null}
        {/* 
          {
              (!pathname || PAGES_WITH_MUI_HEADER.includes(pathname))?
                  <MainHeader/>
                  :<CityHeaderComponent/>
          } */}
        <AppRouter />
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;

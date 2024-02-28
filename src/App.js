import React, {useEffect} from "react";
import {useSelector} from "react-redux";
// import './App.css';
import {ThemeProvider} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";
import {StylesProvider} from "@material-ui/core";
import HeaderComponent
    from "./new_achitecture/modules/mainPage/presentation/components/HeaderComponent/HeaderComponent";
import {AppRouter} from "./new_achitecture/general/routes/AppRouter";
import {theme} from "./new_achitecture/general/MUI/useStyles";

function App() {
    const {i18n} = useTranslation();
    const changeLanguage = (language) => {
        i18n
            .changeLanguage(language)
            .then()
            .catch((err) => console.error("error ", err));
    };
    i18n.reloadResources().then();
    const lang = useSelector((state) => state.app.lang);
    useEffect(() => {
        changeLanguage(lang);
    }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

    console.log(
        "process.env.REACT_APP_BUILD_MODE = ",
        process.env.REACT_APP_BUILD_MODE
    );

    return (
        <ThemeProvider theme={theme}>
            <StylesProvider>
                <HeaderComponent/>
                {/* <Navbar/> */}
                <AppRouter/>
            </StylesProvider>
        </ThemeProvider>
    );
}

export default App;

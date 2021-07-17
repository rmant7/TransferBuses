import {Route, Switch} from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import BusPage from "./components/BusPage/BusPage";
import PassengerPage from "./components/PassengerPage/PassengerPage";
import DriverPage from "./components/DriverPage/DriverPage";
import TransferPage from "./components/TransferPage/TransferPage";
import Header from "./components/Header/Header";
import {useTranslation} from "react-i18next"
import {useEffect} from "react";

function App() {



  const {i18n} = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
      .then(
      )
      .catch(err => console.error(err))
  }

  i18n.reloadResources()
    .then(
    )

  useEffect(() => {
    changeLanguage(localStorage.getItem('locale')||'en')
  }, []);


  return (
    <div>
      {/*{t("translation.part1")}*/}
      {/*<Route path="/" component={Header} />*/}

      <Route path="/"
             render={() => (
               <Header changeLanguage={changeLanguage}/>
             )}/>
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/viewRoutes" component={PassengerPage}/>
        <Route path="/addRoute" component={BusPage}/>
        <Route path="/addTransfer" component={DriverPage}/>
        <Route path="/transfer" component={TransferPage}/>
      </Switch>
    </div>
  );
}

export default App;

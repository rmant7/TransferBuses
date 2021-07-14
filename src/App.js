
import { Switch, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import BusPage from "./components/BusPage/BusPage";
import PassangerPage from "./components/PassengerPage/PassengerPage";
import DriverPage from "./components/DriverPage/DriverPage";
import TransferPage from "./components/TransferPage/TransferPage";
import Header from "./components/Header/Header";
import {Trans, useTranslation} from "react-i18next"

function App() {

const {t, i18n} = useTranslation();
const changeLanguage = (language) => {i18n.changeLanguage(language)}

  return (
    <div>
          <Route path="/" component={Header} />
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/viewRoutes" component={PassangerPage} />
            <Route path="/addRoute" component={BusPage} />
            <Route path="/addTransfer" component={DriverPage} />
            <Route path="/transfer" component={TransferPage} />
          </Switch>
    </div>
  );
}

export default App;

import {getUser} from './services/test-servises';
import { Switch,Route } from 'react-router-dom';
import './App.css';
import MainPage from "./components/MainPage/MainPage"
import BusPage from "./components/BusPage/BusPage"
import PassangerPage from './components/PassangerPage/PassangerPage';
function App() {
  getUser('HWbiCRaDI8WhI8QWCWcL');
  return (
    <Switch>
      <Route path="/" exact component={MainPage}/>
      <Route path="/viewRoutes" component={PassangerPage}/>
      <Route path="/addRoute" component={BusPage}/>
    </Switch>
  );
}

export default App;

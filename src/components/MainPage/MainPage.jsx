import "./MainPage.css";
import { useHistory } from "react-router-dom";
import i18n from "../../i18n";

export default function MainPage(){
  const history = useHistory();
  return <div className="MainPage">
    <button className="btn" onClick={() => history.push("/viewRoutes")}>{i18n.t("I'm a passenger")}</button>
    {/* <button className="btn" onClick={() => history.push("/addRoute")}>Я извозчик</button> */}
    <button className="btn" onClick={() => history.push("/addTransfer")}>{i18n.t("I'm a driver")}</button>
  </div>
}

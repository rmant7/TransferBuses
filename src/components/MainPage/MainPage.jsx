import "./MainPage.css";
import { useHistory } from "react-router-dom";
export default function MainPage(){
  const history = useHistory();
  return <div className="MainPage">
    <button className="btn" onClick={() => history.push("/viewRoutes")}>Я турист</button>
    <button className="btn" onClick={() => history.push("/addRoute")}>Я извозчик</button>
  </div>
}

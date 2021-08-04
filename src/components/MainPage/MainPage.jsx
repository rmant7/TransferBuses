import "./MainPage.css";
import { useHistory } from "react-router-dom";
import i18n from "../../i18n";
import Button from "@material-ui/core/Button";
import Cheaptrip from "../../components/CheaptripCommercial/Cheaptrip";

export default function MainPage() {
  const history = useHistory();
  return (
    <div className="MainPage">
      <Button
        color="secondary"
        variant="contained"
        fullWidth
        onClick={() => history.push("/viewRoutes")}
      >
        {i18n.t("I'm a passenger")}
      </Button>
      <Button
        color="secondary"
        variant="contained"
        fullWidth
        onClick={() => history.push("/addTransfer")}
      >
        {i18n.t("I'm a driver")}
      </Button>
      <Cheaptrip />
    </div>
  );
}

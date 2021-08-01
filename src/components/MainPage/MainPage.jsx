import "./MainPage.css";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import i18n from "../../i18n";
import Button from "@material-ui/core/Button";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#607d8b",
    },
  },
});
export default function MainPage() {
  const history = useHistory();
  return (
    <div className="MainPage">
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

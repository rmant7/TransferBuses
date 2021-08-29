import i18n from "../../i18n";
import { useHistory } from "react-router-dom";
import { Button, Grid, Container } from "@material-ui/core";
import { useStyles } from "../../utils/useStyles";
import Cheaptrip from "../../components/CheaptripCommercial/Cheaptrip";

export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.mainPage}
      >
        <Grid item xs={12}>
          <Button
            className={classes.mainPage__btn}
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => history.push("/viewRoutes")}
          >
            {i18n.t("I'm a passenger")}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.mainPage__btn}
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => history.push("/addTransfer")}
          >
            {i18n.t("I'm a driver")}
          </Button>
        </Grid>

        <Cheaptrip />
      </Grid>
    </Container>
  );
}

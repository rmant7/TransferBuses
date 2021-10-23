import i18n from "../../i18n";
import { useHistory } from "react-router-dom";
import { Button, Grid, Container, Typography } from "@material-ui/core";
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
        justifyContent="center"
        className={(classes.mainPage, classes.topPadding)}
      >
        <Grid item xs={12} lg={4} md={6}>
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

        <Grid item xs={12} lg={4} md={6}>
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
        <Grid item xs={12} lg={4} md={6}>
          <Typography
            style={{ paddingTop: "2rem" }}
            align="center"
            gutterBottom
          >
            {i18n.t("Our partners")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.mainPage__btn}
            color="secondary"
            variant="contained"
            fullWidth
            href="https://cheaptrip.guru/"
            target="_blank"
          >
            CheapTrip
          </Button>
        </Grid>
        <Grid item xs={10} lg={6} md={6}>
          <Typography
            variant="h5"
            align="center"
            component="p"
            className={classes.ctDescription}
          >
            {i18n.t("CheapTrip commercial")}
          </Typography>
        </Grid>
        {/* <Cheaptrip /> */}
      </Grid>
    </Container>
  );
}

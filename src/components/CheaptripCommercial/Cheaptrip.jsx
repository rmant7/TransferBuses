import React from "react";
import i18n from "../../i18n";
import Logo_Cht from "./Logo_ChT_2.png";
import { useStyles } from "../../utils/useStyles";
import { Grid, Typography } from "@material-ui/core";

export default function Cheaptrip() {
  const classes = useStyles();
  console.log("styles", classes);
  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justify="spaceBetween"
      // style={{ minHeight: "60vh" }}
    >
      <Grid item xs={12} lg={4} md={6}>
        <Typography className={classes.header}>Our partners:</Typography>
      </Grid>
      <Grid item xs={12} lg={4} className={classes.caption__wrapper}>
        <a className={classes.caption} href="https://cheaptrip.guru/">
          <img
            className={classes.caption__img}
            src={Logo_Cht}
            alt="CheapTrip Logo"
            // width={"300px"}
            // height={"300px"}
          />
        </a>
      </Grid>
      <Grid item xs={10} lg={6} md={6}>
        <Typography component="p" className={classes.description}>
          {i18n.t("CheapTrip commercial")}
        </Typography>
      </Grid>
    </Grid>
  );
}

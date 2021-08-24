import React from "react";
import "./Cheaptrip.css";
import Logo_Cht from "./Logo_ChT_2.png";
import i18n from "../../i18n";
import { useStyles } from "../../utils/useStyles";

export default function Cheaptrip() {
  const classes = useStyles();
  console.log("styles", classes);
  return (
    <div className={classes.cheaptrip}>
      <div className={classes.header}>
        <h3>Our partners:</h3>
      </div>
      <div className={classes.caption__wrapper}>
        <a className={classes.caption} href="https://cheaptrip.guru/">
          <img
            className={classes.caption__img}
            src={Logo_Cht}
            alt="CheapTrip Logo"
            // width={"300px"}
            // height={"300px"}
          />
        </a>
      </div>
      <div className={classes.description}>
        {i18n.t("CheapTrip commercial")}
      </div>
    </div>
  );
}

import React from "react";
import { Grid } from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
// import i18n from "i18next";

export const WeekDayIcon = ({ name, value }) => {
  console.log(">>!>", name, ">>>>>", value);
  return (
    <>
      {/* <Grid container direction={"column"}> */}
      <div>
        <div style={{ textAlign: "center" }}>
          {name.slice(2, 3).toUpperCase()}
        </div>
        <div>{value && <RadioButtonCheckedIcon />}</div>
        <div>{!value && <RadioButtonUncheckedIcon />}</div>
      </div>
      {/* </Grid> */}
    </>
  );
};

import React from "react";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import i18n from "i18next";

export const WeekDayIcon = ({ name, value }) => {
  return (
    <>
      <div>
        <div style={{ textAlign: "center" }}>
          {i18n.t(name).slice(0,1).toUpperCase()}
        </div>
        <div>{value && <RadioButtonCheckedIcon />}</div>
        <div>{!value && <RadioButtonUncheckedIcon />}</div>
      </div>
    </>
  );
};

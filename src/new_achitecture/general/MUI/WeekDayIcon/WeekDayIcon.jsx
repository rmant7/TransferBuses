import React from "react";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import i18n from "i18next";

export const WeekDayIcon = ({ name, value }) => {
  console.log("weekDayIcon name, value: ", name, value, value.selected)
  return (
    <>
      <div>
        <div style={{ textAlign: "center" }}>
          {i18n.t(name).slice(0,1).toUpperCase()}
        </div>
        {/*<div>{value.selected && <RadioButtonCheckedIcon />}</div>*/}
        {/*<div>{!value.selected && <RadioButtonUncheckedIcon />}</div>*/}
        <div title={value.departureTime}>{value.selected ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}</div>
      </div>
    </>
  );
};

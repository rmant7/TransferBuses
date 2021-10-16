import React from "react";
import classes from "./TransferCardComponent.module.css";
import i18n from "i18next";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RingVolumeIcon from "@mui/icons-material/RingVolume";
import { useSelector } from "react-redux";
import { currencies } from "../../utils/currencies";
import { timeZones } from "../../utils/timezones";
import { getCityById } from "../../utils/cities";
import { getLanguage } from "../../redux/selectors";
import { Button, Divider, Grid, Paper } from "@material-ui/core";

const months_ru = [
  "Янв.",
  "Фев.",
  "Мар.",
  "Апр.",
  "Май.",
  "Июн.",
  "Июл.",
  "Авг.",
  "Сен.",
  "Окт.",
  "Ноя.",
  "Дек.",
];

const months_en = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export default function TransferCardComponent({ transfer }) {
  const globalCurrencyCode = useSelector((state) => state.app.currency);
  const lang = useSelector(getLanguage);
  let priceNum;
  let priceToDisplay;

  // check if currency selected in app (globalCurrency)
  const globalCurrency = currencies.find((cur) => cur.code === globalCurrencyCode);
  const transferCurrency =
    currencies.find((cur) => cur.code === transfer.currency) || currencies.find((cur) => cur.code === "EUR");

  console.log("depTime = ", transfer.departureTime);
  console.log("transfer.timeZone = ", transfer.timeZone);
  //const timeZoneName = timeZones.find(tz => tz.shift === transfer.timeZone)?.name
  const timeZoneName = "GMT+" + transfer.timeZone + " " + i18n.t("timezone." + transfer.timeZone);

  const departureTimeSplit = transfer.departureTime.split(":");

  if (currencies.map((cur) => cur.code).includes(transfer.currency)) {
    // IF transfer.currency IS IN THE currencies ARRAY

    if (transfer.currency === globalCurrencyCode) {
      // NO NEED TO RECALCULATE IF CURRENCIES ARE EQUAL
      priceNum = transfer.price;
    } else {
      priceNum =
        Math.round(
          ((transfer.price * globalCurrency.oneEuroRate) / transferCurrency.oneEuroRate + Number.EPSILON) *
            100
        ) / 100;
    }
  } else {
    // IF transfer.currency IS not IN THE currencies ARRAY, ASSUME IT IS EURO
    if (globalCurrencyCode === "EUR") {
      priceNum = transfer.price;
    } else {
      priceNum = Math.round((transfer.price * globalCurrency.oneEuroRate + Number.EPSILON) * 100) / 100;
    }
  }

  if (globalCurrencyCode === "USD") {
    priceToDisplay = globalCurrency.r2rSymbol + priceNum;
  } else {
    priceToDisplay = priceNum + " " + globalCurrency.r2rSymbol;
  }

  console.log("transfer.regularTripsDays: ", transfer.regularTripsDays);

  return (
    <div className={classes.transfer_card}>
      <div className={classes.transfer_card_header}>
        <div className={classes.date}>
          {/* {i18n.t("Date of travel")}: */}
          <span className={classes.day}>{new Date(transfer.date).getDate()}</span>
          <span className={classes.month}>{months_en[new Date(transfer.date).getMonth()]}</span>
          <span className={classes.year}>{new Date(transfer.date).getFullYear()}</span>
        </div>
        <div className={classes.way}>
          <span className={classes.city}>{getCityById(transfer.from).name}</span>
          <ArrowForwardRoundedIcon />
          <span className={classes.city}>{getCityById(transfer.to).name}</span>
        </div>
      </div>
      <Divider variant="middle" style={{ margin: "10px" }} />
      <div className={classes.content}>
        {transfer.regularTrips ? (
          i18n.t("Regular trips")
        ) : (
          <Grid container item direction={"column"} xs={12}>
            <Grid
              container
              item
              // sm={4}
              xs={4}
              // alignItems="stretch"
              justifyContent="flex-end"
            >
              <Button>
                {transfer.timeZone
                  ? +departureTimeSplit[0] + +transfer.timeZone + ":" + departureTimeSplit[1]
                  : transfer.departureTime}{" "}
                {timeZoneName ? "(" + timeZoneName + ")" : ""}
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} justifyContent="space-around">
           {transfer.duration && (
              <Grid container item xs={12} alignItems="center" justifyContent="flex-start">
                <Paper className={"paper"}>
                  {i18n.t("Duration of ride")}: {/*{transfer.date.replace("T", "  ")}*/}
                  {transfer.duration}
                </Paper>
              </Grid>
            )}

            {transfer.regularTrips && (
              <>
                <Grid container item xs={12} alignItems="center" justifyContent="flex-start">
                  <Paper className={"paper"}>
                    {/*<div style={{margin: "8px", minWidth: "190px", textAlign: "center"}}>*/}
                    {/*  {i18n.t("Regular trips")}*/}
                    {/*</div>*/}
                    <div style={{ margin: "8px", minWidth: "190px", textAlign: "center" }}>
                      {/*{i18n.t("Regular trips")}*/}
                    </div>
                    <Grid container direction={"column"} xs={12} style={{ margin: "4px" }}>
                      {Object.keys(transfer.regularTripsDays)
                        .sort()
                        .map((weekDay) => {
                          console.log("weekDay: ", weekDay, transfer.regularTripsDays[weekDay]);
                          return !transfer.regularTripsDays[weekDay].selected ? (
                            <>
                              <Grid container item justifyContent={"space-between"}>
                                <Grid xs={7}>{i18n.t(weekDay)} </Grid>
                                <Grid xs={3}>
                                  {transfer.regularTripsDays[weekDay].selected
                                    ? transfer.regularTripsDays[weekDay].departureTime
                                    : "-- : --"}
                                </Grid>
                              </Grid>
                              {/*<WeekDayIcon*/}
                              {/*  name={weekDay}*/}
                              {/*  value={transfer.regularTripsDays[weekDay]}*/}
                              {/*/>*/}
                            </>
                          ) : null;
                        })}
                    </Grid>
                  </Paper>
                </Grid>
                <Grid container item xs={4} alignItems="stretch" justifyContent="flex-start">
                  <Button>
                    {/* {i18n.t("Duration of ride")}:*/} {transfer.duration}
                  </Button>
                </Grid>
              </>
            )}

            <Grid container item xs={12} alignItems="center" justifyContent="flex-start">
              <Paper className={"paper"}>
                {i18n.t("Driver's phone number")}: {transfer.phoneNumber} <RingVolumeIcon fontSize="small" />
              </Paper>
            </Grid>
            <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
              {/* <Paper className={"paper"}>
                {i18n.t("Places")}: {transfer.places}
                <AirlineSeatReclineNormalIcon fontSize="small"/>
              </Paper> */}

              <Paper className={"paper"}>
                {i18n.t("A parcel delivery")}: {transfer.passAParcel ? i18n.t("Yes") : i18n.t("No")}
              </Paper>
            </Grid>

            <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
              <Paper className={"paper"}>
                {i18n.t("Pets Allowed")}: {transfer.isTakePet ? i18n.t("Yes") : i18n.t("No")}
              </Paper>
            </Grid>

            {transfer.driversComment && (
              <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
                <Paper className={"paper"}>
                  <div>{i18n.t("Driver's comment")}:</div>
                  <div
                    style={{
                      textOverflow: "ellipsis",
                      wordBreak: "break-all",
                    }}
                  >
                    {transfer.driversComment}{" "}
                  </div>
                </Paper>
              </Grid>
            )}
            {transfer.additionalInfo && (
              <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
                <Paper className={"paper"}>
                  <span style={{ paddingRight: "5px" }}>{i18n.t("Additional information")}:</span>
                  {transfer.additionalInfo}
                </Paper>
              </Grid>
            )}
          </Grid>
      <Divider variant="middle" style={{ margin: "10px" }} />
      </div>
      <div className={classes.transfer_card_footer}>
        <div>
          
        </div>
        <div className={classes.price_block}>
          <div className={classes.wallet_ico} />
          <span className={classes.price}>{priceToDisplay}</span>
        </div>
      </div>
    </div>
  );
}

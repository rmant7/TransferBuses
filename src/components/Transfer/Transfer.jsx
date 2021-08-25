import React from "react";
import ArrowForwardSharpIcon from "@material-ui/icons/ArrowForwardSharp";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import RingVolumeIcon from "@material-ui/icons/RingVolume";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Transfer.css";
import i18n from "i18next";
import { WeekDayIcon } from "../WeekDayIcon/WeekDayIcon";
import { useSelector } from "react-redux";
import { currencies } from "../../utils/currencies";
import { Tooltip } from "@material-ui/core";
import cities from "../../cities.json";

export default function Transfer({ transfer }) {
  const globalCurrencyCode = useSelector(state => state.app.currency);
  const lang = useSelector(state => state.app.lang);
  const cityFrom = cities.find(city => city.ID === transfer.from);
  const cityTo = cities.find(city => city.ID === transfer.to);
  let priceNum;
  let priceToDisplay;

  // check if currency selected in app (globalCurrency)
  const globalCurrency = currencies.find(
    cur => cur.code === globalCurrencyCode
  );
  const transferCurrency =
    currencies.find(cur => cur.code === transfer.currency) ||
    currencies.find(cur => cur.code === "EUR");

  if (currencies.map(cur => cur.code).includes(transfer.currency)) {
    // IF transfer.currency IS IN THE currencies ARRAY

    if (transfer.currency === globalCurrencyCode) {
      // NO NEED TO RECALCULATE IF CURRENCIES ARE EQUAL
      priceNum = transfer.price;
    } else {
      priceNum =
        Math.round(
          ((transfer.price * globalCurrency.oneEuroRate) /
            transferCurrency.oneEuroRate +
            Number.EPSILON) *
            100
        ) / 100;
    }
  } else {
    // IF transfer.currency IS not IN THE currencies ARRAY, ASSUME IT IS EURO
    if (globalCurrencyCode === "EUR") {
      priceNum = transfer.price;
    } else {
      priceNum =
        Math.round(
          (transfer.price * globalCurrency.oneEuroRate + Number.EPSILON) * 100
        ) / 100;
    }
  }

  if (globalCurrencyCode === "USD") {
    priceToDisplay = globalCurrency.r2rSymbol + priceNum;
  } else {
    priceToDisplay = priceNum + " " + globalCurrency.r2rSymbol;
  }

  return (
    <div className="transfer">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={4}>
            <Grid
              container
              item
              xs={12}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Paper className={"paper"}>
                {cityFrom["name" + (lang === "ru" ? "_ru" : "")]}
                <ArrowForwardSharpIcon style={{ marginBottom: "-6px" }} />
                {cityTo["name" + (lang === "ru" ? "_ru" : "")]}
              </Paper>
            </Grid>

            <Grid
              container
              item
              xs={4}
              alignItems="stretch"
              justifyContent="flex-start"
            >
              <Button>
                {/* {i18n.t("Duration of ride")}:*/} {transfer.duration}
              </Button>
            </Grid>

            <Grid
              container
              item
              xs={8}
              alignItems="stretch"
              justifyContent="flex-end"
            >
              <Tooltip
                title={
                  "Price in carrier's currency: " +
                  transfer.price +
                  " " +
                  transfer.currency
                }
                placement="top"
                arrow
              >
                <Button color="primary" variant="contained" className={"paper"}>
                  {/* {i18n.t("Price")}: */}
                  {priceToDisplay}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <hr />
          <Grid container spacing={2} justifyContent="space-around">
            {!transfer.regularTrips && (
              <Grid
                container
                item
                xs={12}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Paper className={"paper"}>
                  {i18n.t("Date of travel")}:{" "}
                  {/*{transfer.date.replace("T", "  ")}*/}
                  {transfer.date.slice(0, 10)}
                </Paper>
              </Grid>
            )}

            {transfer.regularTrips && (
              <Grid
                container
                item
                xs={12}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Paper className={"paper"}>
                  <div style={{ marginBottom: "8px" }}>
                    {i18n.t("Regular trips")}
                  </div>
                  <Grid container spacing="0">
                    {Object.keys(transfer.regularTripsDays)
                      .sort()
                      .map(weekDay => {
                        return (
                          <WeekDayIcon
                            name={weekDay}
                            value={transfer.regularTripsDays[weekDay]}
                          />
                        );
                      })}
                  </Grid>
                </Paper>
              </Grid>
            )}

            <Grid
              container
              item
              xs={12}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Paper className={"paper"}>
                {i18n.t("Driver's phone number")}: {transfer.phoneNumber}{" "}
                <RingVolumeIcon fontSize="small" />
              </Paper>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justifyContent="flex-start"
              alignItems="center"
            >
              {/* <Paper className={"paper"}>
                {i18n.t("Places")}: {transfer.places}
                <AirlineSeatReclineNormalIcon fontSize="small"/>
              </Paper> */}

              <Paper className={"paper"}>
                {i18n.t("A parcel delivery")}:{" "}
                {transfer.passAParcel ? i18n.t("Yes") : i18n.t("No")}
              </Paper>
            </Grid>

            {transfer.driversComment && (
              <Grid
                container
                item
                xs={12}
                justifyContent="flex-start"
                alignItems="center"
              >
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
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <Grid item xs={2}>
              <IconButton onClick={() =>
                history.push(
                  {
                    pathname: '/transfer',
                    transfer: transfer,
                  }
                )
              }>
                <NearMeIcon fontSize="large"/>
              </IconButton>
            </Grid> */}
    </div>
  );
}

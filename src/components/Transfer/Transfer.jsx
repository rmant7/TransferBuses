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
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./Transfer.css";
import i18n from "i18next";
import { WeekDayIcon } from "../WeekDayIcon/WeekDayIcon";
import { useHistory } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#607d8b",
    }
  },
});

export default function Transfer({ transfer }) {
  const history = useHistory();
  return (
    <ThemeProvider theme={theme}>
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
                  {transfer.from}
                  <ArrowForwardSharpIcon style={{marginBottom:"-6px"}}/>
                  {transfer.to}
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
                <Button color="primary" variant="contained" className={"paper"}>
                  {/* {i18n.t("Price")}: */}{transfer.price}{" "}
                </Button>
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
                    {transfer.date.replace("T", "  ")}
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
                        .map((weekDay) => {
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
                <Paper className={"paper"}>
                  {i18n.t("Places")}: {transfer.places}
                  <AirlineSeatReclineNormalIcon fontSize="small" />
                </Paper>

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
    </ThemeProvider>
  );
}

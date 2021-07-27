import React from "react";
import Card from "@material-ui/core/Card";
import ArrowForwardSharpIcon from "@material-ui/icons/ArrowForwardSharp";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import NearMeIcon from "@material-ui/icons/NearMe";
import RingVolumeIcon from "@material-ui/icons/RingVolume";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import "./Transfer.css";
import {useHistory} from "react-router-dom";
import i18n from "i18next";
import {WeekDayIcon} from "../WeekDayIcon/WeekDayIcon";

export default function Transfer({ transfer }) {
  // const history = useHistory();
  return (
    <div className="transfer">
      <Card>
        <CardContent>
          <Grid
            item
            xs
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid
              container
              item
              xs={10}
              sm={6}
              alignItems="center"
              justifyContent="center"
            >
              <Paper className={"paper"}>
                {transfer.from}{" "}
                <ArrowForwardSharpIcon
                  style={{ fontSize: 15, margin: "0 10 -2.5 10" }}
                />
                {transfer.to}
              </Paper>
            </Grid>
            {!transfer.regularTrips && (
              <Grid
                container
                item
                xs={10}
                sm={6}
                alignItems="stretch"
                justifyContent="center"
                // spacing={2}
              >
                <Paper className={"paper"}>
                  {" "}
                  {"Date of travel"}: {transfer.date.replace("T", "  ")}
                </Paper>
              </Grid>
            )}

            {transfer.regularTrips && (
              <Grid
                container
                item
                xs={10}
                sm={6}
                alignItems="stretch"
                justifyContent="center"
                // justifyContent="center"
                // spacing="4"
              >
                <Paper className={"paper"}>
                  <div style={{ marginBottom: "8px" }}>{"Regular trips"}</div>
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
              xs={10}
              sm={6}
              alignItems="stretch"
              justifyContent="center"
            >
              <Paper className={"paper"}>
                {" "}
                {"Duration of ride"}: {transfer.duration}
              </Paper>
            </Grid>
            <Grid
              container
              item
              xs={10}
              sm={6}
              alignItems="stretch"
              justifyContent="center"
            >
              <Paper className={"paper"}>
                {"Driver's phone number"}: {transfer.phoneNumber}{" "}
                <RingVolumeIcon fontSize="small" />
              </Paper>
            </Grid>
            <Grid
              container
              item
              xs={10}
              sm={6}
              alignItems="stretch"
              justifyContent="center"
            >
              <Paper className={"paper hidden"}>
                {"Places"}: {transfer.places}{" "}
                <AirlineSeatReclineNormalIcon fontSize="small" />
              </Paper>
            </Grid>

            <Grid
              container
              item
              xs={10}
              sm={6}
              alignItems="stretch"
              justifyContent="center"
            >
              <Paper className={"paper"}>
                {"Price"}: {transfer.price}{" "}
              </Paper>
            </Grid>

            {transfer.driversComment && (
              <Grid
                container
                item
                xs={10}
                sm={6}
                alignItems="stretch"
                justifyContent="center"
              >
                <Paper className={"paper"}>
                  <div>{"Driver's comment"}:</div>
                  <div
                    style={{ textOverflow: "ellipsis", wordBreak: "break-all" }}
                  >
                    {transfer.driversComment}{" "}
                  </div>
                </Paper>
              </Grid>
            )}

            <Grid
              container
              item
              xs={10}
              alignItems="stretch"
              justifyContent="center"
            >
              <Paper className={"paper"}>
                {"A parcel delivery"}: {transfer.passAParcel ? "Yes" : "No"}
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <IconButton onClick={() => {}}>
                <NearMeIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
import "../Transfer.css";
import i18n from "i18next";
import { Button, Grid } from "@material-ui/core";

export default function RegularTripsComponent({ transfer }) {
    const timeZoneName = "GMT+" + transfer.timeZone + " " + i18n.t("timezone." + transfer.timeZone);
    const departureTimeSplit = transfer.departureTime.split(":");

    return (
        <>
            {/* {i18n.t("Regular trips")} */}
            <Grid container item direction={"column"} xs={12}>
                <Grid
                    container
                    item
                    // sm={5}
                    xs={7}
                    // alignItems="stretch"
                    justifyContent="flex-start"
                >
                    <Button>
                        {/* {i18n.t("Duration of ride")}:*/} {transfer.date}
                    </Button>
                </Grid>
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
        </>
    );
}

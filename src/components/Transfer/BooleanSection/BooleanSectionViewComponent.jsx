import "../Transfer.css";
import i18n from "i18next";
import { Grid, Paper } from "@material-ui/core";

export default function BooleanSectionViewComponent({ conditions }) {
    console.log(conditions);
    return conditions.map((condition) => (
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
            {/* <Paper className={"paper"}>
                {i18n.t("Places")}: {transfer.places}
                <AirlineSeatReclineNormalIcon fontSize="small"/>
              </Paper> */}

            <Paper className={"paper"}>
                {condition.title}: {condition.condition ? i18n.t("Yes") : i18n.t("No")}
            </Paper>
        </Grid>
    ));
    /* <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
                {/* <Paper className={"paper"}>
                {i18n.t("Places")}: {transfer.places}
                <AirlineSeatReclineNormalIcon fontSize="small"/>
              </Paper> 

                <Paper className={"paper"}>
                    {i18n.t("A parcel delivery")}: {condition ? i18n.t("Yes") : i18n.t("No")}
                </Paper>
            </Grid>

            <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
                <Paper className={"paper"}>
                    {i18n.t("Pets Allowed")}: {transfer.isTakePet ? i18n.t("Yes") : i18n.t("No")}
                </Paper>
            </Grid> */
}

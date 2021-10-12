import "../Transfer.css";
import i18n from "i18next";
import { Grid, Paper } from "@material-ui/core";

export default function AdditionalInfoComponent({ additionalInfo }) {
    return (
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
            <span style={{ paddingRight: "5px" }}>{i18n.t("Additional information")}:</span>
            <Paper className={"paper"}>{additionalInfo}</Paper>
        </Grid>
    );
}

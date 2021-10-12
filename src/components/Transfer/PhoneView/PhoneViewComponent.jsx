import "../Transfer.css";
import i18n from "i18next";
import { Grid, Paper } from "@material-ui/core";
import RingVolumeIcon from "@material-ui/icons/RingVolume";

export default function PhoneViewComponent({ phone }) {
    return (
        <Grid container item xs={12} alignItems="center" justifyContent="flex-start">
            <Paper className={"paper"}>
                {i18n.t("Driver's phone number")}: {phone} <RingVolumeIcon fontSize="small" />
            </Paper>
        </Grid>
    );
}

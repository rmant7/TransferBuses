import "../Transfer.css";
import i18n from "i18next";
import { Grid, Paper } from "@material-ui/core";

export default function DriverCommentComponent({ comment }) {
    return (
        <Grid container item xs={12} justifyContent="flex-start" alignItems="center">
            <Paper className={"paper"}>
                <div>{i18n.t("Driver's comment")}:</div>
                <div
                    style={{
                        textOverflow: "ellipsis",
                        wordBreak: "break-all",
                    }}
                >
                    {comment}{" "}
                </div>
            </Paper>
        </Grid>
    );
}

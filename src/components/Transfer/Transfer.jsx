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

export default function Transfer({transfer}) {
    const history = useHistory();
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
                        <Grid container item xs alignItems="center" justifyContent="center" >
                            <Paper className={"paper"}>
                                {transfer.from} <ArrowForwardSharpIcon style={{fontSize: 15, margin: "0 10 -2.5 10"}}/>
                                {transfer.to}
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={3}
                            alignItems="stretch"
                            justifyContent="center"
                        >
                            <Paper className={"paper"}> Date of travel: {transfer.date}</Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={3}
                            alignItems="stretch"
                            justifyContent="center"
                        >
                            <Paper className={"paper"}> Duration of travel: {transfer.duration}</Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={4}
                            alignItems="stretch"
                            justifyContent="center"
                        >
                            <Paper className={"paper"}>
                                Driver's phone number: {transfer.phoneNumber}{" "}
                                <RingVolumeIcon fontSize="small"/>
                            </Paper>
                        </Grid>
                        <Grid
                            container
                            item
                            xs
                            alignItems="stretch"
                            justifyContent="center"
                        >
                            <Paper className={"paper"}>
                                Places: {transfer.places}{" "}
                                <AirlineSeatReclineNormalIcon fontSize="small"/>
                            </Paper>
                        </Grid>

                        <Grid
                            container
                            item
                            xs={2}
                            alignItems="stretch"
                            justifyContent="center"
                        >
                            <Paper className={"paper"}>
                                Price: {transfer.price}{" "}
                            </Paper>
                        </Grid>

                        <Grid item xs={1} alignItems="stretch" justifyContent="flex-end">
                            {/*<IconButton onClick={() => history.push("/addTransfer")}>*/}
                            {/*  <NearMeIcon fontSize="large" />*/}
                            {/*</IconButton>*/}
                            <IconButton onClick={() =>
                                history.push(
                                    {
                                        pathname: '/transfer',
                                        // search: '?query=abc',
                                        transfer: transfer, // passing transfer data to a component
                                    }
                                )
                            }>
                                <NearMeIcon fontSize="large"/>
                            </IconButton>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

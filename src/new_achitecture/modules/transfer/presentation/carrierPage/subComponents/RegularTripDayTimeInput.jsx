import React from 'react';
import {Grid, Tooltip} from "@material-ui/core";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";
import TextField from "@material-ui/core/TextField";

function RegularTripDayTimeInput(props) {
    return (
        <Grid item xs={3}>
            <Tooltip title={i18n.t('Time')} placement='top'>
                <TextField
                    id={
                        'regularTripsDays.' +
                        props.weekDay +
                        '.departureTime'
                    }
                    name={
                        'regularTripsDays.' +
                        props.weekDay +
                        '.departureTime'
                    }
                    type='time'
                    margin='normal'
                    disabled={
                        !props.valueRegularTripsDays[props.weekDay]
                            .selected
                    }
                    value={
                        props.valueRegularTripsDays[props.weekDay]
                            .departureTime
                    }
                    onChange={props.handleChange}
                />
            </Tooltip>
        </Grid>
    );
}

export default RegularTripDayTimeInput;
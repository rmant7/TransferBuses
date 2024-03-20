import React from 'react';
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";

function DepartureTimeField(props) {
    return (
        <Grid container justifyContent='space-between'>
            <Grid item xs={5}>
                <TextField
                    id='departureTime'
                    label={i18n.t('Time')}
                    type='time'
                    margin='normal'
                    fullWidth
                    onBlur={props.handleBlur}
                    error={
                        Boolean(props.errorDepartureTime) &&
                        props.touchedDepartureTime
                    }
                    helperText={
                        Boolean(props.errorDepartureTime) &&
                        props.touchedDepartureTime &&
                        i18n.t(`form.errors.${props.errorDepartureTime}`)
                    }
                    value={props.valueDepartureTime}
                    onChange={props.handleChange}
                    inputProps={{
                        min: new Date().toISOString().slice(0, 16),
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default DepartureTimeField;
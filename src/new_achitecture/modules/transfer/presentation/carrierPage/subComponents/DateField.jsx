import React from 'react';
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";

function DateField(props) {
    return (
        <Grid container justifyContent='space-between'>
            <Grid item xs={6}>
                <TextField
                    id='date'
                    label={i18n.t('Date')}
                    type='date'
                    margin='normal'
                    fullWidth
                    onBlur={props.handleBlur}
                    error={Boolean(props.errorDate) && props.touchedDate}
                    helperText={
                        Boolean(props.errorDate) &&
                        props.touchedDate &&
                        i18n.t(`form.errors.${props.errorDate}`)
                    }
                    value={props.valuesDate}
                    onChange={props.handleChange}
                    inputProps={{
                        min: new Date().toISOString().slice(0, 10),
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default DateField;
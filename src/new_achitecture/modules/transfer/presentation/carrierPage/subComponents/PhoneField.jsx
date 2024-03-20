import React from 'react';
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";

function PhoneField(props) {
    return (
        <Grid
            container
            justifyContent='space-between'
            alignItems='flex-end'
        >
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    id='phoneNumber'
                    name='phoneNumber'
                    label={i18n.t('Phone number')}
                    placeholder={'+1234567890'}
                    margin='normal'
                    value={props.valuePhoneNumber}
                    onBlur={props.handleBlur}
                    error={
                        Boolean(props.errorPhoneNumber) &&
                        props.touchedPhoneNumber
                    }
                    helperText={
                        Boolean(props.errorPhoneNumber) &&
                        props.touchedPhoneNumber &&
                        i18n.t(`form.errors.${props.errorPhoneNumber}`)
                    }
                    onChange={props.handleChange}
                />
            </Grid>
        </Grid>
    );
}

export default PhoneField;
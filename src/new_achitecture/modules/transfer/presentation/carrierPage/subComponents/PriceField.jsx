import React from 'react';
import TextField from "@material-ui/core/TextField";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";
import {Grid} from "@material-ui/core";

function PriceField(props) {
    return (
        <Grid item xs={8}>
            <TextField
                type='number'
                value={props.valuePrice}
                margin='dense'
                id='price'
                label={i18n.t('Price')}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={Boolean(props.errorPrice) && props.touchedPrice}
                helperText={
                    Boolean(props.errorPrice) &&
                    props.touchedPrice &&
                    i18n.t(`form.errors.${props.errorPrice}`)
                }
            />
        </Grid>
    );
}

export default PriceField;
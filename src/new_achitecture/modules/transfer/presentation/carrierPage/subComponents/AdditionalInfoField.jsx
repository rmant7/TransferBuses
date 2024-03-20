import React from 'react';
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";
import TextField from "@material-ui/core/TextField";

function AdditionalInfoField(props) {
    return (
        <TextField
            value={props.valueAdditionalInfo}
            margin='normal'
            id='additionalInfo'
            name='additionalInfo'
            fullWidth
            multiline
            rows={2}
            error={
                Boolean(props.errorAdditionalInfo) &&
                props.touchedAdditionalInfo
            }
            label={i18n.t('Additional information')}
            onChange={props.handleChange}
            helperText={
                Boolean(props.errorAdditionalInfo) &&
                props.touchedAdditionalInfo &&
                i18n.t(`form.errors.${props.errorAdditionalInfo}`)
            }
        />
    );
}

export default AdditionalInfoField;
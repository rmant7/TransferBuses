import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from "../CarrierPage.module.css";
import TextField from "@material-ui/core/TextField";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";

function RouteInput(props) {
    return (
        <>
            <Autocomplete
                className={styles.height95px}
                {...props.defaultProps}
                id='from'
                name={'from'}
                value={props.valueFrom}
                margin='dense'
                onChange={(e, v) => {
                    props.setFieldValue('from', v?.id || '');
                }}
                onBlur={props.handleBlur}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={i18n.t('From')}
                        margin='normal'
                        error={Boolean(props.errorsFrom) && props.toucheFrom}
                        helperText={
                            Boolean(props.errorsFrom) &&
                            props.touchedFrom &&
                            i18n.t(`form.errors.${props.errorsFrom}`)
                        }
                    />
                )}
                ListboxProps={{ style: { maxHeight: '7rem' } }}
            />
            <Autocomplete
                className={styles.height95px}
                {...props.defaultProps}
                id='to'
                name={'to'}
                value={props.valueTo}
                onBlur={props.handleBlur}
                onChange={(e, v) => {
                    props.setFieldValue('to', v?.id || '');
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={i18n.t('To')}
                        margin='dense'
                        error={Boolean(props.errorsTo) && props.touchedTo}
                        helperText={
                            Boolean(props.errorsTo) &&
                            props.touchedTo &&
                            i18n.t(`form.errors.${props.errorsTo}`)
                        }
                    />
                )}
            />
        </>
    );
}

export default RouteInput;
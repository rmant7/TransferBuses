import React from 'react';
import {Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";

function RegularTripsDaySelection(props) {
    return (
        <Grid container direction={'row'}>
            <Grid item xs={9}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                Object.values(
                                    props.valueRegularTripsDay
                                ).reduce(
                                    (acc, val) => (acc += +val.selected),
                                    0
                                ) === 7
                            }
                            onChange={props.handleSelectAllDaysChange}
                            name='selectAll'
                            margin={''}
                        />
                    }
                    label={i18n.t('Select all')}
                />
            </Grid>
            <Grid item xs={3}>
                {i18n.t('Time')}
            </Grid>
        </Grid>
    );
}

export default RegularTripsDaySelection;
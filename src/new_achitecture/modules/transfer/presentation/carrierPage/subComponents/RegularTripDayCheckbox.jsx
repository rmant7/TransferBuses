import React from 'react';
import {Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";

function RegularTripDayCheckbox(props) {
    return (
        <Grid item xs={9}>
            <FormControlLabel
                style={{ marginLeft: '10px' }}
                control={
                    <Checkbox
                        id={
                            'regularTripsDays.' +
                            props.weekDay +
                            '.selected'
                        }
                        checked={
                            props.valueRegularTripsDays[props.weekDay]
                                .selected
                        }
                        onChange={props.handleChange}
                        name={
                            'regularTripsDays.' +
                            props.weekDay +
                            '.selected'
                        }
                    />
                }
                label={i18n.t(props.weekDay)}
            />
        </Grid>
    );
}

export default RegularTripDayCheckbox;
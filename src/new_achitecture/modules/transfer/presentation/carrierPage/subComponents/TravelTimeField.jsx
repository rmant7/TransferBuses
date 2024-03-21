import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import i18n from "../../../../trip_search/domain/entites/utils/language/i18n";

function TravelTimeField(props) {
    return (
        <Grid container justifyContent='space-between'>
            <Grid item xs={5}>
                <FormControl fullWidth>
                    <InputLabel shrink id='duration-label'>
                        {i18n.t('Travel time')}
                    </InputLabel>
                    <Select
                        labelId='duration-label'
                        id='duration'
                        name={'duration'}
                        value={props.valueDuration}
                        renderValue={(value) => `${value}`}
                        margin='dense'
                        onChange={props.handleChange}
                        label='duration'
                    >
                        {props.durations.map((item) => {
                            return (
                                <MenuItem
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}
export default TravelTimeField;
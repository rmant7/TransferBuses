import React from 'react';
import {Grid, MenuItem, Select} from "@material-ui/core";
import {currencies} from "../../currenciesSelector/currencies";

function CurrencyField(props) {
    return (
        <Grid item xs={4}>
            <Select
                id='currency'
                name={'currency'}
                value={props.rideCurrency}
                renderValue={(value) => `${value.toUpperCase()}`}
                margin='dense'
                disableUnderline
                onChange={props.handleChange}
                label='currency'
                style={{ paddingTop: '8px' }}
            >
                {currencies.map((item) => {
                    return (
                        <MenuItem
                            key={item.code}
                            value={item.code}
                            onClick={() => props.setRideCurrency(item.code)}
                        >
                            {item.code + `  ` + item.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </Grid>
    );
}

export default CurrencyField;
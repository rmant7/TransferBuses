import React from "react";
import classes from "./FilterComponent.module.css";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export default function FilterComponent({ label, getOptionLabel, options, handler, inputValue, placeholder }) {
    return (
        <div className={classes.filter}>
            <Autocomplete
                className={classes.filter_autocomplite}
                freeSolo
                variant="outlined"
                id="combo-box-demo"
                inputValue={inputValue}
                options={options}
                getOptionLabel={getOptionLabel}
                sx={{ width: 500 }}
                onInputChange={handler}
                renderInput={(params) => (
                    <TextField
                        className={classes.filter_textfield}
                        variant="outlined"
                        {...params}
                        label={label}
                        placeholder={placeholder}
                    />
                )}
            />
        </div>
    );
}
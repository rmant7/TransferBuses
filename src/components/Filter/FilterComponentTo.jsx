import React from "react";
import classes from "./FilterComponent.module.css";
import { TextField } from "@mui/material";
import {Autocomplete} from "@mui/material";

export default function FilterComponentTo ({ label, getOptionLabel, options, handler, inputValue }) {
    return (
        <div className={classes.filter}>
            <Autocomplete
                freeSolo
                variant="outlined"
                id="combo-box-demo"
                inputValue={inputValue}
                options={options}
                getOptionLabel={getOptionLabel}
                sx={{ width: 500 }}
                onInputChange={handler}
                renderInput={(params) => (
                    <TextField variant="outlined" {...params} label={label} />
                )}
            />
        </div>
    );
}

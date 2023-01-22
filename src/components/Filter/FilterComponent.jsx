import React, { useState } from "react";
import classes from "./FilterComponent.module.css";
import TextField from '@mui/material/TextField';
import  Autocomplete  from "@mui/material/Autocomplete";


export default function FilterComponent({ label, getOptionLabel, options, handler, inputValue }) {
    return (
        <div className={classes.filter}>
            <Autocomplete className={classes.filter_auto}
                freeSolo
                disableClearable
                variant="standard"
                id="combo-box-demo"
                inputValue={inputValue}
                options={options}
                getOptionLabel={getOptionLabel}
                // style={{width: "500px", marginLeft: "auto", marginRight: "auto"}}
                onInputChange={handler}
                renderInput={(params) => (
                    <TextField  
                        variant="standard" 
                        {...params} 
                        label={label} 
            />
                )}
            />            
        </div>
    );
}

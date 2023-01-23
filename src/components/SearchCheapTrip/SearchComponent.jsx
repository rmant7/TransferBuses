import React, { useState } from "react";
import classes from "./SearchComponent.module.css";
import TextField from '@mui/material/TextField';
import  Autocomplete  from "@mui/material/Autocomplete";


export default function SearchComponent({ label, getOptionLabel, options, handler, inputValue }) {
    return (
        <div className={classes.search}>
            <Autocomplete className={classes.search_auto}
                freeSolo
                disableClearable
                variant="standard"
                id="combo-box-demo"
                inputValue={inputValue}
                options={options}
                getOptionLabel={getOptionLabel}
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

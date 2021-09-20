import React, { useEffect, useState } from "react";
import classes from './FilterComponent.module.css';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
} from "@material-ui/core";

export default function FilterComponent({ name, handler }) {
    const [inputValue, setInputValue] = useState("");

    const inputValueHandler = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        handler(inputValue);
    }, [inputValue]);

    return (
        <div className={classes.filter_root}>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">
                    {name}
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    onChange={inputValueHandler}
                    label={name}
                />
            </FormControl>
        </div>
    );
}

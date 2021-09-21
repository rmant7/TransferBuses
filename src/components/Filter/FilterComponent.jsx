import React, { useEffect, useState } from "react";
import classes from "./FilterComponent.module.css";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export default function FilterComponent({ name, handler, items }) {
    const [inputValue, setInputValue] = useState("");

    const inputValueHandler = (e) => {
        setInputValue(e.target.textContent);
    };

    useEffect(() => {
        handler(inputValue);
    }, [inputValue]);

    return (
        <div className={classes.filter_root}>
            <Autocomplete
                variant="outlined"
                disablePortal
                id="combo-box-demo"
                options={items}
                sx={{ width: 300 }}
                onChange={inputValueHandler}
                renderInput={(params) => (
                    <TextField
                        variant="outlined"
                        {...params}
                        label={name}
                    />
                )}
            />
        </div>
    );
}

import React, { useEffect, useState } from "react";
import classes from "./FilterComponent.module.css";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getCityById } from "../../utils/cities";
import { useSelector } from "react-redux";

export default function FilterComponent({ name, handler, array }) {
    const lang = useSelector((state) => state.app.lang);
    const [inputValue, setInputValue] = useState("");
    const items = Array.from(new Set(array.map((item) => {
        const city = getCityById(item.from);
        return lang.includes("ru") ? city.name_ru : city.name;
    })));

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

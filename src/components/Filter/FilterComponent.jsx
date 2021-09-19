import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

export default function FilterComponent({ name, handler }) {
    const [inputValue, setInputValue] = useState("");

    const inputValueHandler = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        handler(inputValue);
    }, [inputValue]);

    return (
        <TextField
            id="outlined-basic"
            label={name}
            variant="outlined"
            onChange={inputValueHandler}
        />
    );
}

import React from "react";
import classes from "./FilterComponent.module.css";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { selectFilterAction } from "../../redux/actions/filtersActions";
import { useSelector } from "react-redux";
import { getFilters, selectFilter } from "../../redux/selectors";
import { getCityById } from "../../utils/cities";

export default function FilterComponent({ name, items }) {
    const dispatch = useDispatch();
    const filters = useSelector(getFilters);
    const selected = useSelector(selectFilter);

    console.log(selected);

    const inputValueHandler = (e) => {
        const city = getCityById(filters[e.target.dataset.optionIndex]);
        dispatch(selectFilterAction(city));
    };

    return (
        <div className={classes.filter}>
            <Autocomplete
                variant="outlined"
                disablePortal
                id="combo-box-demo"
                value={selected.name}
                options={items}
                sx={{ width: 300 }}
                onChange={inputValueHandler}
                renderInput={(params) => (
                    <TextField variant="outlined" {...params} label={name} />
                )}
            />
        </div>
    );
}

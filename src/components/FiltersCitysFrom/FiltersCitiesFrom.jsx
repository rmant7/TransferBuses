import React from "react";
import classes from "../Filter/FilterComponent.module.css";
import { getCityByName } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "../Filter/FilterComponent";
import { getFilters, inputFromToCity } from "../../redux/selectors";
import i18next from "i18next";
import {
    inputFromCityAction,
    inputToCityAction,
} from "../../redux/actions/inputFromToCityActions";
import { applyFilterFromCityIdAction } from "../../redux/actions/filtersActions";

export default function FiltersCitiesFrom() {
    const dispatch = useDispatch();
    const filters = useSelector(getFilters);
    const inputFromTo = useSelector(inputFromToCity);

    const handleApplyFilter = () => {
        const city = getCityByName(inputFromTo.inputFromCity);
        if (city) {
            dispatch(applyFilterFromCityIdAction(city.ID));
        } else {
            alert(`No such city found: ${inputFromTo.inputFromCity}`);
        }
    };

    const handleInputFrom = (e, v) => {
        dispatch(inputFromCityAction(v));
    };

    const handleClearFields = () => {
        dispatch(inputFromCityAction(""));
        dispatch(inputToCityAction(""));
    };

    return (
        <div className={classes.filters}>
            <FilterComponent
                label={i18next.t("From City")}
                options={filters}
                handler={handleInputFrom}
                inputValue={inputFromTo.inputFromCity}
                getOptionLabel={(o) => o.name}
            />
            <div className={classes.filter_buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyFilter}
                >
                    {i18next.t("Apply")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClearFields}
                    style={{ marginLeft: "10px" }}
                >
                    {i18next.t("Clear")}
                </Button>
            </div>
        </div>
    );
}

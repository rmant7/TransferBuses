import React from "react";
import classes from "../Filter/FilterComponent.module.css";
import { getCityByName } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "../Filter/FilterComponent";
import { getFilters, getInputFromToCity } from "../../redux/selectors";
import i18next from "i18next";
import { inputFromCityAction, inputToCityAction } from "../../redux/actions/inputs-actions";
import { applyFilterFromCityIdAction } from "../../redux/actions/filters-actions";
import { getTransfersAction } from "../../redux/actions/transfers-actions";

export default function FiltersCitiesFrom() {
    const dispatch = useDispatch();
    const filters = useSelector(getFilters);
    const inputFromTo = useSelector(getInputFromToCity);

    const handleApplyFilter = () => {
        const city = getCityByName(inputFromTo.inputFromCity);
        if (city) {
            dispatch(applyFilterFromCityIdAction(city.ID));
        } else {
            dispatch(getTransfersAction());
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
                label={i18next.t("FromCity")}
                options={filters}
                handler={handleInputFrom}
                inputValue={inputFromTo.inputFromCity}
                getOptionLabel={(o) => o.name}
            />
            <div className={classes.filter_buttons}>
                <Button variant="contained" color="primary" onClick={handleApplyFilter}>
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

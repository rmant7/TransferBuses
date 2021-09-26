import React from "react";
import classes from "../Filter/FilterComponent.module.css";
import { getCityById } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "../Filter/FilterComponent";
import { getFilters, inputFromToCity } from "../../redux/selectors";
import i18next from "i18next";
import {
    inputFromCityAction,
    inputToCityAction,
} from "../../redux/actions/inputFromToCityActions";

export default function FiltersCitiesFrom({ name }) {
    const dispatch = useDispatch();
    const filters = useSelector(getFilters);
    const inputFromTo = useSelector(inputFromToCity);

    console.log(inputFromTo);

    const getCitiesForOption = () => {
        const tmp = [];
        filters.lentch &&
            filters.forEach((element) => {
                tmp.push(getCityById(element.from).name);
                tmp.push(getCityById(element.from).name_ru);
            });
        return tmp;
    };

    const handleApplyFilter = () => {
        console.log(inputFromTo);
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
                label={name}
                options={getCitiesForOption()}
                handler={handleInputFrom}
                inputValue={inputFromTo.inputFromCity}
            />
            <div className={classes.filter_buttons}>
                <Button onClick={handleApplyFilter}>
                    {i18next.t("Apply")}
                </Button>
                <Button onClick={handleClearFields}>
                    {i18next.t("Clear")}
                </Button>
            </div>
        </div>
    );
}

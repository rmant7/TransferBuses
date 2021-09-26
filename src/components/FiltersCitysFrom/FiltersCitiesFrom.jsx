import React from "react";
import classes from "../Filter/FilterComponent.module.css";
import { getCityById } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "../Filter/FilterComponent";
import FilterIcon from "../../assets/filter-filled-tool-symbol.png";
import ClearFilterIcon from "../../assets/clear-filter.png";
import { applyFilterFromCityIdAction, selectFilterAction } from "../../redux/actions/filtersActions";
import { getFilters, selectFilter } from "../../redux/selectors";

export default function FiltersCitiesFrom({ name }) {
    const dispatch = useDispatch();
    const filters = useSelector(getFilters);
    const selectedCity = useSelector(selectFilter);

    console.log(filters);

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
        dispatch(applyFilterFromCityIdAction(selectedCity.ID));
    };

    const handleClearFilter = () => {
        dispatch(selectFilterAction(""));
    };

    return (
        <div className={classes.filters}>
            <FilterComponent name={name} items={getCitiesForOption()} />
            <div className={classes.filter_buttons}>
                <Button onClick={handleApplyFilter}>
                    <img src={FilterIcon} alt="Apply" />
                </Button>
                <Button onClick={handleClearFilter}>
                    <img src={ClearFilterIcon} alt="Clear" />
                </Button>
            </div>
        </div>
    );
}

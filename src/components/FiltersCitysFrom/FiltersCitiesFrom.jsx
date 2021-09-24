import React from "react";
import classes from "../Filter/FilterComponent.module.css";
import { getCityById } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import i18next from "i18next";
import FilterComponent from "../Filter/FilterComponent";
import FilterIcon from "../../assets/filter-filled-tool-symbol.png";
import ClearFilterIcon from "../../assets/clear-filter.png";
import { selectFilterAction } from "../../redux/actions/filtersActions";
import {
    applyFilterFromCityIdAction,
    receiveTransfersAction,
} from "../../redux/actions/transfersActions";
import {
    getAppLanguage,
    getFilters,
    selectFilter,
} from "../../redux/selectors";

export default function FiltersCitiesFrom({ name }) {
    const dispatch = useDispatch();
    const lang = useSelector(getAppLanguage);
    const filters = useSelector(getFilters);
    const selectedCity = useSelector(selectFilter);

    const handleApplyFilter = () => {
        !selectedCity === "" && dispatch(applyFilterFromCityIdAction(selectedCity));
    };

    const handleClearFilter = () => {
        dispatch(selectFilterAction(""));
        dispatch(receiveTransfersAction());
    };

    return (
        <div className={classes.filters}>
            <FilterComponent
                name={name}
                items={filters.map((f) =>
                    lang === "ru" ? getCityById(f).name_ru : getCityById(f).name
                )}
            />
            <div className={classes.filter_buttons}>
                <Tooltip title={i18next.t("Apply Filter")}>
                    <IconButton onClick={handleApplyFilter}>
                        <img src={FilterIcon} alt="Apply Filter" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={i18next.t("Clear Filter")}>
                    <IconButton onClick={handleClearFilter}>
                        <img src={ClearFilterIcon} alt="Clear Filter" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}

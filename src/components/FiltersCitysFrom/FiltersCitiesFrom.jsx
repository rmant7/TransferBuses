import classes from "../Filter/FilterComponent.module.css";
import { getCities, getCityByName } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "../Filter/FilterComponent";
import { getFilters, getInputFromToCity } from "../../redux/selectors";
import { inputFromCityAction, inputToCityAction } from "../../redux/actions/inputs-actions";
import { applyFilterFromCityIdAction } from "../../redux/actions/filters-actions";
import { getTransfersAction } from "../../redux/actions/transfers-actions";
import i18n from "../../i18n";

export default function FiltersCitiesFrom() {
    const dispatch = useDispatch();
    // const filters = useSelector(getFilters);
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
            <div>
            <span className={classes.filter_label}>{i18n.t("Find a city")}</span>
            <FilterComponent
                // label={i18n.t("FromCity")}
                placeholder={i18n.t("Enter city name")}
                options={getCities()}
                handler={handleInputFrom}
                inputValue={inputFromTo.inputFromCity}
                getOptionLabel={(o) => o.name}
            />
            </div>
            <div className={classes.filter_buttons}>
                <Button
                    className={classes.filter_button}
                    style={{borderRadius: "8px"}}
                    variant="contained"
                    color="primary"
                    onClick={handleApplyFilter}
                >
                    {i18n.t("Search")}
                </Button>
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyFilter}
                >
                    {i18n.t("Apply")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClearFields}
                    style={{ marginLeft: "10px" }}
                >
                    {i18n.t("Clear")}
                </Button> */}
            </div>
        </div>
    );
}
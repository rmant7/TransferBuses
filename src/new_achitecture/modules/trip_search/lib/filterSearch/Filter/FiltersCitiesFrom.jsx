import classes from "./FilterComponent.module.css";
import { getCities, getCityByName } from "../cities/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "./FilterComponent";
import { getInputFromToCity } from "../../../../../general/redux/selectors";
import { setFromCity, setToCity } from "../../../presentation/redux/slices/inputSlice";
import { applyFilterFromCityIdAction } from "../../../../../general/redux/redux-using functions/filters-actions";
import { getTransfersAction } from "../../../../../general/redux/redux-using functions/transfers-actions";
import i18n from "../../../domain/entites/utils/language/i18n";

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
        dispatch(setFromCity(v));
    };

    const handleClearFields = () => {
        dispatch(setFromCity(""));
        dispatch(setToCity(""));
    };

    return (
        <div className={classes.filters}>
            <FilterComponent
                label={i18n.t("FromCity")}
                options={getCities()}
                handler={handleInputFrom}
                inputValue={inputFromTo.inputFromCity}
                getOptionLabel={(o) => o.name}
            />
            <div className={classes.filter_buttons}>
                <Button variant="contained" color="primary" onClick={handleApplyFilter}>
                    {i18n.t("Apply")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClearFields}
                    style={{ marginLeft: "10px" }}
                >
                    {i18n.t("Clear")}
                </Button>
            </div>
        </div>
    );
}
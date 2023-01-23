import classes from "./SearchComponent.module.css";
import { getCities, getCityByName } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "./SearchComponent";
import { getFilters, getInputFromToCity } from "../../redux/selectors";
import { inputFromCityAction, inputToCityAction } from "../../redux/actions/inputs-actions";
import { applyFilterFromCityIdAction } from "../../redux/actions/filters-actions";
import { getTransfersAction } from "../../redux/actions/transfers-actions";
import i18n from "../../i18n";
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import CloseIcon from '@mui/icons-material/Close';

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

    const handleInputTo = (e, v) => {
        dispatch(inputToCityAction(v));
    }

    const handleClearFields = () => {
        dispatch(inputFromCityAction(""));
        dispatch(inputToCityAction(""));
    };
    const handleClearInputTo = () => {
        dispatch(inputToCityAction(""));
    };
    const handleClearInputFrom = () => {
        dispatch(inputFromCityAction(""));
    };

    return (
        <div className={classes.searchs}>
            <div className={classes.media} >
                <div className={classes.media_search}>
                    <FilterComponent
                        label={i18n.t("From")}
                        options={getCities()}
                        handler={handleInputFrom}
                        inputValue={inputFromTo.inputFromCity}
                        getOptionLabel={(o) => o.name}
                    />
                        {<CloseIcon 
                            variant="outlined"
                            onClick={handleClearInputFrom}
                            style={{ cursor: "pointer" }}
                        />}
                </div>
                <DoubleArrowIcon className={classes.media_icon} />
                <div className={classes.media_search}>
                    <FilterComponent
                        label={i18n.t("To")}
                        options={getCities()}
                        handler={handleInputTo}
                        inputValue={inputFromTo.inputToCity}
                        getOptionLabel={(o) => o.name}
                    />
                        {<CloseIcon
                            variant="outlined"
                            onClick={handleClearInputTo}
                            style={{ cursor: "pointer" }}
                        />}
                </div>
            </div>
            <div className={classes.filter_buttons}>
                <Button
                    variant="outlined"
                    onClick={handleClearFields}
                >
                    {i18n.t("Clean")}
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleApplyFilter} 
                    style={{ marginLeft: "10px" }}
                >
                    {i18n.t("Let's Go")}
                </Button>
                
            </div>
        </div>
    );
}

import classes from "../Filter/FilterComponent.module.css";
import { getCityByName } from "../../utils/cities";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "../Filter/FilterComponent";
import { getFilters } from "../../redux/selectors";
import { applyFilterFromCityIdAction, filtersCityFromAction } from "../../redux/actions/filters-actions";
import { getTransfersAction } from "../../redux/actions/transfers-actions";
import i18n from "../../i18n";
import { useEffect, useState } from "react";

export default function FiltersCitiesFrom() {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  const [fromCity, setFromCity] = useState("");
  const [isDiscard, setDiscard] = useState(false);

  console.log(filters);

  useEffect(() => {
    dispatch(filtersCityFromAction());
  }, [dispatch]);

  const handleApplyFilter = () => {
    setDiscard(false);
    const city = getCityByName(fromCity);
    dispatch(applyFilterFromCityIdAction(city ? city.ID : NaN));
  };

  const handleDiscardFilter = () => {
    setDiscard(true);
    setFromCity("");
    dispatch(getTransfersAction());
  };

  const handleInputFrom = (e, v) => {
    setFromCity(v);
  };

  return (
    <div className={classes.filters}>
      <FilterComponent
        label={i18n.t("FromCity")}
        options={filters.fromCities}
        handler={handleInputFrom}
        inputValue={fromCity}
        // getOptionLabel={(o) => o.name}
      />
      <div className={classes.filter_buttons}>
        {filters.isFilterApply ? (
          <Button disabled={isDiscard} variant="contained" color="primary" onClick={handleDiscardFilter}>
            {i18n.t("Discard")}
          </Button>
        ) : (
          <Button disabled={fromCity === ""} variant="contained" color="primary" onClick={handleApplyFilter}>
            {i18n.t("Apply")}
          </Button>
        )}
        <Button
          disabled={fromCity === ""}
          variant="outlined"
          onClick={() => setFromCity("")}
          style={{ marginLeft: "10px" }}
        >
          {i18n.t("Clear")}
        </Button>
      </div>
    </div>
  );
}

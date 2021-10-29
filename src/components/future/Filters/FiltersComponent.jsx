import classes from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "./Filter/FilterComponent";
import { getFilters } from "../../../redux/selectors";
import {
  filtersForApplyAction,
  filtersFromCityAction,
  filtersToCityAction,
} from "../../../redux/actions/filters-actions";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { TRANSFERS_PATH } from "../../../utils/constants";
import { getCityByNameRu } from "../../../utils/cities-util";
import i18n from "../../../i18n";
import { getTransfersAction } from "../../../redux/actions/transfers-actions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FiltersComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const filters = useSelector(getFilters);
  const [cities, setCities] = useState({ from: "", to: "" });
  const [isFilterApply, setFilterApply] = useState(false);
  const fcn = query.get("from");
  const tcn = query.get("to");
  const pass = query.get("pass-parcel");
  const pets = query.get("pets-allowed");
  const regularTrips = query.get("regular-trips");

  console.log(filters, query, cities);

  const handleDiscardFilter = () => {
    setFilterApply(false);
    setCities({ from: "", to: "" });
  };

  const handleInputFrom = (e, v) => {
    setCities({ ...cities, from: v });
  };

  const handleInputTo = (e, v) => {
    setCities({ ...cities, to: v });
  };

  useEffect(() => {
    dispatch(filtersFromCityAction());
    dispatch(filtersToCityAction());
    if (fcn || tcn || pass || pets || regularTrips) {
      setFilterApply(true);
      setCities({ from: fcn, to: tcn });
      const cityFrom = getCityByNameRu(fcn);
      const cityTo = getCityByNameRu(tcn);
      // dispatch(filtersForApplyAction([fcn, tcn, pass, pets, regularTrips]));
      dispatch(filtersForApplyAction([cityFrom ? cityFrom.ID : "", cityTo ? cityTo.ID : ""], ["from", "to"]));
    } else {
      dispatch(getTransfersAction());
    }
  }, [dispatch, fcn, pass, pets, regularTrips, tcn]);

  return (
    <div className={classes.filters}>
      <div className={classes.cities}>
        <FilterComponent
          label={i18n.t("FromCity")}
          options={filters.fromCities}
          handler={handleInputFrom}
          inputValue={cities.from}
          // getOptionLabel={(o) => o.name}
        />
        <FilterComponent
          label={i18n.t("ToCity")}
          options={filters.toCities}
          handler={handleInputTo}
          inputValue={cities.to}
          // getOptionLabel={(o) => o.name}
        />
      </div>
      <div className={classes.buttons_block}>
        <Button
          disabled={!isFilterApply}
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push(`${TRANSFERS_PATH}`);
            handleDiscardFilter();
          }}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        >
          {i18n.t("Discard")}
        </Button>
        <Button
          disabled={cities.from === "" && cities.to === ""}
          variant="contained"
          color="primary"
          onClick={() => {
            const f = cities.from;
            const t = cities.to;
            history.push(
              `${TRANSFERS_PATH}?from=${f}&to=${t}&pass-parcel=${false}&pets-allowed=${false}&regular-trips=${false}`
            );
          }}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        >
          {i18n.t("Apply")}
        </Button>
        <Button
          disabled={cities.from === "" && cities.to === ""}
          variant="outlined"
          onClick={() => setCities({ from: "", to: "" })}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        >
          {i18n.t("Clear")}
        </Button>
      </div>
    </div>
  );
}

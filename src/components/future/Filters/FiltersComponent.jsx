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
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FiltersComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const filters = useSelector(getFilters);
  const [uriData, setUriData] = useState({
    from: "",
    to: "",
    date: "",
    pets: false,
    pass: false,
    regular: false,
  });
  const [isFilterApply, setFilterApply] = useState(false);
  const fcn = query.get("from");
  const tcn = query.get("to");
  const date = query.get("date");
  const pass = query.get("pass-parcel");
  const pets = query.get("pets-allowed");
  const regularTrips = query.get("regular-trips");

  console.log(filters, query, uriData);

  function getUri() {
    let uri = `${TRANSFERS_PATH}`;
    if (uriData.from !== "") {
      uri += `?from=${uriData.from}`;
    }
    if (uriData.to !== "") {
      uri += uri.includes("?") ? `&to=${uriData.to}` : `?to=${uriData.to}`;
    }
    if (uriData.date !== "") {
      uri += uri.includes("?") ? `&date=${uriData.date}` : `?date=${uriData.date}`;
    }
    return uri;
  }

  const handleDiscardFilter = () => {
    setFilterApply(false);
    setUriData({ from: "", to: "" });
  };

  const handleInputFrom = (e, v) => {
    setUriData({ ...uriData, from: v });
  };

  const handleInputTo = (e, v) => {
    setUriData({ ...uriData, to: v });
  };

  useEffect(() => {
    dispatch(filtersFromCityAction());
    dispatch(filtersToCityAction());
  }, [dispatch]);

  useEffect(() => {
    if (fcn || tcn) {
      setFilterApply(true);
      const cityTo = getCityByNameRu(tcn);
      const cityFrom = getCityByNameRu(fcn);
      if (cityTo && cityFrom) {
        dispatch(filtersForApplyAction([cityFrom.ID, cityTo.ID], ["from", "to"]));
      } else if (cityFrom) {
        dispatch(filtersForApplyAction([cityFrom.ID], ["from"]));
      } else if (cityTo) {
        dispatch(filtersForApplyAction([cityTo.ID], ["to"]));
      }
    } else {
      dispatch(getTransfersAction());
    }
  }, [dispatch, fcn, tcn]);

  return (
    <div className={classes.filters_sector}>
      <span>{i18n.t("Filter")}</span>
      <div className={classes.filters}>
        <div className={classes.block}>
          <FilterComponent
            label={i18n.t("FromCity")}
            options={filters.fromCities}
            handler={handleInputFrom}
            inputValue={uriData.from}
            // getOptionLabel={(o) => o.name}
          />
          <FilterComponent
            label={i18n.t("ToCity")}
            options={filters.toCities}
            handler={handleInputTo}
            inputValue={uriData.to}
            // getOptionLabel={(o) => o.name}
          />
        </div>
        <div className={classes.block}>
          <TextField
            id="date"
            label={i18n.t("Date")}
            type="date"
            margin="normal"
            value={uriData.date}
            onChange={(e) => setUriData({ ...uriData, date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={uriData.pass}
                onChange={() => setUriData({ ...uriData, pass: !uriData.pass })}
              />
            }
            label={i18n.t("Pass a parcel")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={uriData.pets}
                onChange={() => setUriData({ ...uriData, pets: !uriData.pets })}
              />
            }
            label={i18n.t("PetsAllowed")}
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
            disabled={uriData.from === "" && uriData.to === ""}
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(getUri());
            }}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            {i18n.t("Apply")}
          </Button>
          <Button
            disabled={uriData.from === "" && uriData.to === ""}
            variant="outlined"
            onClick={() => setUriData({ from: "", to: "" })}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            {i18n.t("Clear")}
          </Button>
        </div>
      </div>
    </div>
  );
}

import classes from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import FilterComponent from "./Filter/FilterComponent";
import { getFilters } from "../../../redux/selectors";
import {
  applyFiltersAction,
  filtersFromCityAction,
  filtersToCityAction,
} from "../../../redux/actions/filters-actions";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { TRANSFERS_PATH } from "../../../utils/constants";
import { getCityByName } from "../../../utils/cities-util";
import i18n from "../../../i18n";
import { getTransfersAction } from "../../../redux/actions/transfers-actions";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { getFilterUri } from "../../../utils/filters-util";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FiltersComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const filters = useSelector(getFilters);
  const [uriData, setUriData] = useState({
    from: query.get("from") || "",
    to: query.get("to") || "",
    date: query.get("date") || "",
    regular_trips: query.get("regular-trips") || false,
    pass_parcel: query.get("pass-parcel") || false,
    pets_allowed: query.get("pets-allowed") || false,
  });

  const handleInputFrom = (e, v) => {
    setUriData({ ...uriData, from: v });
  };

  const handleInputTo = (e, v) => {
    setUriData({ ...uriData, to: v });
  };

  useEffect(() => {
    dispatch(filtersFromCityAction());
    dispatch(filtersToCityAction());
    if (
      uriData.from ||
      uriData.to ||
      uriData.date ||
      uriData.pass_parcel ||
      uriData.pets_allowed ||
      uriData.regular_trips
    ) {
      const cityTo = getCityByName(uriData.to);
      const cityFrom = getCityByName(uriData.from);
      let objForFB = {
        from: cityFrom ? cityFrom.ID : "",
        to: cityTo ? cityTo.ID : "",
        date: uriData.date,
        regularTrips: Boolean(uriData.regular_trips),
        passAParcel: Boolean(uriData.pass_parcel),
        isPetsAllowed: Boolean(uriData.pets_allowed),
      };
      dispatch(applyFiltersAction(objForFB));
    } else {
      dispatch(getTransfersAction());
    }
  }, [dispatch, uriData]);

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
            disabled={uriData.regular_trips}
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
          <Button
            disabled={uriData.date === ""}
            variant="outlined"
            onClick={() =>
              setUriData({
                ...uriData,
                date: "",
              })
            }
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            {i18n.t("Clear")}
          </Button>
        </div>
        <div className={classes.block}>
          <FormControlLabel
            control={
              <Checkbox
                checked={uriData.regular_trips}
                onChange={() => setUriData({ ...uriData, date: "", regular_trips: !uriData.regular_trips })}
              />
            }
            label={i18n.t("Regular trips")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={uriData.pass_parcel}
                onChange={() => setUriData({ ...uriData, pass_parcel: !uriData.pass_parcel })}
              />
            }
            label={i18n.t("Pass a parcel")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={uriData.pets_allowed}
                onChange={() => setUriData({ ...uriData, pets_allowed: !uriData.pets_allowed })}
              />
            }
            label={i18n.t("PetsAllowed")}
          />
        </div>
        <div className={classes.buttons_block}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(getFilterUri(`${TRANSFERS_PATH}`, uriData))}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            {i18n.t("Apply")}
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              setUriData({
                from: "",
                to: "",
                date: "",
                regular: false,
                pass: false,
                pets: false,
              })
            }
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            {i18n.t("Clear")}
          </Button>
        </div>
      </div>
    </div>
  );
}

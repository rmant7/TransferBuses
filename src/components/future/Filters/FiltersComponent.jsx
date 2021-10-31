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
import { getCityByNameRu } from "../../../utils/cities-util";
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
    from: "",
    to: "",
    date: "",
    regular_trips: false,
    pass_parcel: false,
    pets_allowed: false,
  });
  const from = query.get("from") || "";
  const to = query.get("to") || "";
  const date = query.get("date") || "";
  const pass = query.get("pass-parcel") || false;
  const pets = query.get("pets-allowed") || false;
  const regular = query.get("regular-trips") || false;

  console.log(filters, query, uriData);

  console.log(filters, query, uriData);

  const handleInputFrom = (e, v) => {
    setUriData({ ...uriData, from: v });
  };

  const handleInputTo = (e, v) => {
    setUriData({ ...uriData, to: v });
  };

  useEffect(() => {
    dispatch(filtersFromCityAction());
    dispatch(filtersToCityAction());
    setUriData({
      from,
      to,
      date,
      regular_trips: Boolean(regular),
      pass_parcel: Boolean(pass),
      pets_allowed: Boolean(pets),
    });
    if (from || to || date || pass || pets || regular) {
      const cityTo = getCityByNameRu(to);
      const cityFrom = getCityByNameRu(from);
      let objForFB = {
        from,
        to,
        date,
        regularTrips: Boolean(regular),
        passAParcel: Boolean(pass),
        isPetsAllowed: Boolean(pets),
      };
      if (cityTo) {
        objForFB = { ...objForFB, to: cityTo.ID };
      }
      if (cityFrom) {
        objForFB = { ...objForFB, from: cityFrom.ID };
      }
      console.log(objForFB);
      dispatch(applyFiltersAction(objForFB));
    } else {
      dispatch(getTransfersAction());
    }
  }, [date, dispatch, from, pass, pets, regular, to]);

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

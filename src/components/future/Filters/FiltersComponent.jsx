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
  const regular = query.get("regular-trips");

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
    if (uriData.pass) {
      uri += uri.includes("?") ? `&pass-parcel=${uriData.pass}` : `?pass-parcel=${uriData.pass}`;
    }
    if (uriData.pets) {
      uri += uri.includes("?") ? `&pets-allowed=${uriData.pets}` : `?pets-allowed=${uriData.pets}`;
    }
    if (uriData.regular) {
      uri += uri.includes("?") ? `&regular-trips=${uriData.regular}` : `?regular-trips=${uriData.regular}`;
    }
    return uri;
  }

  const handleDiscardFilter = () => {
    setFilterApply(false);
    setUriData({
      from: "",
      to: "",
      date: "",
      pets: false,
      pass: false,
      regular: false,
    });
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
    if (fcn || tcn || date || pass || pets || regular) {
      setFilterApply(true);
      const cityTo = getCityByNameRu(tcn);
      const cityFrom = getCityByNameRu(fcn);
      const values = [];
      const keys = [];
      if (cityTo && cityFrom) {
        setUriData({ ...uriData, from: fcn, to: tcn });
        values.push([cityFrom.ID, cityTo.ID]);
        keys.push(["from", "to"]);
      } else if (cityFrom) {
        setUriData({ ...uriData, from: fcn });
        values.push(cityFrom.ID);
        keys.push("from");
      } else if (cityTo) {
        setUriData({ ...uriData, to: tcn });
        values.push(cityTo.ID);
        keys.push("to");
      }
      if (date) {
        setUriData({ ...uriData, date });
        values.push(date);
        keys.push("date");
      }
      if (regular === "true") {
        setUriData({ ...uriData, regular });
        values.push(Boolean(regular));
        keys.push("regularTrips");
      }
      if (pass === "true") {
        setUriData({ ...uriData, pass });
        values.push(Boolean(pass));
        keys.push("passAParcel");
      }
      if (pets === "true") {
        setUriData({ ...uriData, pets });
        values.push(Boolean(pets));
        keys.push("isPetsAllowed");
      }
      console.log(values, keys);
      dispatch(filtersForApplyAction(values, keys));
    } else {
      dispatch(getTransfersAction());
    }
  }, [date, dispatch, fcn, pass, pets, regular, tcn]);

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
          <Button
            disabled={uriData.from === "" && uriData.to === ""}
            variant="outlined"
            onClick={() =>
              setUriData({
                ...uriData,
                from: "",
                to: "",
              })
            }
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            {i18n.t("Clear")}
          </Button>
        </div>
        <div className={classes.block}>
          <TextField
            disabled={uriData.regular}
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
                checked={uriData.regular}
                onChange={() => setUriData({ ...uriData, date: "", regular: !uriData.regular })}
              />
            }
            label={i18n.t("Regular trips")}
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
            // disabled={uriData.from === "" && uriData.to === "" && uriData.date === ""}
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
            disabled={uriData.from === "" && uriData.to === "" && uriData.date === ""}
            variant="outlined"
            onClick={() =>
              setUriData({
                from: "",
                to: "",
                date: "",
                pets: false,
                pass: false,
                regular: false,
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

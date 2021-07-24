import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./DriverPage.css";
import { useState } from "react";
import { uploadTransfer } from "../../services/data-service";
import { useHistory } from "react-router-dom";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import data from "../../data.json";
import i18n from "../../i18n";

const schema = yup.object().shape({
  from: yup.string().required("From is required"),
  to: yup.string().required("To is required"),
  date: yup.string().required("Date is required"),
  duration: yup.string().required("Duration is required"),
  places: yup
    .number()
    .min(1, "Available places must be more or equal to 1")
    .max(8, "Available places must be less or equal to 8")
    .required("Required field"),
  phoneNumber: yup.string().required("Phone number is required"),
  price: yup.string().required("Price is required"),
});

export default function DriverPage() {
  // TODO: Переделать на данные получаемые с CheapTrip.guru (функция getCities(searchString) )
  const cities = data.cities.map((feature) => {
    return { title: feature.city };
  });
  const [state, setState] = useState({});
  const history = useHistory();
  const defaultProps = {
    options: cities,
    getOptionLabel: (option) => {
      return option.title;
    },
  };

  return (
    <div className={"container"}>
      <Formik
        initialValues={{
          date: new Date().toJSON().slice(0, 16),
          phone: "",
          places: 1,
          price: "",
          duration: 0,
          passAParcel: false,
          driversComment: "",
        }}
        onSubmit={(values) => {
          console.log("SUBMITTING");
          uploadTransfer(
            values.from,
            values.to,
            values.date,
            values.phoneNumber,
            values.places,
            values.price,
            values.duration,
            values.passAParcel,
            values.driversComment
          )
            .then((response) => {
              console.log(response);
              history.push("/");
            })
            .catch((error) => {
              console.log(error);
              setState({ error: error });
            });
        }}
        validationSchema={schema}
      >
        {(props) => {
          console.log(props);

          return (
            <form onSubmit={props.handleSubmit}>
              <Autocomplete
                {...defaultProps}
                id="from"
                name={"from"}
                value={props.values.from}
                onChange={(e, v) => {
                  props.setFieldValue("from", v?.title || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={i18n.t("From")}
                    margin="normal"
                  />
                )}
              />

              {props.errors.from && (
                <span style={{ color: "red" }}>{props.errors.from}</span>
              )}

              <Autocomplete
                {...defaultProps}
                id="to"
                name={"to"}
                value={props.values.to}
                onChange={(e, v) => {
                  props.setFieldValue("to", v?.title || "");
                }}
                renderInput={(params) => (
                  <TextField {...params} label={i18n.t("To")} margin="normal" />
                )}
              />

              {props.errors.to && (
                <span style={{ color: "red" }}>{props.errors.to}</span>
              )}

              <Grid container justifyContent="space-between">
                <TextField
                  id="date"
                  // label="Date and time"
                  label={i18n.t("Date and time")}
                  type="datetime-local"
                  margin="normal"
                  value={props.values.date}
                  onChange={props.handleChange}
                  inputProps={{
                    min: new Date().toISOString().slice(0, 16),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                {props.errors.date && (
                  <span style={{ color: "red" }}>{props.errors.date}</span>
                )}

                <TextField
                  id="duration"
                  //label="Duration of travel"
                  label={i18n.t("Travel time")}
                  type="Time"
                  margin="normal"
                  value={props.values.duration}
                  onChange={props.handleChange}
                  // error={
                  //   props.touched.duration && Boolean(props.errors.duration)
                  // }
                  // helperText={props.touched.duration && props.errors.duration}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {props.errors.duration && (
                  <span style={{ color: "red" }}>{props.errors.duration}</span>
                )}
              </Grid>

              <TextField
                fullWidth
                id="phone"
                name="phoneNumber"
                label={i18n.t("Phone number")}
                margin="normal"
                value={props.values.phoneNumber}
                onChange={props.handleChange}
                // error={
                //   props.touched.phoneNumber && Boolean(props.errors.phoneNumber)
                // }
                // helperText={
                //   props.touched.phoneNumber && props.errors.phoneNumber
                // }
              />
              {props.errors.phoneNumber && (
                <span style={{ color: "red" }}>{props.errors.phoneNumber}</span>
              )}

              <Grid container justifyContent="space-between">
                <TextField
                  value={props.values.places}
                  margin="normal"
                  id="places"
                  // label={"Places"}
                  label={i18n.t("Places")}
                  onChange={props.handleChange}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 8,
                    type: "number",
                    // 'aria-labelledby': 'input-slider',
                  }}
                />

                {props.errors.places && (
                  <span style={{ color: "red" }}>{props.errors.places}</span>
                )}

                <TextField
                  value={props.values.price}
                  margin="normal"
                  id="price"
                  label={i18n.t("Price")}
                  onChange={props.handleChange}
                  inputProps={{
                    min: 0,
                    type: "price",
                    "aria-labelledby": "input-slider",
                  }}
                />

                {props.errors.price && (
                  <span style={{ color: "red" }}>{props.errors.price}</span>
                )}
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    id={"passAParcel"}
                    checked={props.values.passAParcel}
                    onChange={props.handleChange}
                    color="primary"
                    value={props.values.parcel}
                  />
                }
                label={i18n.t("Pass a parcel")}
              />
              <TextField
                value={props.values.driversComment}
                margin="normal"
                id="driversComment"
                name="driversComment"
                multiline
                rows={4}
                label={i18n.t("Driver's Comment")}
                onChange={props.handleChange}
              />

              {props.errors.driversComment && (
                <span style={{ color: "red" }}>
                  {props.errors.driversComment}
                </span>
              )}

              <div className={"submitBtn"}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {i18n.t("Publish a ride")}
                </Button>

                {props.errors.driversComment && (
                  <span style={{ color: "red" }}>
                    {props.errors.driversComment}
                  </span>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

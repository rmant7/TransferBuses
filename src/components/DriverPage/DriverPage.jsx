import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./DriverPage.css";
import { uploadTransfer } from "../../services/data-service";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import data from "../../data.json"
import i18n from "../../i18n"


const validationSchema = yup.object({
  // from: yup
  //     .string('Enter or select a city')
  //     .required('From is required'),
  // to: yup
  //     .string('Enter or select a city')
  //     .required('To is required'),
  // date: yup
  //     .string('Enter transfer date')
  //     .required('Date is required'),
  // email: yup
  //     .string('Enter your email')
  //     .email('Enter a valid email')
  //     .required('Email is required'),
  // places: yup
  //     .number()
  //     .min(1, "Available places must be more or equal to 1")
  //     .max(8, "Available places must be less or equal to 8")
  //     .required("Required field"),
});

export default function DriverPage() {
  const cities = data.cities.map(feature => {return {title:feature.city}})
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      // from: "",
      // to: "",
      // date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
      // date: new Date().toJSON().slice(0, 10),
      date: new Date().toJSON().slice(0, 16),
      phone: "",
      places: 1,
      price: "",
      duration: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log('hello')
      // alert(JSON.stringify(values, null, 2));
      console.log("SUBMITTING");
      uploadTransfer(
        values.from,
        values.to,
        values.date,
        values.phoneNumber,
        values.places,
        values.price,
        values.duration
      )
        .then((response) => {
          console.log(response);
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const defaultProps = {
    options: cities,
    getOptionLabel: (option) => {
      return option.title;
    },
  };

  return (
    <div className={"container"}>
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          {...defaultProps}
          id="from"
          name={"from"}
          value={formik.values.to}
          onChange={(e, v) => {
            formik.setFieldValue("from", v?.title || "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="From"
              margin="normal"
              value={formik.values.from}
            />
          )}
        />
        <Autocomplete
          {...defaultProps}
          id="to"
          name={"to"}
          value={formik.values.to}
          onChange={(e, v) => {
            formik.setFieldValue("to", v?.title || "");
          }}
          renderInput={(params) => (
            <TextField {...params} label="To" margin="normal" />
          )}
        />
        <Grid container justifyContent="space-between">
          <TextField
            id="date"
            // label="Date and time"
            label={i18n.t("dateAndTime")}
            // type="date"
            type="datetime-local"
            margin="normal"
            value={formik.values.date}
            onChange={formik.handleChange}
            inputProps={{
              min: new Date().toISOString().slice(0, 16),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="duration"
            label="Duration of travel"
            type="Time"
            margin="normal"
            value={formik.values.duration}
            onChange={formik.handleChange}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <TextField
          fullWidth
          id="phone"
          name="phoneNumber"
          label="Phone Number"
          margin="normal"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        <Grid container justifyContent="space-between">
          <TextField
            value={formik.values.places}
            margin="normal"
            id="places"
            label={"Places"}
            onChange={formik.handleChange}
            inputProps={{
              step: 1,
              min: 1,
              max: 8,
              type: "number",
              // 'aria-labelledby': 'input-slider',
            }}
          />
          <TextField
            value={formik.values.price}
            margin="normal"
            id="price"
            label={"Price"}
            onChange={formik.handleChange}
            inputProps={{
              min: 0,
              type: "price",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>

        <div className={"submitBtn"}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

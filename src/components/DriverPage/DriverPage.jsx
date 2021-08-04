import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./DriverPage.css";
import { uploadTransfer } from "../../services/data-service";
import { useHistory } from "react-router-dom";
import { Checkbox, FormControlLabel, Grid, Paper } from "@material-ui/core";
import data from "../../data.json";
import i18n from "../../i18n";

const phoneRegExp =
  /^(?!\+.*\(.*\).*\-\-.*$)(?!\+.*\(.*\).*\-$)(([0-9]{0,4})?(\+[0-9]{1,3})?(\([0-9]{1,3})?(\)[0-9]{1})?([-0-9]{0,8})?([0-9]{0,1})?)$/;
const schema = yup.object().shape({
  from: yup.string().required("from.Required"),
  to: yup.string().required("to.Required"),
  // time: yup.string().required("time.Required"),
  departureTime: yup.string().required("departureTime.Required"),
  duration: yup.string().required("duration.Required"),
  places: yup
    .number()
    .min(1, "Available places must be more or equal to 1")
    .max(8, "Available places must be less or equal to 8")
    .required("places.Required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "phoneNumber.Phone number is not valid")
    .required("phoneNumber.Required"),
  price: yup.string().required("price.Required"),
});

export default function DriverPage() {
  const cities = data.cities
    .reduce((acc, val) => {
      acc.push({ id: val.ID, title: val.name });
      acc.push({ id: val.ID, title: val['name_ru'] });
      return acc;
    }, [])
    .sort((a, b) => (a.title < b.title ? -1 : 1));

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
          date: new Date().toJSON().slice(0, 10),
          time: "",
          departureTime: "",
          phoneNumber: "",
          places: 1,
          price: "",
          duration: "",
          passAParcel: false,
          driversComment: "",
          regularTrips: false,
          regularTripsDays: {
            _0monday: false,
            _1tuesday: false,
            _2wednesday: false,
            _3thursday: false,
            _4friday: false,
            _5saturday: false,
            _6sunday: false,
          },
        }}
        onSubmit={(values) => {
          console.log("SUBMITTING");

          uploadTransfer(values)
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

          const handleSelectAllDaysChange = (event) => {
            console.log(event.target);
            console.log(event.target.checked);
            const weekDays = {};
            Object.keys(props.values.regularTripsDays).map((weekDay) => {
              weekDays[weekDay] = event.target.checked;
            });

            console.log(weekDays);
            props.setFieldValue("regularTripsDays", weekDays);
          };

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
                    error={
                      props.errors.from ? true : false
                    }
                    helperText={
                      props.errors.from &&
                      i18n.t(`form.errors.${props.errors.from}`)
                    }
                  />
                )}
              />

              <Autocomplete
                {...defaultProps}
                id="to"
                name={"to"}
                value={props.values.to}
                onChange={(e, v) => {
                  props.setFieldValue("to", v?.title || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={i18n.t("To")}
                    margin="normal"
                    error={props.errors.to ? true : false}
                    helperText={
                      props.errors.to &&
                      i18n.t(`form.errors.${props.errors.to}`)
                    }
                  />
                )}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    id={"regularTrips"}
                    checked={props.values.regularTrips}
                    onChange={props.handleChange}
                    color="primary"
                  />
                }
                label={i18n.t("Regular trips")}
              />

              {props.values.regularTrips && (
                <Paper variant="outlined" style={{ padding: "8px" }}>
                  <Grid container direction={"column"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            Object.values(props.values.regularTripsDays).reduce(
                              (acc, val) => (acc += +val),
                              0
                            ) === 7
                          }
                          onChange={handleSelectAllDaysChange}
                          name="selectAll"
                          margin={""}
                        />
                      }
                      label={i18n.t("Select all")}
                    />

                    {Object.keys(props.values.regularTripsDays).map(
                      (weekDay) => {
                        return (
                          <FormControlLabel
                            style={{ marginLeft: "10px" }}
                            control={
                              <Checkbox
                                checked={props.values.regularTripsDays[weekDay]}
                                onChange={props.handleChange}
                                name={"regularTripsDays." + weekDay}
                                key={"regularTripsDays." + weekDay}
                              />
                            }
                            label={i18n.t(weekDay)}
                          />
                        );
                      }
                    )}
                  </Grid>
                </Paper>
              )}

              {!props.values.regularTrips && (
                <Grid container justifyContent="space-between">
                  <TextField
                    id="date"
                    label={i18n.t("Date")}
                    type="date"
                    margin="normal"
                    error={
                      props.errors.time && props.touched.time ? true : false
                    }
                    value={props.values.time}
                    onChange={props.handleChange}
                    inputProps={{
                      min: new Date().toISOString().slice(0, 10),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      props.errors.time &&
                      props.touched.time &&
                      i18n.t(`form.errors.${props.errors.time}`)
                    }
                  />

                  <TextField
                    id="departureTime"
                    label={i18n.t("Time")}
                    type="time"
                    margin="normal"
                    error={
                      props.errors.departureTime && props.touched.departureTime
                        ? true
                        : false
                    }
                    value={props.values.departureTime}
                    onChange={props.handleChange}
                    inputProps={{
                      min: new Date().toISOString().slice(0, 16),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      props.errors.departureTime &&
                      props.touched.departureTime &&
                      i18n.t(`form.errors.${props.errors.departureTime}`)
                    }
                  />

                  <TextField
                    id="duration"
                    label={i18n.t("Travel time")}
                    type="Time"
                    margin="normal"
                    value={props.values.duration}
                    error={
                      props.errors.duration && props.touched.duration
                        ? true
                        : false
                    }
                    onChange={props.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      props.errors.duration &&
                      props.touched.duration &&
                      i18n.t(`form.errors.${props.errors.duration}`)
                    }
                  />
                </Grid>
              )}

              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label={i18n.t("Phone number")}
                margin="normal"
                error={
                  props.errors.phoneNumber && props.touched.phoneNumber
                    ? true
                    : false
                }
                value={props.values.phoneNumber}
                onChange={props.handleChange}
                helperText={
                  props.errors.phoneNumber &&
                  props.touched.phoneNumber &&
                  i18n.t(`form.errors.${props.errors.phoneNumber}`)
                }
              />

              <Grid container justifyContent="space-between">
                <TextField
                  value={props.values.places}
                  margin="normal"
                  error={
                    props.errors.places && props.touched.plases ? true : false
                  }
                  id="places"
                  label={i18n.t("Places")}
                  onChange={props.handleChange}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 8,
                    type: "number",
                  }}
                  helperText={
                    props.errors.places &&
                    props.touched.places &&
                    i18n.t(`form.errors.${props.errors.places}`)
                  }
                />

                <TextField
                  value={props.values.price}
                  margin="normal"
                  error={
                    props.errors.price && props.touched.price ? true : false
                  }
                  id="price"
                  label={i18n.t("Price")}
                  onChange={props.handleChange}
                  inputProps={{
                    min: 0,
                    type: "price",
                    "aria-labelledby": "input-slider",
                  }}
                  helperText={
                    props.errors.price &&
                    props.touched.price &&
                    i18n.t(`form.errors.${props.errors.price}`)
                  }
                />
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
                error={
                  props.errors.driversComment && props.touched.driversComment
                    ? true
                    : false
                }
                label={i18n.t("Driver's comment")}
                onChange={props.handleChange}
                helperText={
                  props.errors.driversComment &&
                  props.touched.driversComment &&
                  i18n.t(`form.errors.${props.errors.driversComment}`)
                }
              />

              <div className={"submitBtn"}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {i18n.t("Publish a ride")}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

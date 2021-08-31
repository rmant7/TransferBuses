import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {Formik} from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./DriverPage.css";
import {uploadTransfer} from "../../services/data-service";
import {useHistory} from "react-router-dom";
import {Checkbox, FormControlLabel, Grid, MenuItem, Paper, Select, Tooltip,} from "@material-ui/core";
import cities_json from "../../cities.json";
import i18n from "../../i18n";
import {useSelector} from "react-redux";
import {currencies} from "../../utils/currencies";
import axios from "axios";
import "yup-phone-lite";
import {useStyles} from "../../utils/useStyles";

const schema = yup.object().shape({
  from: yup.string().required("from.Required"),
  to: yup.string().required("to.Required"),
  date: yup.date().required("date.Required"), //!!! date, departureTime, and duration are conditionally reassigned later;
  departureTime: yup.string().required("departureTime.Required"),
  duration: yup.string().required("duration.Required"),
  places: yup
    .number()
    .min(1, "Available places must be more or equal to 1")
    .max(8, "Available places must be less or equal to 8")
    .required("places.Required"),
  phoneNumber: yup
    .string()
    .required("phoneNumber.Required")
    .phone(undefined, "phoneNumber.isNotValid"),
  price: yup.string().required("price.Required"),
});

export default function DriverPage() {
  const cur = useSelector(state => state.app.currency);
  const classes = useStyles();
  const [rideCurrency, setRideCurrency] = useState(cur);
  const [messenger, setMessenger] = useState();
  const [nearesttCity, setNearestCity] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  console.log("cur: ", cur);
  console.log("rideCurrency: ", rideCurrency);
  console.log("Current latitude", latitude);
  console.log("Current longitude", longitude);

  const cities = cities_json
    .reduce((acc, val) => {
      acc.push({id: val.ID, title: val.name});
      acc.push({id: val.ID, title: val["name_ru"]});
      return acc;
    }, [])
    .sort((a, b) => (a.title < b.title ? -1 : 1));

  const [state, setState] = useState({});
  const history = useHistory();
  const defaultProps = {
    options: cities,
    getOptionLabel: option => {
      console.log(option.title);
      return option.title;
    },
  };

  const getCity = (lat, long) => {
    const URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&accept-language=en`;
    axios.get(URL).then(response => console.log(response.data));
  };

  // !! Compute Distance Between current city and nearest City in AutoComplete "From".
  const getDefaultCity = () => {
    // debugger;
    const deg2rad = deg => {
      return deg * (Math.PI / 180);
    };
    let results = [];
    let radius = 6371; //!! Radius of the earth in km
    cities_json.forEach(element => {
      let dLat = deg2rad(latitude - element.latitude);
      let dLng = deg2rad(longitude - element.longitude);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(latitude)) *
        Math.cos(deg2rad(element.latitude)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = radius * c;
      results.push({
        ID: element.ID,
        name: element.name,
        distance: d,
      });
    });
    let nearestCity = {
      ID: results[0].ID,
      name: results[0].name,
      distance: results[0].distance,
    };
    results.forEach(element => {
      if (nearestCity.distance < element.distance) {
        let nearestCity = {
          ID: element.ID,
          name: element.name,
          distance: element.distance,
        };
      }
    });
    console.log("nearestCity", nearestCity);
  };

  useEffect(() => {
    let startPos;
    const geoSuccess = function (position) {
      startPos = position;
      setLatitude(startPos.coords.latitude);
      setLongitude(startPos.coords.longitude);
      getCity(startPos.coords.latitude, startPos.coords.longitude);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getDefaultCity();
    }
  });

  return (
    <div className="container">
      <Formik
        initialValues={{
          date: new Date().toJSON().slice(0, 10),
          departureTime: "",
          phoneNumber: "",
          places: 1,
          price: "",
          currency: rideCurrency,
          duration: "",
          passAParcel: false,
          additionalInfo: "",
          regularTrips: false,
          regularTripsDays: {
            _0monday: {
              selected: false,
              departureTime: "",
            },
            _1tuesday: {
              selected: false,
              departureTime: "",
            },
            _2wednesday: {
              selected: false,
              departureTime: "",
            },
            _3thursday: {
              selected: false,
              departureTime: "",
            },
            _4friday: {
              selected: false,
              departureTime: "",
            },
            _5saturday: {
              selected: false,
              departureTime: "",
            },
            _6sunday: {
              selected: false,
              departureTime: "",
            },
          },
        }}
        onSubmit={values => {
          console.log("SUBMITTING");

          uploadTransfer(values)
            .then(response => {
              console.log(response);
              history.push("/");
            })
            .catch(error => {
              console.log(error);
              setState({error: error});
            });
        }}
        validationSchema={schema}
      >
        {props => {
          console.log("Formik props: ", props);

          if (props.values.regularTrips) {
            schema.fields.date = null
            schema.fields.duration = null
            schema.fields.departureTime = null
          } else {
            schema.fields.date = yup.date().required("date.Required")
            schema.fields.departureTime = yup.string().required("departureTime.Required")
            schema.fields.duration = yup.string().required("duration.Required")
          }

          const handleSelectAllDaysChange = event => {
            console.log(event.target);
            console.log(event.target.checked);
            const weekDays = {};
            Object.keys(props.values.regularTripsDays).map(weekDay => {
              weekDays[weekDay] = {
                selected: event.target.checked,
                departureTime:
                props.values.regularTripsDays[weekDay].departureTime,
              };
            });

            console.log("weekdays: ", weekDays);
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
                  props.setFieldValue("from", v?.id || "");
                }}
                onBlur={props.handleBlur}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={i18n.t("From")}
                    margin="normal"
                    error={Boolean(props.errors.from) && props.touched.from}
                    helperText={
                      Boolean(props.errors.from) &&
                      props.touched.from ?
                        i18n.t(`form.errors.${props.errors.from}`) :
                        " "
                    }
                  />
                )}
                ListboxProps={{style: {maxHeight: "7rem"}}}
              />
              <Autocomplete
                {...defaultProps}
                id="to"
                name={"to"}
                value={props.values.to}
                onBlur={props.handleBlur}
                onChange={(e, v) => {
                  props.setFieldValue("to", v?.id || "");
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={i18n.t("To")}
                    margin="normal"
                    error={Boolean(props.errors.to) && props.touched.to}
                    helperText={
                      Boolean(props.errors.to) &&
                      props.touched.to ?
                        i18n.t(`form.errors.${props.errors.to}`) :
                        " "
                    }
                  />
                )}
                ListboxProps={{style: {maxHeight: "7rem"}}}
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
                <Paper variant="outlined" style={{padding: "8px"}}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{minHeight: "100vh"}}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            Object.values(props.values.regularTripsDays).reduce(
                              (acc, val) => (acc += +val.selected),
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

                    {Object.keys(props.values.regularTripsDays).map(weekDay => {
                      return (
                        <Grid
                          container
                          direction={"row"}
                          alignItems="flex-end"
                          id={"regularTripsDays." + weekDay}
                          key={"regularTripsDays." + weekDay}
                        >
                          <Grid item xs={9}>
                            <FormControlLabel
                              style={{marginLeft: "10px"}}
                              control={
                                <Checkbox
                                  id={
                                    "regularTripsDays." + weekDay + ".selected"
                                  }
                                  checked={
                                    props.values.regularTripsDays[weekDay]
                                      .selected
                                  }
                                  onChange={props.handleChange}
                                  name={
                                    "regularTripsDays." + weekDay + ".selected"
                                  }
                                />
                              }
                              label={i18n.t(weekDay)}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Tooltip title={i18n.t("Time")} placement="top">
                              <TextField
                                id={
                                  "regularTripsDays." +
                                  weekDay +
                                  ".departureTime"
                                }
                                name={
                                  "regularTripsDays." +
                                  weekDay +
                                  ".departureTime"
                                }
                                type="time"
                                margin="normal"
                                disabled={
                                  !props.values.regularTripsDays[weekDay]
                                    .selected
                                }
                                value={
                                  props.values.regularTripsDays[weekDay]
                                    .departureTime
                                }
                                onChange={props.handleChange}
                              />
                            </Tooltip>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              )}
              {!props.values.regularTrips && (
                <Grid container justifyContent="space-between">
                  <Grid item xs={5}>
                    <TextField
                      id="date"
                      label={i18n.t("Date")}
                      type="date"
                      margin="normal"
                      fullWidth
                      onBlur={props.handleBlur}
                      error={Boolean(props.errors.date) && props.touched.date}
                      helperText={
                        Boolean(props.errors.date) &&
                        props.touched.date ?
                          i18n.t(`form.errors.${props.errors.date}`) :
                          " "
                      }
                      value={props.values.date}
                      onChange={props.handleChange}
                      inputProps={{
                        min: new Date().toISOString().slice(0, 10),
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="departureTime"
                      label={i18n.t("Time")}
                      type="time"
                      margin="normal"
                      fullWidth
                      onBlur={props.handleBlur}
                      error={Boolean(props.errors.departureTime) && props.touched.departureTime}
                      helperText={
                        Boolean(props.errors.departureTime) &&
                        props.touched.departureTime ?
                          i18n.t(`form.errors.${props.errors.departureTime}`) :
                          " "
                      }
                      value={props.values.departureTime}
                      onChange={props.handleChange}
                      inputProps={{
                        min: new Date().toISOString().slice(0, 16),
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="duration"
                      label={i18n.t("Travel time")}
                      type="Time"
                      margin="normal"
                      fullWidth
                      value={props.values.duration}
                      onBlur={props.handleBlur}
                      error={Boolean(props.errors.duration) && props.touched.duration}
                      helperText={
                        Boolean(props.errors.duration) &&
                        props.touched.duration ?
                          i18n.t(`form.errors.${props.errors.duration}`) :
                          " "
                      }
                      onChange={props.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              )}
              {/* Phone number block */}
              <Grid
                container
                justifyContent="space-between"
                alignItems="flex-end"
              >
                {/* Phone */}
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label={i18n.t("Phone number")}
                    placeholder={"+1234567890"}
                    margin="normal"
                    value={props.values.phoneNumber}
                    onBlur={props.handleBlur}
                    error={Boolean(props.errors.phoneNumber) && props.touched.phoneNumber}
                    helperText={
                      Boolean(props.errors.phoneNumber) &&
                      props.touched.phoneNumber ?
                        i18n.t(`form.errors.${props.errors.phoneNumber}`) :
                        " "
                    }
                    onChange={props.handleChange}
                  />
                </Grid>
                {/* Messenger */}
                <Grid item xs={4}>
                  {/* Checkboxes */}
                  {/* <FormGroup aria-label="position" row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedB}
                          // onChange={}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      labelPlacement="top"
                      label="Telegram"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedB}
                          // onChange={}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      labelPlacement="top"
                      label="WhatsApp"
                    />
                  </FormGroup> */}
                  {/* Select */}
                  {/* <InputLabel id="messengers">{i18n.t("Messenger")}</InputLabel>
                  <Select
                    className="select"
                    id="messengers"
                    labelId="messenger"
                    name={"messengers"}
                    margin="normal"
                    disableUnderline
                    onChange={({ target: { value } }) => {
                      setMessenger(value);
                    }}
                  >
                    <MenuItem value="Telegram">
                      <img src={telegramIcon} alt="Telegram" />
                    </MenuItem>
                    <MenuItem value="WhatsApp">
                      <img src={whatsAppIcon} alt="WhatsApp" />
                    </MenuItem>
                    <MenuItem value="Viber">
                      <img src={viberIcon} alt="Viber" />
                    </MenuItem>
                  </Select> */}
                  {/*  */}
                </Grid>
              </Grid>
              {/*<Grid container >*/}
              <Grid
                item
                xs={12}
                container

                alignItems="flex-end"
                style={{display: "flex", alignItems: "center"}}
              >
                <Grid item xs={8}>
                  <TextField
                    value={props.values.price}
                    margin="normal"
                    id="price"
                    label={i18n.t("Price")}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={Boolean(props.errors.price) && props.touched.price}
                    helperText={
                      Boolean(props.errors.price) &&
                      props.touched.price ?
                        i18n.t(`form.errors.${props.errors.price}`) :
                        " "
                    }
                    inputProps={{
                      min: 0,
                      type: "price",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    id="currency"
                    name={"currency"}
                    value={rideCurrency}
                    renderValue={value => `${value.toUpperCase()}`}
                    margin="normal"
                    disableUnderline
                    onChange={props.handleChange}
                    label="currency"
                    style={{paddingTop: "8px"}}
                  >
                    {currencies.map(item => {
                      return (
                        <MenuItem
                          key={item.code}
                          value={item.code}
                          onClick={() => setRideCurrency(item.code)}
                        >
                          {item.code + `  ` + item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>
              {/*</Grid>*/}
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
                value={props.values.additionalInfo}
                margin="normal"
                id="additionalInfo"
                name="additionalInfo"
                fullWidth
                multiline
                rows={2}
                error={
                  props.errors.additionalInfo && props.touched.additionalInfo
                    ? true
                    : false
                }
                label={i18n.t("Additional information")}
                onChange={props.handleChange}
                helperText={
                  props.errors.additionalInfo &&
                  props.touched.additionalInfo ?
                    i18n.t(`form.errors.${props.errors.additionalInfo}`) :
                    " "
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

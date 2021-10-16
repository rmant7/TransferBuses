import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./CarrierPage.css";
import { uploadTransfer } from "../../services/data-service";
import { useHistory } from "react-router-dom";
import {
    Checkbox,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Tooltip,
} from "@material-ui/core";
import cities_json from "../../utils/cities.json";
import i18n from "../../i18n";
import { useSelector } from "react-redux";
import { currencies } from "../../utils/currencies";
import axios from "axios";
import "yup-phone-lite";
import { useStyles } from "../../utils/useStyles";
import { timeZones } from "../../utils/timezones";
import { getLoading } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { saveNewTransferAction } from "../../redux/actions/transfers-actions";

const schema = yup.object().shape({
    from: yup.string().required("from.Required"),
    to: yup.string().required("to.Required"),
    date: yup.date().required("date.Required"), //!!! date, departureTime, and duration are conditionally reassigned later;
    departureTime: yup.string().required("departureTime.Required"),
    // duration: yup.string().required("duration.Required"),
    places: yup
        .number()
        .min(1, "Available places must be more or equal to 1")
        .max(8, "Available places must be less or equal to 8")
        .required("places.Required"),
    phoneNumber: yup.string().required("phoneNumber.Required").phone(undefined, "phoneNumber.isNotValid"),
    price: yup.string().required("price.Required"),
});

export default function CarrierPage() {
    const dispatch = useDispatch();
    const cur = useSelector((state) => state.app.currency);
    const lang = useSelector((state) => state.app.lang);
    const loading = useSelector(getLoading).isLoadingNewTransfer;
    const classes = useStyles();
    const [rideCurrency, setRideCurrency] = useState(cur);
    // const [messenger, setMessenger] = useState();
    // const [nearestCity, setNearestCity] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [userTimeZone, setUserTimeZone] = useState(() => {
        const timeZone = timeZones.find((tz) => tz.shift === "" + new Date().getTimezoneOffset() / -60);
        return timeZone || timeZones[0];
    });

    // console.log("cur: ", cur);
    // console.log("rideCurrency: ", rideCurrency);
    // console.log("Current latitude", latitude);
    // console.log("Current longitude", longitude);
    // console.log(lang);
    //
    // console.log("user time zone", userTimeZone);

    const cities =
        lang === "ru"
            ? [
                  ...cities_json
                      .reduce((acc, val) => {
                          acc.push({ id: val.ID, title: val["name_ru"] });
                          return acc;
                      }, [])
                      .sort((a, b) => (a.title < b.title ? -1 : 1)),
                  ...cities_json
                      .reduce((acc, val) => {
                          acc.push({ id: val.ID, title: val.name });
                          return acc;
                      }, [])
                      .sort((a, b) => (a.title < b.title ? -1 : 1)),
              ]
            : cities_json
                  .reduce((acc, val) => {
                      acc.push({ id: val.ID, title: val.name });
                      acc.push({ id: val.ID, title: val["name_ru"] });
                      return acc;
                  }, [])
                  .sort((a, b) => (a.title < b.title ? -1 : 1));

    // const durations = [" ", "0:30",]
    // for(let i=1; i<=12;i++){
    //   durations.push(i+":00")
    //   durations.push(i+":30")
    // }

    const durations = [" "];
    const maxDurationHour = 48;
    for (let i = 1; i < maxDurationHour; i++) {
        durations.push(i + ":00");
        // durations.push(i+":30")
    }
    // durations.pop()
    durations.push(maxDurationHour + ":00 +");

    const [state, setState] = useState({});
    const history = useHistory();
    const defaultProps = {
        options: cities,
        getOptionLabel: (option) => {
            // console.log(option.title);
            return option.title;
        },
    };

    const getCity = (lat, long) => {
        const URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&accept-language=en`;
        axios.get(URL).then((response) => console.log(response.data));
    };

    // !! Compute Distance Between current city and nearest City in AutoComplete "From".
    const getDefaultCity = () => {
        cities_json.forEach((element) => {
            // debugger;
            let absLat = Math.round(latitude);
            let elementAbsLat = Math.round(element.latitude);
            let absLng = Math.round(longitude);
            let elementAbsLng = Math.round(element.longitude);
            if (absLat === elementAbsLat && absLng === elementAbsLng) {
                console.log("est");
            } else {
                const getDistance = (cityLat, cityLng) => {
                    const R = 6371e3;
                    const φ1 = (latitude * Math.PI) / 180; // φ, λ in radians
                    const φ2 = (cityLat * Math.PI) / 180;
                    const Δφ = ((cityLat - latitude) * Math.PI) / 180;
                    const Δλ = ((cityLng - longitude) * Math.PI) / 180;
                    const a =
                        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const d = R * c; // in metres
                    return d;
                };
                const getNearestCity = (arr) => {
                    let lowest = {};
                    let temp;
                    arr.forEach((element) => {
                        if (Object.keys(lowest).length === 0 && lowest.constructor === Object) {
                            lowest = {
                                id: element.id,
                                Name: element.Name,
                                distanceBetween: element.distanceBetween,
                            };
                        } else {
                            temp = element.distanceBetween;
                            if (temp < lowest)
                                lowest = {
                                    id: element.id,
                                    Name: element.Name,
                                    distanceBetween: element.distanceBetween,
                                };
                        }
                    });
                    return lowest;
                };
                let intervals = cities_json.map((element) => {
                    return {
                        id: element.ID,
                        Name: element.name,
                        distanceBetween: getDistance(element.latitude, element.longitude),
                    };
                });
                //console.log(intervals);
            }
            // console.log(intervals);
        });
        // console.log("Nearest City", getNearestCity(intervals));
    };

    useEffect(() => {
        let startPos;
        const geoSuccess = function (position) {
            startPos = position;
            setLatitude(startPos.coords.latitude);
            setLongitude(startPos.coords.longitude);
            getCity(startPos.coords.latitude, startPos.coords.longitude);
        };
        // geolocation determination is temporary commented out. To turn it on, uncomment the line bellow
        // navigator.geolocation.getCurrentPosition(geoSuccess);
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getDefaultCity();
        }
    });

    return (
        <Container maxWidth="xl" className={classes.drivePage}>
            <Formik
                initialValues={{
                    date: new Date().toJSON().slice(0, 10),
                    departureTime: "",
                    timeZone: userTimeZone.shift,
                    phoneNumber: "",
                    places: 1,
                    price: "",
                    currency: rideCurrency,
                    duration: "",
                    passAParcel: false,
                    isTakePet: false,
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
                onSubmit={(values) => {
                    console.log("SUBMITTING");
                    const departureTimeGMT = values.departureTime.split(":");
                    console.log('values; ', values)
                    departureTimeGMT[0] -= values.timeZone;
                    values.departureTime = departureTimeGMT.join(":");
                    console.log(values);
                    // dispatch(saveNewTransferAction(values));
                    // history.push("/");
                    uploadTransfer(values)
                        .then((response) => {
                            console.log(response);
                            // history.push("/");
                        })
                        .catch((error) => {
                            console.log(error);
                            setState({ error: error });
                        });
                }}
                validationSchema={schema}
            >
                {(props) => {
                    // console.log("Formik props: ", props);

                    if (props.values.regularTrips) {
                        schema.fields.date = null;
                        schema.fields.duration = null;
                        schema.fields.departureTime = null;
                    } else {
                        schema.fields.date = yup.date().required("date.Required");
                        schema.fields.departureTime = yup.string().required("departureTime.Required");
                        // schema.fields.duration = yup.string().required("duration.Required");
                    }

                    const handleSelectAllDaysChange = (event) => {
                        // console.log(event.target);
                        // console.log(event.target.checked);
                        const weekDays = {};
                        Object.keys(props.values.regularTripsDays).map((weekDay) => {
                            weekDays[weekDay] = {
                                selected: event.target.checked,
                                departureTime: props.values.regularTripsDays[weekDay].departureTime,
                            };
                        });

                        // console.log("weekdays: ", weekDays);
                        props.setFieldValue("regularTripsDays", weekDays);
                    };

                    return (
                        <form onSubmit={props.handleSubmit}>
                            <Autocomplete
                                {...defaultProps}
                                id="from"
                                name={"from"}
                                value={props.values.from}
                                margin="dense"
                                onChange={(e, v) => {
                                    props.setFieldValue("from", v?.id || "");
                                }}
                                onBlur={props.handleBlur}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={i18n.t("From")}
                                        margin="normal"
                                        error={Boolean(props.errors.from) && props.touched.from}
                                        helperText={
                                            Boolean(props.errors.from) && props.touched.from
                                                ? i18n.t(`form.errors.${props.errors.from}`)
                                                : " "
                                        }
                                    />
                                )}
                                ListboxProps={{ style: { maxHeight: "7rem" } }}
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
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={i18n.t("To")}
                                        margin="dense"
                                        error={Boolean(props.errors.to) && props.touched.to}
                                        helperText={
                                            Boolean(props.errors.to) && props.touched.to
                                                ? i18n.t(`form.errors.${props.errors.to}`)
                                                : " "
                                        }
                                    />
                                )}
                                ListboxProps={{ style: { maxHeight: "7rem" } }}
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
                                    <Grid
                                        container
                                        direction="column"
                                        // alignItems="center"
                                        // justify="center"
                                        // style={{minHeight: "100vh"}}
                                    >
                                        <Grid container direction={"row"}>
                                            <Grid item xs={9}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                Object.values(
                                                                    props.values.regularTripsDays
                                                                ).reduce(
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
                                            </Grid>
                                            <Grid item xs={3}>
                                                {i18n.t("Time")}
                                            </Grid>
                                        </Grid>

                                        {Object.keys(props.values.regularTripsDays).map((weekDay) => {
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
                                                            style={{ marginLeft: "10px" }}
                                                            control={
                                                                <Checkbox
                                                                    id={
                                                                        "regularTripsDays." +
                                                                        weekDay +
                                                                        ".selected"
                                                                    }
                                                                    checked={
                                                                        props.values.regularTripsDays[weekDay]
                                                                            .selected
                                                                    }
                                                                    onChange={props.handleChange}
                                                                    name={
                                                                        "regularTripsDays." +
                                                                        weekDay +
                                                                        ".selected"
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
                                <>
                                    <Grid container justifyContent="space-between">
                                        <Grid item xs={6}>
                                            <TextField
                                                id="date"
                                                label={i18n.t("Date")}
                                                type="date"
                                                margin="normal"
                                                fullWidth
                                                onBlur={props.handleBlur}
                                                error={Boolean(props.errors.date) && props.touched.date}
                                                // size={"small"}
                                                helperText={
                                                    Boolean(props.errors.date) && props.touched.date
                                                        ? i18n.t(`form.errors.${props.errors.date}`)
                                                        : " "
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
                                    </Grid>
                                    {/**** DEPARTURE TIME ****/}
                                    <Grid container justifyContent="space-between">
                                        <Grid item xs={5}>
                                            <TextField
                                                id="departureTime"
                                                label={i18n.t("Time")}
                                                type="time"
                                                margin="normal"
                                                fullWidth
                                                onBlur={props.handleBlur}
                                                error={
                                                    Boolean(props.errors.departureTime) &&
                                                    props.touched.departureTime
                                                }
                                                helperText={
                                                    Boolean(props.errors.departureTime) &&
                                                    props.touched.departureTime
                                                        ? i18n.t(`form.errors.${props.errors.departureTime}`)
                                                        : " "
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
                                        {/*^^^ DEPARTURE TIME ^^^*/}

                                        {/*VVV DEPARTURE TIMEZONE   temporary commented out VVV*/}
                                        <Grid item xs={6}>
                                            <FormControl
                                                fullWidth
                                                style={{ paddingTop: "0px", marginTop: "9px" }}
                                            >
                                                <InputLabel
                                                    shrink
                                                    id="timeZone-label"
                                                    style={{ marginTop: "8px" }}
                                                >
                                                    {i18n.t("Timezone")}
                                                </InputLabel>
                                                <Select
                                                    labelId="timeZone-label"
                                                    id="timeZone"
                                                    label="timeZone"
                                                    margin="normal"
                                                    name={"timeZone"}
                                                    value={userTimeZone.shift}
                                                    onChange={props.handleChange}
                                                    style={{ textTransform: "none" }}
                                                    helperText={" 123"}
                                                >
                                                    {timeZones.map((item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item.shift}
                                                                value={item.shift}
                                                                onClick={() => {
                                                                    setUserTimeZone(item);
                                                                }}
                                                            >
                                                                {/*{item.name}*/}
                                                                {"GMT+" +
                                                                    item.shift +
                                                                    " " +
                                                                    i18n.t("timezone." + item.shift)}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        {/*^^^ DEPARTURE TIMEZONE ^^^*/}
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <Grid item xs={5}>
                                            <FormControl fullWidth>
                                                <InputLabel shrink id="duration-label">
                                                    {i18n.t("Travel time")}
                                                </InputLabel>
                                                <Select
                                                    labelId="duration-label"
                                                    id="duration"
                                                    name={"duration"}
                                                    value={props.values.duration}
                                                    renderValue={(value) => `${value}`}
                                                    margin="dense"
                                                    // disableUnderline
                                                    onChange={props.handleChange}
                                                    label="duration"
                                                    //style={{paddingTop: "9px"}}
                                                >
                                                    {durations.map((item) => {
                                                        return (
                                                            <MenuItem
                                                                key={item}
                                                                value={item}
                                                                // onClick={() => setRideCurrency(item.code)}
                                                            >
                                                                {item}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                            {/* Phone number block */}
                            <Grid container justifyContent="space-between" alignItems="flex-end">
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
                                            Boolean(props.errors.phoneNumber) && props.touched.phoneNumber
                                                ? i18n.t(`form.errors.${props.errors.phoneNumber}`)
                                                : " "
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
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <Grid item xs={8}>
                                    <TextField
                                        value={props.values.price}
                                        margin="dense"
                                        id="price"
                                        label={i18n.t("Price")}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        error={Boolean(props.errors.price) && props.touched.price}
                                        helperText={
                                            Boolean(props.errors.price) && props.touched.price
                                                ? i18n.t(`form.errors.${props.errors.price}`)
                                                : " "
                                        }
                                        inputProps={{
                                            min: 0,
                                            type: "price",
                                            "aria-labelledby": "input-slider",
                                        }}
                                    />
                                </Grid>

                                {/*CURRENCY v*/}
                                <Grid item xs={4}>
                                    <Select
                                        id="currency"
                                        name={"currency"}
                                        value={rideCurrency}
                                        renderValue={(value) => `${value.toUpperCase()}`}
                                        margin="dense"
                                        disableUnderline
                                        onChange={props.handleChange}
                                        label="currency"
                                        style={{ paddingTop: "8px" }}
                                    >
                                        {currencies.map((item) => {
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
                                {/*CURRENCY ^*/}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="isTakePet"
                                        checked={props.values.isTakePet}
                                        onChange={props.handleChange}
                                        color="primary"
                                        value={props.values.isTakePet}
                                    />
                                }
                                label={i18n.t("Take Pet")}
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
                                    props.errors.additionalInfo && props.touched.additionalInfo ? true : false
                                }
                                label={i18n.t("Additional information")}
                                onChange={props.handleChange}
                                helperText={
                                    props.errors.additionalInfo && props.touched.additionalInfo
                                        ? i18n.t(`form.errors.${props.errors.additionalInfo}`)
                                        : " "
                                }
                            />
                            <div className={"submitBtn"}>
                                <Button
                                    disabled={loading}
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    onClick={() => props.resetForm()}
                                >
                                    {i18n.t("Publish a ride")}
                                </Button>
                                {loading ? <CircularProgress /> : null}
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </Container>
    );
}

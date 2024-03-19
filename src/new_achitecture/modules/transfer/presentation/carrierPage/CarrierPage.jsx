import * as yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './CarrierPage.module.css';
import {Link, useHistory} from 'react-router-dom';
import {
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from '@material-ui/core';
import i18n from '../../../trip_search/domain/entites/utils/language/i18n';
import { currencies } from '../currenciesSelector/currencies';
import 'yup-phone-lite';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import { useStyles } from '../../../../general/MUI/useStyles';
import useCarrier from '../hooks/useCarrier';
import css from './CarrierPage.module.css';

const schema = yup.object().shape({
  from: yup.string().required('from.Required'),
  to: yup.string().required('to.Required'),
  date: yup.date().required('date.Required'), //!!! date, departureTime, and duration are conditionally reassigned later;
  departureTime: yup.string().required('departureTime.Required'),
  // duration: yup.string().required("duration.Required"),
  places: yup
    .number()
    .min(1, 'Available places must be more or equal to 1')
    .max(8, 'Available places must be less or equal to 8')
    .required('places.Required'),
  phoneNumber: yup
    .string()
    .required('phoneNumber.Required')
    .phone(undefined, 'phoneNumber.isNotValid'),
  price: yup.number().positive('price.OnlyPositive'),
});

export default function CarrierPage() {
  const {
    loading,
    rideCurrency,
    setRideCurrency,
    cities,
    message,
    open,
    setOpen,
    latitude,
    longitude,
    submitForm,
    getDefaultCity,
    userTimeZone,
    durations
  } = useCarrier();

  const classes = useStyles();

  // console.log("cur: ", cur);
  // console.log("rideCurrency: ", rideCurrency);
  // console.log("Current latitude", latitude);
  // console.log("Current longitude", longitude);
  // console.log(lang);
  //
  // console.log("user time zone", userTimeZone);

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const defaultProps = {
    options: cities,
    getOptionLabel: (option) => {
      // console.log(option.title);
      return option.title;
    },
  };

  const handleSubmitForm = (values) => {
    submitForm(values);
  };

  return (
    // <Container maxWidth="sm" className={classes.drivePage}>
    <Container maxWidth='sm' style={{ paddingTop: '100px' }}>
      <div style={{marginTop: '60px'}}>
        <Link to={'/viewRoutes'} className={css.btn}>I'm a passenger</Link>
        <Link to={'/addTransfer'} className={css.btn}>I'm a carrier</Link>
      </div>
      <Formik
        initialValues={{
          date: new Date().toJSON().slice(0, 10),
          departureTime: '',
          timeZone: userTimeZone.shift,
          phoneNumber: '',
          places: 1,
          price: '',
          currency: rideCurrency,
          duration: '',
          passAParcel: false,
          isPetsAllowed: false,
          additionalInfo: '',
          regularTrips: false,
          regularTripsDays: {
            _0monday: {
              selected: false,
              departureTime: '',
            },
            _1tuesday: {
              selected: false,
              departureTime: '',
            },
            _2wednesday: {
              selected: false,
              departureTime: '',
            },
            _3thursday: {
              selected: false,
              departureTime: '',
            },
            _4friday: {
              selected: false,
              departureTime: '',
            },
            _5saturday: {
              selected: false,
              departureTime: '',
            },
            _6sunday: {
              selected: false,
              departureTime: '',
            },
          },
        }}
        onSubmit={(values) => {
          handleSubmitForm(values);
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
            schema.fields.date = yup.date().required('date.Required');
            schema.fields.departureTime = yup
              .string()
              .required('departureTime.Required');
            // schema.fields.duration = yup.string().required("duration.Required");
          }

          const handleSelectAllDaysChange = (event) => {
            // console.log(event.target);
            // console.log(event.target.checked);
            const weekDays = {};
            Object.keys(props.values.regularTripsDays).map((weekDay) => {
              return (weekDays[weekDay] = {
                selected: event.target.checked,
                departureTime:
                  props.values.regularTripsDays[weekDay].departureTime,
              });
            });

            // console.log("weekdays: ", weekDays);
            props.setFieldValue('regularTripsDays', weekDays);
          };

          return (
            <form onSubmit={props.handleSubmit} className={styles.form_style}>
              <Autocomplete
                className={styles.height95px}
                {...defaultProps}
                id='from'
                name={'from'}
                value={props.values.from}
                margin='dense'
                onChange={(e, v) => {
                  props.setFieldValue('from', v?.id || '');
                }}
                onBlur={props.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={i18n.t('From')}
                    margin='normal'
                    error={Boolean(props.errors.from) && props.touched.from}
                    helperText={
                      Boolean(props.errors.from) &&
                      props.touched.from &&
                      i18n.t(`form.errors.${props.errors.from}`)
                    }
                  />
                )}
                ListboxProps={{ style: { maxHeight: '7rem' } }}
              />
              <Autocomplete
                className={styles.height95px}
                {...defaultProps}
                id='to'
                name={'to'}
                value={props.values.to}
                onBlur={props.handleBlur}
                onChange={(e, v) => {
                  props.setFieldValue('to', v?.id || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={i18n.t('To')}
                    margin='dense'
                    error={Boolean(props.errors.to) && props.touched.to}
                    helperText={
                      Boolean(props.errors.to) &&
                      props.touched.to &&
                      i18n.t(`form.errors.${props.errors.to}`)
                    }
                  />
                )}
                // ListboxProps={{ style: { maxHeight: "7rem" } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id={'regularTrips'}
                    checked={props.values.regularTrips}
                    onChange={props.handleChange}
                    color='primary'
                  />
                }
                label={i18n.t('Regular trips')}
              />
              {props.values.regularTrips && (
                <Paper variant='outlined' style={{ padding: '8px' }}>
                  <Grid
                    container
                    direction='column'
                    // alignItems="center"
                    // justify="center"
                    // style={{minHeight: "100vh"}}
                  >
                    <Grid container direction={'row'}>
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
                              name='selectAll'
                              margin={''}
                            />
                          }
                          label={i18n.t('Select all')}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {i18n.t('Time')}
                      </Grid>
                    </Grid>

                    {Object.keys(props.values.regularTripsDays).map(
                      (weekDay) => {
                        return (
                          <Grid
                            container
                            direction={'row'}
                            alignItems='flex-end'
                            id={'regularTripsDays.' + weekDay}
                            key={'regularTripsDays.' + weekDay}
                          >
                            <Grid item xs={9}>
                              <FormControlLabel
                                style={{ marginLeft: '10px' }}
                                control={
                                  <Checkbox
                                    id={
                                      'regularTripsDays.' +
                                      weekDay +
                                      '.selected'
                                    }
                                    checked={
                                      props.values.regularTripsDays[weekDay]
                                        .selected
                                    }
                                    onChange={props.handleChange}
                                    name={
                                      'regularTripsDays.' +
                                      weekDay +
                                      '.selected'
                                    }
                                  />
                                }
                                label={i18n.t(weekDay)}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Tooltip title={i18n.t('Time')} placement='top'>
                                <TextField
                                  id={
                                    'regularTripsDays.' +
                                    weekDay +
                                    '.departureTime'
                                  }
                                  name={
                                    'regularTripsDays.' +
                                    weekDay +
                                    '.departureTime'
                                  }
                                  type='time'
                                  margin='normal'
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
                      }
                    )}
                  </Grid>
                </Paper>
              )}
              {!props.values.regularTrips && (
                <>
                  <Grid container justifyContent='space-between'>
                    <Grid item xs={6}>
                      <TextField
                        id='date'
                        label={i18n.t('Date')}
                        type='date'
                        margin='normal'
                        fullWidth
                        onBlur={props.handleBlur}
                        error={Boolean(props.errors.date) && props.touched.date}
                        // size={"small"}
                        helperText={
                          Boolean(props.errors.date) &&
                          props.touched.date &&
                          i18n.t(`form.errors.${props.errors.date}`)
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
                  <Grid container justifyContent='space-between'>
                    <Grid item xs={5}>
                      <TextField
                        id='departureTime'
                        label={i18n.t('Time')}
                        type='time'
                        margin='normal'
                        fullWidth
                        onBlur={props.handleBlur}
                        error={
                          Boolean(props.errors.departureTime) &&
                          props.touched.departureTime
                        }
                        helperText={
                          Boolean(props.errors.departureTime) &&
                          props.touched.departureTime &&
                          i18n.t(`form.errors.${props.errors.departureTime}`)
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
                  </Grid>
                </>
              )}
              <Grid container justifyContent='space-between'>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel shrink id='duration-label'>
                      {i18n.t('Travel time')}
                    </InputLabel>
                    <Select
                      labelId='duration-label'
                      id='duration'
                      name={'duration'}
                      value={props.values.duration}
                      renderValue={(value) => `${value}`}
                      margin='dense'
                      // disableUnderline
                      onChange={props.handleChange}
                      label='duration'
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
              {/* Phone number block */}
              <Grid
                container
                justifyContent='space-between'
                alignItems='flex-end'
              >
                {/* Phone */}
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    id='phoneNumber'
                    name='phoneNumber'
                    label={i18n.t('Phone number')}
                    placeholder={'+1234567890'}
                    margin='normal'
                    value={props.values.phoneNumber}
                    onBlur={props.handleBlur}
                    error={
                      Boolean(props.errors.phoneNumber) &&
                      props.touched.phoneNumber
                    }
                    helperText={
                      Boolean(props.errors.phoneNumber) &&
                      props.touched.phoneNumber &&
                      i18n.t(`form.errors.${props.errors.phoneNumber}`)
                    }
                    onChange={props.handleChange}
                  />
                </Grid>
              </Grid>
              {/*<Grid container >*/}
              <Grid
                item
                xs={12}
                container
                alignItems='flex-end'
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Grid item xs={8}>
                  <TextField
                    type='number'
                    value={props.values.price}
                    margin='dense'
                    id='price'
                    label={i18n.t('Price')}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={Boolean(props.errors.price) && props.touched.price}
                    helperText={
                      Boolean(props.errors.price) &&
                      props.touched.price &&
                      i18n.t(`form.errors.${props.errors.price}`)
                    }
                    // inputProps={{
                    //   min: 0,
                    //   type: "price",
                    //   "aria-labelledby": "input-slider",
                    // }}
                  />
                </Grid>

                {/*CURRENCY v*/}
                <Grid item xs={4}>
                  <Select
                    id='currency'
                    name={'currency'}
                    value={rideCurrency}
                    renderValue={(value) => `${value.toUpperCase()}`}
                    margin='dense'
                    disableUnderline
                    onChange={props.handleChange}
                    label='currency'
                    style={{ paddingTop: '8px' }}
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
                    id={'passAParcel'}
                    checked={props.values.passAParcel}
                    onChange={props.handleChange}
                    color='primary'
                    value={props.values.parcel}
                  />
                }
                label={i18n.t('Pass a parcel')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id='isPetsAllowed'
                    checked={props.values.isPetsAllowed}
                    onChange={props.handleChange}
                    color='primary'
                    value={props.values.isPetsAllowed}
                  />
                }
                label={i18n.t('PetsAllowed')}
              />
              <TextField
                value={props.values.additionalInfo}
                margin='normal'
                id='additionalInfo'
                name='additionalInfo'
                fullWidth
                multiline
                rows={2}
                error={
                  Boolean(props.errors.additionalInfo) &&
                  props.touched.additionalInfo
                }
                label={i18n.t('Additional information')}
                onChange={props.handleChange}
                helperText={
                  Boolean(props.errors.additionalInfo) &&
                  props.touched.additionalInfo &&
                  i18n.t(`form.errors.${props.errors.additionalInfo}`)
                }
              />
              <div style={{ margin: '10px' }} className={'submitBtn'}>
                <LoadingButton
                  loading={loading}
                  color='primary'
                  variant='contained'
                  fullWidth
                  type='submit'
                >
                  {i18n.t('Publish a ride')}
                </LoadingButton>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='responsive-dialog-title'
                >
                  <DialogContent>
                    <Alert severity={message.type}>{message.msg}</Alert>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* {loading ? <CircularProgress /> : null} */}
              </div>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
}

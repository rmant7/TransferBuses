import * as yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import styles from './CarrierPage.module.css';
import {
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Paper,
} from '@material-ui/core';
import i18n from '../../../trip_search/domain/entites/utils/language/i18n';
import 'yup-phone-lite';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import useCarrier from '../hooks/useCarrier';
import { schema } from './validationSchema';
import React from "react";
import RouteInput from "./subComponents/RouteInput";
import DepartureTimeField from "./subComponents/DepartureTimeField";
import DateField from "./subComponents/DateField";
import TravelTimeField from "./subComponents/TravelTimeField";
import PhoneField from "./subComponents/PhoneField";
import PriceField from "./subComponents/PriceField";
import CurrencyField from "./subComponents/CurrencyField";
import RegularTripsDaySelection from "./subComponents/RegularTripsDaySelection";
import RegularTripDayCheckbox from "./subComponents/RegularTripDayCheckbox";
import RegularTripDayTimeInput from "./subComponents/RegularTripDayTimeInput";
import AdditionalInfoField from "./subComponents/AdditionalInfoField";

export default function CarrierPage() {
  const {
    loading,
    rideCurrency,
    setRideCurrency,
    cities,
    message,
    open,
    setOpen,
    submitForm,
    userTimeZone,
    durations
  } = useCarrier();

  const handleClose = () => {
    setOpen(false);
  };

  const defaultProps = {
    options: cities,
    getOptionLabel: (option) => {
      return option.title;
    },
  };

  const handleSubmitForm = (values) => {
    submitForm(values);
  };

  return (
    <Container maxWidth='sm' style={{ marginTop: '75px' }}>
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
          if (props.values.regularTrips) {
            schema.fields.date = null;
            schema.fields.duration = null;
            schema.fields.departureTime = null;
          } else {
            schema.fields.date = yup.date().required('date.Required');
            schema.fields.departureTime = yup
              .string()
              .required('departureTime.Required');
          }

          const handleSelectAllDaysChange = (event) => {
            const weekDays = {};
            Object.keys(props.values.regularTripsDays).map((weekDay) => {
              return (weekDays[weekDay] = {
                selected: event.target.checked,
                departureTime:
                  props.values.regularTripsDays[weekDay].departureTime,
              });
            });
            props.setFieldValue('regularTripsDays', weekDays);
          };

          return (
            <form onSubmit={props.handleSubmit} className={styles.form_style}>
              <RouteInput
              defaultProps={defaultProps}
              valueFrom={props.values.from}
              valueTo={props.values.to}
              handleBlur={props.handleBlur}
              errorsFrom={props.errors.from}
              errorsTo={props.errors.to}
              touchedFrom={props.touched.from}
              touchedTo={props.touched.to}
              />

              {/**** REGULAR TRIPS CHECKBOX ****/}
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

              {/**** 'Regular trips' checkbox is on ****/}
              {props.values.regularTrips && (
                <Paper variant='outlined' style={{ padding: '8px' }}>
                  <Grid
                    container
                    direction='column'
                  >
                    <RegularTripsDaySelection
                        valueRegularTripsDay={props.values.regularTripsDays}
                        handleSelectAllDaysChange={handleSelectAllDaysChange}
                    />

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
                            <RegularTripDayCheckbox
                                weekDay={weekDay}
                                handleChange={props.handleChange}
                                valueRegularTripsDays={props.values.regularTripsDays}

                            />
                            <RegularTripDayTimeInput
                                weekDay={weekDay}
                                handleChange={props.handleChange}
                                valueRegularTripsDays={props.values.regularTripsDays}
                            />

                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </Paper>
              )}
              {/**** 'Regular trips' checkbox is off ****/}
              {!props.values.regularTrips && (
                <>
                  {/**** DATE ****/}
                  <DateField
                      handleBlur={props.handleBlur}
                      errorDate={props.errors.date}
                      touchedDate={props.touched.date}
                      valuesDate={props.values.date}
                      handleChange={props.handleChange}

                  />
                  {/**** DEPARTURE TIME ****/}
                  <DepartureTimeField
                      handleBlur={props.handleBlur}
                      errorDepartureTime={props.errors.departureTime}
                      touchedDepartureTime={props.touched.departureTime}
                      valueDepartureTime={props.values.departureTime}
                      handleChange={props.handleChange}
                  />
                </>
              )}
              {/**** TRAVEL TIME ****/}
              <TravelTimeField
                  valueDuration={props.values.duration}
                  handleChange={props.handleChange}
                  durations={durations}
              />
              {/**** PHONE NUMBER ****/}
              <PhoneField
                  valuePhoneNumber={props.values.phoneNumber}
                  errorPhoneNumber={props.errors.phoneNumber}
                  touchedPhoneNumber={props.touched.phoneNumber}
                  handleBlur={props.handleBlur}
                  handleChange={props.handleChange}
              />
              <Grid
                item
                xs={12}
                container
                alignItems='flex-end'
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {/**** PRICE ****/}
                <PriceField
                    valuePrice={props.values.price}
                    errorPrice={props.errors.price}
                    touchedPrice={props.touched.price}
                    handleBlur={props.handleBlur}
                    handleChange={props.handleChange}
                />

                {/**** CURRENCY ****/}
                <CurrencyField
                    handleChange={props.handleChange}
                    rideCurrency={rideCurrency}
                    setRideCurrency={setRideCurrency}
                />
              </Grid>

              {/**** PASS A PARCEL CHECKBOX ****/}
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

              {/**** PETS ALLOWED CHECKBOX ****/}
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

              {/**** ADDITIONAL INFO FIELD ****/}
              <AdditionalInfoField
                  valueAdditionalInfo={props.values.additionalInfo}
                  errorAdditionalInfo={props.errors.additionalInfo}
                  touchedAdditionalInfo={props.touched.additionalInfo}
                  handleChange={props.handleChange}
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
              </div>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
}
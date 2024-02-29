import React from 'react';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import RingVolumeIcon from '@material-ui/icons/RingVolume';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Transfer.css';
import i18n from '../../../trip_search/domain/entites/utils/language/i18n';
import { Tooltip } from '@material-ui/core';
import useTransfer from '../hooks/useTransfer';

export default function Transfer({ transfer }) {
  const {
    priceToDisplay,
    history,
    cityFrom,
    cityTo,
    departureTimeSplit,
    lang,
  } = useTransfer(transfer);
  return (
    <div className='transfer'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Grid container spacing={2}>
            <Grid
              container
              item
              xs={12}
              alignItems='center'
              justifyContent='flex-start'
            >
              <Paper className={'paper'}>
                {cityFrom &&
                  (cityFrom['name' + (lang === 'ru' ? '_ru' : '')] || '---')}
                <ArrowForwardSharpIcon style={{ marginBottom: '-6px' }} />
                {cityTo &&
                  (cityTo['name' + (lang === 'ru' ? '_ru' : '')] || '---')}
              </Paper>
            </Grid>
            <Grid
              container
              item
              xs={12}
              alignItems='stretch'
              justifyContent='flex-start'
            >
              <Tooltip
                title={
                  "Price in carrier's currency: " +
                  transfer.price +
                  ' ' +
                  transfer.currency
                }
                placement='top'
                arrow
              >
                <Button color='primary' variant='contained' className={'paper'}>
                  {/* {i18n.t("Price")}: */}
                  {priceToDisplay}
                </Button>
              </Tooltip>
            </Grid>

            {transfer.regularTrips ? (
              i18n.t('Regular trips')
            ) : (
              <Grid container item direction={'column'} xs={12}>
                <Grid
                  container
                  item
                  // sm={5}
                  xs={7}
                  // alignItems="stretch"
                  justifyContent='flex-start'
                >
                  <Button>
                    {/* {i18n.t("Duration of ride")}:*/} {transfer.date}
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  // sm={4}
                  xs={4}
                  // alignItems="stretch"
                  justifyContent='flex-end'
                >
                  <Button>
                    {transfer.timeZone
                      ? +departureTimeSplit[0] +
                        +transfer.timeZone +
                        ':' +
                        departureTimeSplit[1]
                      : transfer.departureTime}{' '}
                    {/* {timeZoneName ? "(" + timeZoneName + ")" : ""} */}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <hr />
          <Grid container spacing={2} justifyContent='space-around'>
            {!transfer.regularTrips && (
              <Grid
                container
                item
                xs={12}
                alignItems='center'
                justifyContent='flex-start'
              >
                <Paper className={'paper'}>
                  {i18n.t('Date of travel')}:{' '}
                  {/*{transferPage.date.replace("T", "  ")}*/}
                  {transfer.date.slice(0, 10)}
                </Paper>
              </Grid>
            )}

            {transfer.regularTrips && (
              <>
                <Grid
                  container
                  item
                  xs={12}
                  alignItems='center'
                  justifyContent='flex-start'
                >
                  <Paper className={'paper'}>
                    {/*<div style={{margin: "8px", minWidth: "190px", textAlign: "center"}}>*/}
                    {/*  {i18n.t("Regular trips")}*/}
                    {/*</div>*/}
                    <div
                      style={{
                        margin: '8px',
                        minWidth: '190px',
                        textAlign: 'center',
                      }}
                    >
                      {/*{i18n.t("Regular trips")}*/}
                    </div>
                    <Grid
                      container
                      direction={'column'}
                      xs={12}
                      style={{ margin: '4px' }}
                    >
                      {Object.keys(transfer.regularTripsDays)
                        .sort()
                        .map((weekDay) => {
                          // console.log("weekDay: ", weekDay, transferPage.regularTripsDays[weekDay]);
                          const departTime =
                            transfer.regularTripsDays[weekDay].departureTime;
                          return transfer.regularTripsDays[weekDay].selected ? (
                            <>
                              <Grid
                                container
                                item
                                justifyContent={'space-between'}
                              >
                                <Grid xs={7}>{i18n.t(weekDay)} </Grid>
                                <Grid xs={3}>
                                  {departTime ? departTime : '-- : --'}
                                </Grid>
                              </Grid>
                              {/*<weekDayIcon*/}
                              {/*  name={weekDay}*/}
                              {/*  value={transferPage.regularTripsDays[weekDay]}*/}
                              {/*/>*/}
                            </>
                          ) : null;
                        })}
                    </Grid>
                  </Paper>
                </Grid>
              </>
            )}

            {transfer.duration && (
              <Grid
                container
                item
                xs={12}
                alignItems='center'
                justifyContent='flex-start'
              >
                <Paper className={'paper'}>
                  {i18n.t('Duration of ride')}:{' '}
                  {/*{transferPage.date.replace("T", "  ")}*/}
                  {transfer.duration}
                </Paper>
              </Grid>
            )}

            <Grid
              container
              item
              xs={12}
              alignItems='center'
              justifyContent='flex-start'
            >
              <Paper className={'paper'}>
                {i18n.t("Driver's phone number")}: {transfer.phoneNumber}{' '}
                <RingVolumeIcon fontSize='small' />
              </Paper>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justifyContent='flex-start'
              alignItems='center'
            >
              {/* <Paper className={"paper"}>
                {i18n.t("Places")}: {transferPage.places}
                <AirlineSeatReclineNormalIcon fontSize="small"/>
              </Paper> */}

              <Paper className={'paper'}>
                {i18n.t('A parcel delivery')}:{' '}
                {transfer.passAParcel ? i18n.t('Yes') : i18n.t('No')}
              </Paper>
            </Grid>

            <Grid
              container
              item
              xs={12}
              justifyContent='flex-start'
              alignItems='center'
            >
              <Paper className={'paper'}>
                {i18n.t('PetsAllowed')}:{' '}
                {transfer.isPetsAllowed ? i18n.t('Yes') : i18n.t('No')}
              </Paper>
            </Grid>

            {transfer.driversComment && (
              <Grid
                container
                item
                xs={12}
                justifyContent='flex-start'
                alignItems='center'
              >
                <Paper className={'paper'}>
                  <div>{i18n.t("Driver's comment")}:</div>
                  <div
                    style={{
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-all',
                    }}
                  >
                    {transfer.driversComment}{' '}
                  </div>
                </Paper>
              </Grid>
            )}

            {transfer.additionalInfo && (
              <Grid
                container
                item
                xs={12}
                justifyContent='flex-start'
                alignItems='center'
              >
                <Paper className={'paper'}>
                  <span style={{ paddingRight: '5px' }}>
                    {i18n.t('Additional information')}:
                  </span>
                  {transfer.additionalInfo}
                </Paper>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <Grid item xs={2}>
              <IconButton onClick={() =>
                history.push(
                  {
                    pathname: '/transferPage',
                    transferPage: transferPage,
                  }
                )
              }>
                <NearMeIcon fontSize="large"/>
              </IconButton>
            </Grid> */}
    </div>
  );
}

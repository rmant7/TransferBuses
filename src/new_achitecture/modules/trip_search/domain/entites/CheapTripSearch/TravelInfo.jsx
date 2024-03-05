import React from 'react';
import locations from '../../../data/jsons/cheapTripData/locations.json';
import { Box, Button, Link, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Modal from '@mui/material/Modal';
import s from './cheaptrip.module.css';
import useTravelInfo from '../../../presentation/hooks/useTravelInfo';

function TravelInfo({ travelInfo }) {
  const {
    style,
    lessThan480,
    additionalInfoOpened,
    additionalInformation,
    setAddInfoOpen,
  } = useTravelInfo(travelInfo);

  const handleOpenInfo = () => {
    setAddInfoOpen();
  };

  return (
    <div>
      {locations ? (
        <>
          <Box style={style.itemContainer}>
            <Box style={style.directions}>
              <Typography style={style.boldText}>
                {locations[travelInfo.from] && (
                  <span>{locations[travelInfo.from].name}</span>
                )}
                <ArrowForwardIcon
                  fontSize='small'
                  sx={{ verticalAlign: 'text-bottom' }}
                />
                {locations[travelInfo.to] && (
                  <span>{locations[travelInfo.to].name}</span>
                )}
              </Typography>
              {/*{defineIconOfTransport(data.transportation_type)}*/}
            </Box>
            <Box style={style.directions}>
              <Typography sx={{ color: 'rgb(119, 87, 80)' }}>
                {`${Math.floor(travelInfo.duration / 60)}h ${
                  travelInfo.duration % 60
                }m`}
              </Typography>
              <Box
                sx={
                  lessThan480
                    ? {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }
                    : {}
                }
              >
                {/*{defineTypeOfTransport(data.transportation_type)}*/}
                <Button
                  variant='outlined'
                  type='button'
                  style={style.buyTicket}
                  onClick={handleOpenInfo}
                >
                  Additional information
                </Button>
                <Link
                  href='https://www.booking.com/index.en-gb.html'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button
                    variant='outlined'
                    style={style.buyTicket}
                    type='button'
                  >
                    Booking
                  </Button>
                </Link>
                <Link
                  href='https://www.hostelworldgroup.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button
                    variant='outlined'
                    style={style.buyTicket}
                    type='button'
                  >
                    Hostel world
                  </Button>
                </Link>
              </Box>
              <Typography style={style.price}>
                {travelInfo.price + ` €`}{' '}
              </Typography>
            </Box>
          </Box>

          {/*<h4>Travel info: </h4>*/}
          {/*<p>id: {travelInfo.id}</p>*/}
          {/*{locations[travelInfo.from] &&*/}
          {/*    <p>from: {locations[travelInfo.from].name + ', ' + locations[travelInfo.from].country_name}</p>}*/}
          {/*{locations[travelInfo.to] &&*/}
          {/*    <p>to: {locations[travelInfo.to].name + ', ' + locations[travelInfo.to].country_name}</p>}*/}
          {/*{transport[travelInfo.transport] &&*/}
          {/*    <p>transport: {transport[travelInfo.transport].name}</p>}*/}
          {/*<p>price: {travelInfo.price} euro</p>*/}
          {/*<p>time: {travelInfo.duration} minutes</p>*/}

          {additionalInformation && additionalInfoOpened && (
            <Modal
              open={additionalInfoOpened}
              onClose={handleOpenInfo}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <div className={s.modal}>
                <h5>Additional information</h5>

                <h5>A test message</h5>

                <p>
                  <b>From: </b>
                </p>
                <p>Air code: {additionalInformation.from.air_code}</p>
                <p>Station: {additionalInformation.from.station}</p>
                <p>Latitude: {additionalInformation.from.coords.lat}</p>
                <p>Longtitude: {additionalInformation.from.coords.lon}</p>
                <p>
                  <b>To: </b>
                </p>
                <p>Air code: {additionalInformation.to.air_code}</p>
                <p>Station: {additionalInformation.to.station}</p>
                <p>Latitude: {additionalInformation.to.coords.lat}</p>
                <p>Longtitude: {additionalInformation.to.coords.lon}</p>
                <p>
                  <b>Info: </b>
                </p>
                <p>
                  Duration:{' '}
                  {Math.floor(additionalInformation.duration_min / 60)}h{' '}
                  {additionalInformation.duration_min % 60}m
                </p>
                <p>Distance: {additionalInformation.distance_km}km</p>
                {additionalInformation.frequency && (
                  <p>Frequency: {additionalInformation.frequency.info}</p>
                )}
              </div>
            </Modal>
          )}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default TravelInfo;

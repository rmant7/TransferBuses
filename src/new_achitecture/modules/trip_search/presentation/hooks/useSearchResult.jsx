import { Link, Typography, Button, useMediaQuery } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { resultItemStyle } from '../components/searchResult/style';
import RideSharing from './../../../../general/assets/car-sharing.png';
import TrainIcon from '@mui/icons-material/Train';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const useSearchResult = (data) => {
  const [smallTransportIcon, setSmallTransportIcon] = useState(null);
  const [largeTransportIcon, setLargeTransportIcon] = useState(null);
  const [typeOfTransport, setTypeOfTransport] = useState(null);
  const timeTravel = `${Math.floor(data.trip_duration / 60)} h ${
    data.trip_duration - Math.floor(data.trip_duration / 60) * 60
  } m`;
  const priceTravel = `€ ${data.euro_price}`;
  const style = useMediaQuery('(max-width:650px)')
    ? resultItemStyle.sm
    : resultItemStyle.lg;

  const defineTypeOfTransport = (transport) => {
    let resultLink;
    switch (transport) {
      case 4:
        resultLink = (
          <Link href='https://blablacar.com' target='_blank' rel='noreferrer'>
            <Button variant='outlined' style={style.buyTicket} type='submit'>
              Find a trip
            </Button>
          </Link>
        );
        break;
      case 5:
        resultLink = (
          <Link href='https://www.aferry.com/' target='_blank' rel='noreferrer'>
            <Button variant='outlined' style={style.buyTicket} type='submit'>
              Buy Ticket
            </Button>
          </Link>
        );
        break;
      default:
        resultLink = (
          <Link
            href='https://omio.sjv.io/XxEWmb'
            target='_blank'
            rel='noreferrer'
          >
            <Button variant='outlined' style={style.buyTicket} type='submit'>
              Buy Ticket
            </Button>
          </Link>
        );
    }
    setTypeOfTransport(resultLink);
  };
  const defineSmallIconOfTransport = (transport) => {
    let resultIcon;
    switch (transport) {
      case 4:
        resultIcon = (
          <Typography>
            <img src={RideSharing} alt='car-shearing' style={style.car} /> Ride
            share
          </Typography>
        );
        break;
      case 3:
        resultIcon = (
          <Typography>
            <TrainIcon style={style.icon} fontSize='small' /> Train
          </Typography>
        );
        break;
      case 2:
        resultIcon = (
          <Typography>
            <DirectionsBusIcon style={style.icon} fontSize='small' /> Bus
          </Typography>
        );
        break;
      case 10:
        resultIcon = (
          <Typography>
            <DirectionsBoatIcon style={style.icon} fontSize='small' /> Ferry
          </Typography>
        );
        break;
      default:
        resultIcon = (
          <Typography>
            <AirplanemodeActiveIcon style={style.icon} fontSize='small' />{' '}
            Flight
          </Typography>
        );
    }
    setSmallTransportIcon(resultIcon);
  };

  const defineLargeIconOfTransport = (transport) => {
    let resultIcon;
    switch (transport) {
      case 4:
        resultIcon = (
          <Typography>
            <img src={RideSharing} alt='car-sharing' />
          </Typography>
        );
        break;
      case 3:
        resultIcon = (
          <Typography>
            <TrainIcon fontSize='large' />
          </Typography>
        );
        break;
      case 2:
        resultIcon = (
          <Typography>
            <DirectionsBusIcon fontSize='large' />
          </Typography>
        );
        break;
      case 10:
        resultIcon = (
          <Typography>
            <DirectionsBoatIcon fontSize='large' />
          </Typography>
        );
        break;
      default:
        resultIcon = (
          <Typography>
            <AirplanemodeActiveIcon fontSize='large' />
          </Typography>
        );
    }
    setLargeTransportIcon(resultIcon);
  };

  useEffect(() => {
    defineSmallIconOfTransport(data.transportation_type);
    defineLargeIconOfTransport(data.transportation_type);
    defineTypeOfTransport(data.transportation_type);
  }, []);

  return {
    smallTransportIcon,
    typeOfTransport,
    largeTransportIcon,
    style,
    timeTravel,
    priceTravel,
  };
};

export default useSearchResult;

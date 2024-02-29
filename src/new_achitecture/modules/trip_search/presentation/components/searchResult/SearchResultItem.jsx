import React from 'react';
import { Box, Link, Typography, Button } from '@material-ui/core';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { resultItemStyle } from './style';
import RideSharing from '../../../../../general/assets/car-sharing.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import useSearchResult from '../../hooks/useSearchResult';

export default function SearchResultItem({
  item,
  from,
  to,
  data,
  time,
  price,
}) {
  const { smallTransportIcon, typeOfTransport, style } = useSearchResult(data);

  return (
    <Box style={style.itemContainer}>
      <Box style={style.directions}>
        <Typography style={style.boldText}>
          {from} - {to}
        </Typography>
        {smallTransportIcon}
      </Box>
      <Box style={style.directions}>
        <Typography sx={{ color: 'rgb(119, 87, 80)' }}>{time}</Typography>
        <Box
          sx={
            useMediaQuery('(max-width:480px)')
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }
              : {}
          }
        >
          {typeOfTransport}
          <Link
            href='https://www.booking.com/index.en-gb.html'
            target='_blank'
            rel='noreferrer'
          >
            <Button variant='outlined' style={style.buyTicket} type='submit'>
              Booking
            </Button>
          </Link>
          <Link
            href='https://www.hostelworldgroup.com'
            target='_blank'
            rel='noreferrer'
          >
            <Button variant='outlined' style={style.buyTicket} type='submit'>
              Hostel world
            </Button>
          </Link>
        </Box>
        <Typography style={style.price}>{price} </Typography>
      </Box>
    </Box>
  );
}

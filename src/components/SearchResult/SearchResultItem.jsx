import React from 'react';
import { Box, Link, Typography, Button } from '@material-ui/core';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { resultItemStyle } from './style';
import CarSharing from "../../assets/car-sharing.png";
import useMediaQuery from '@mui/material/useMediaQuery';


export default function SearchResultItem({ item }) {
  const style = useMediaQuery('(max-width:650px)') ? resultItemStyle.sm : resultItemStyle.lg;
  const defineTypeOfTransport = (transport) => { // TODO change cases to names from database
    let resultLink;
    switch (transport) {
      case 2:
        resultLink = (<Link href='https://blablacar.com' target="_blank" rel="noreferrer">
          <Button variant="outlined" style={style.buyTicket} type="submit">
            Find a car
          </Button>
        </Link>);
        break;
      case 3:
        resultLink = (<Link href='https://www.aferry.com/' target="_blank" rel="noreferrer">
          <Button variant="outlined" style={style.buyTicket} type="submit">
            Buy Ticket
          </Button>
        </Link>);
        break;
      default:
        resultLink = (<Link href='https://omio.sjv.io/XxEWmb' target="_blank" rel="noreferrer">
          <Button variant="outlined" style={style.buyTicket} type="submit">
            Buy Ticket
          </Button>
        </Link>);
    }
    return resultLink;
  };
  const defineIconOfTransport = (transport) => { // TODO change cases to names from database
    let resultIcon;
    switch (transport) {
      case 2:
        resultIcon = (<Typography style={style.iconText}>Car share <img src={CarSharing} alt='car-shearing' style={style.car} /></Typography>);
        break;
      case 3:
        resultIcon = (<Typography style={style.iconText}>Ferry <DirectionsBoatIcon style={style.icon} /></Typography>);
        break;
      case 4:
        resultIcon = (<Typography style={style.iconText}>Flight <AirplanemodeActiveIcon style={style.icon} /></Typography>);
        break;
      case 5:
        resultIcon = (<Typography style={style.iconText}>Train <TrainIcon style={style.icon} /></Typography>);
        break;
      default:
        resultIcon = (<Typography style={style.iconText}>Bus <DirectionsBusIcon style={style.icon} /></Typography>);
    }
    return resultIcon;
  }
  return (
    <Box style={style.itemContainer}>
      <Box style={style.directions}>
        <Typography style={style.boldText}>Kiev - Wroclaw - {item}</Typography>
        {defineIconOfTransport(item)}
      </Box>
      <Box style={style.directions}>
        <Typography style={style.time}>3 h 55m</Typography>
        <Box sx={useMediaQuery('(max-width:480px)') ? {display: 'flex', flexDirection: "column", alignItems: "center"} : {}}>
          {defineTypeOfTransport(item)}
          <Link href='https://www.booking.com/index.en-gb.html' target="_blank" rel="noreferrer">
            <Button variant="outlined" style={style.buyTicket} type="submit">
              Booking
            </Button>
          </Link>
          <Link href='https://www.hostelworldgroup.com' target="_blank" rel="noreferrer">
            <Button variant="outlined" style={style.buyTicket} type="submit">
              Hostel world
            </Button>
          </Link>
        </Box>
        <Typography style={style.price}>9 € </Typography>
      </Box>
    </Box>
  );
}
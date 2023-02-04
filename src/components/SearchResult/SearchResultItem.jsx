import React from 'react';
import { Box, Link, Typography, Button } from '@material-ui/core';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { resultItemStyle } from './style';
import CarSharing from "../../assets/car-sharing.png"

export default function SearchResultItem({ item }) {
  const defineTypeOfTransport = (transport) => { // TODO change cases to names from database
    let resultLink;
    switch (transport) {
      case 2:
        resultLink = (<Link href='https://blablacar.com' target="_blank" rel="noreferrer">
          <Button variant="outlined" style={resultItemStyle.buyTicket}>
            Find a car
          </Button>
        </Link>);
        break;
      case 3:
        resultLink = (<Link href='https://www.aferry.com/' target="_blank" rel="noreferrer">
          <Button variant="outlined" style={resultItemStyle.buyTicket}>
            Buy Ticket
          </Button>
        </Link>);
        break;
      default:
        resultLink = (<Link href='https://omio.sjv.io/XxEWmb' target="_blank" rel="noreferrer">
          <Button variant="outlined" style={resultItemStyle.buyTicket}>
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
        resultIcon = (<Typography><img src={CarSharing} alt='car-shearing' style={resultItemStyle.car} /> Car share</Typography>);
        break;
      case 3:
        resultIcon = (<Typography><DirectionsBoatIcon style={resultItemStyle.icon} /> Ferry</Typography>);
        break;
      case 4:
        resultIcon = (<Typography><AirplanemodeActiveIcon style={resultItemStyle.icon} /> Flight</Typography>);
        break;
      case 5:
        resultIcon = (<Typography><TrainIcon style={resultItemStyle.icon} /> Train</Typography>);
        break;
      default:
        resultIcon = (<Typography><DirectionsBusIcon style={resultItemStyle.icon} /> Bus</Typography>);
    }
    return resultIcon;
  }
  return (
    <Box style={resultItemStyle.itemContainer}>
      <Box style={resultItemStyle.directions}>
        <Typography style={resultItemStyle.boldText}>Kiev - Wroclaw {item}</Typography>
        {defineIconOfTransport(item)}
      </Box>
      <Box style={resultItemStyle.directions}>
        <Typography sx={{ color: 'rgb(119, 87, 80)' }}>3 h 55m</Typography>
        <Box>
          {defineTypeOfTransport(item)}
          <Link href='https://www.booking.com/index.en-gb.html' target="_blank" rel="noreferrer">
            <Button variant="outlined" style={resultItemStyle.buyTicket}>
              Find stay
            </Button>
          </Link>
        </Box>
        <Typography style={resultItemStyle.price}>9 € </Typography>
      </Box>
    </Box>
  );
}
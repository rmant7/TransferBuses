import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { resultItemStyle } from './style';

export default function SearchResultItem({item}){
  const buyTicketHandler = () => {
    console.log("buy ticket");
  }
  return (
    <Box style={resultItemStyle.itemContainer}>
      <Box style={resultItemStyle.directions}>
        <Typography style={resultItemStyle.boldText}>Kiev - Wroclaw {item}</Typography>
        <Typography><AirplanemodeActiveIcon style={resultItemStyle.icon}/> Flight</Typography>
      </Box>
      <Box style={resultItemStyle.directions}>
        <Typography sx={{color: 'rgb(119, 87, 80)'}}>3 h 55m</Typography>
        <Button variant="outlined" onClick={buyTicketHandler} style={resultItemStyle.buyTicket}>
        Buy Ticket
        </Button>
        <Typography style={resultItemStyle.price}>9 € </Typography>
      </Box>
    </Box>
  );
}
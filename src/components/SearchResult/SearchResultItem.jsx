import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';


const styles = {
  itemContainer: {
    width: "100%",
    backgroundColor: "rgb(255, 251, 255)",
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "grey",
    borderTopStyle: 'solid',
    alignItems: "center",
    justifyContent: "center",
  },
  directions: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding : 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  buyTicket: {
    borderWidth : 1,
    borderColor: "rgb(177, 44, 22)",
    fontSize: "12px",
    padding: "2px 10px",
    color: "black",
  },
  price : {
    color : "rgb(177, 44, 22)",
  }
};

export default function SearchResultItem({item}){
  const buyTicketHandler = () => {
    console.log("buy ticket");
  }
  return (
    <Box style={styles.itemContainer}>
      <Box style={styles.directions}>
        <Typography style={styles.boldText}>Kiev - Wroclaw {item}</Typography>
        <Typography><AirplanemodeActiveIcon /> Flight</Typography>
      </Box>
      <Box style={styles.directions}>
        <Typography sx={{color: 'grey'}}>3 h 55m</Typography>
        <Button variant="outlined" onClick={buyTicketHandler} style={styles.buyTicket}>
        Buy Ticket
        </Button>
        <Typography style={styles.price}>9.9 € </Typography>
      </Box>
    </Box>
  );
}
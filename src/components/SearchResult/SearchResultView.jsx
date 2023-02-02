import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchResultItem from './SearchResultItem';
import { Box } from '@material-ui/core';

const style = {
  shadow : {
    elevation : 5,
    width: '100%',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  inline: {
    display: 'flex',
    flexDirection: "row",
    paddingBottom: 2.5,
    marginLeft: 5,
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius:5,
    borderColor: "grey",
    borderWidth: 1,
    paddingVertical: 2.5,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  time: {
    color: 'grey',
    marginLeft: 5,
  },
  price: {
    color: "#fff",
    fontWeight: "bold",
  },
  priceContainer: {
    backgroundColor: "#ff6721",
    padding: 3,
    borderRadius: 5,
    display: 'inline-block',
  },
}
export default function SearchResultView({city}){
  const items = [1, 2, 3, 4, 5]; //------- temporary items of roads
	return (
    <div style={{marginTop: "20px"}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box style={style.box}>
          <Box style={style.inline}>
            <AirplanemodeActiveIcon fontSize='large'/>
            <TrainIcon fontSize='large'/>
            <DirectionsBusIcon fontSize='large'/>
            <DirectionsCarIcon fontSize='large'/>
            <DirectionsBoatIcon fontSize='large'/>
          </Box>
            <Typography>
            Kiev 
            <ArrowForwardIcon fontSize='small'/>
            Wroclaw
            <ArrowForwardIcon fontSize='small'/>
            {city.properties.display_name}
          </Typography>
          <Box style={style.bottomContainer}>
            <Typography style={style.time}>8 h 36 m</Typography>
            <Box style={style.priceContainer}>
              <Typography style={style.price}>€ 100</Typography>
            </Box>
          </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {items.map((item) => (
            <SearchResultItem key={item} item={item}/>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion style={style.shadow}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           <Box style={style.box}>
          <Box style={style.inline}>
            <AirplanemodeActiveIcon fontSize='large'/>
            <TrainIcon fontSize='large'/>
            <DirectionsBusIcon fontSize='large'/>
            <DirectionsCarIcon fontSize='large'/>
            <DirectionsBoatIcon fontSize='large'/>
          </Box>
            <Typography>
            Kiev 
            <ArrowForwardIcon fontSize='small'/>
            Wroclaw
            <ArrowForwardIcon fontSize='small'/>
            {city.properties.display_name}
          </Typography>
          <Box style={style.bottomContainer}>
            <Typography style={style.time}>8 h 36 m</Typography>
            <Box style={style.priceContainer}>
              <Typography style={style.price}>€ 100</Typography>
            </Box>
          </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {items.map((item) => (
            <SearchResultItem key={item} item={item}/>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>

  )
}

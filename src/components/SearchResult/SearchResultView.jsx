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
import { resultStyle } from './style';

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
          <Box style={resultStyle.box}>
          <Box style={resultStyle.inline}>
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
          <Box style={resultStyle.bottomContainer}>
            <Typography style={resultStyle.time}>8 h 36 m</Typography>
            <Box style={resultStyle.priceContainer}>
              <Typography style={resultStyle.price}>€ 100</Typography>
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
      <Accordion style={resultStyle.shadow}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           <Box style={resultStyle.box}>
          <Box style={resultStyle.inline}>
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
          <Box style={resultStyle.bottomContainer}>
            <Typography style={resultStyle.time}>8 h 36 m</Typography>
            <Box style={resultStyle.priceContainer}>
              <Typography style={resultStyle.price}>€ 100</Typography>
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

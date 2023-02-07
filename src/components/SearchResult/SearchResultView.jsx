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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchResultItem from './SearchResultItem';
import { Box } from '@material-ui/core';
import { resultStyle } from './style';
import CarSharing from "../../assets/car-sharing.png";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SearchResultView({ city }) {
  const items = [1, 2, 3, 4, 5]; //------- temporary items of transport TODO: use from database
  const style = useMediaQuery('(max-width:650px)') ? resultStyle.sm : resultStyle.lg;
  return (
    <div style={{ marginTop: "20px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box style={style.box}>
            <Box style={style.inline}>
              <AirplanemodeActiveIcon style={style.icon} />
              <TrainIcon style={style.icon} />
              <DirectionsBusIcon style={style.icon} />
              <DirectionsBoatIcon style={style.icon} />
              <img src={CarSharing} alt='car-shearing' style={style.car} />
            </Box>
            <Typography>
              Kiev
              <ArrowForwardIcon style={style.arrow} />
              Wroclaw
              <ArrowForwardIcon style={style.arrow} />
              Paris
              <ArrowForwardIcon style={style.arrow} />
              London
              <ArrowForwardIcon style={style.arrow} />
              London
              <ArrowForwardIcon style={style.arrow} />
              <span>Ivano-Frankivsk</span>
              <ArrowForwardIcon style={style.arrow} />
              {city.properties.display_name}
            </Typography>
            <Box style={style.bottomContainer}>
              <Typography style={style.time}>8 h 36 m</Typography>
              <Box style={style.priceContainer}>
                <Typography style={style.price}>€ 100.00</Typography>
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {items.map((item) => (
            <SearchResultItem key={item} item={item} />
          ))}
        </AccordionDetails>
      </Accordion>
      {/* TODO delete second accordion and use one to map the component from database */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box style={style.box}>
            <Box style={style.inline}>
              <AirplanemodeActiveIcon style={style.icon} />
              <TrainIcon style={style.icon} />
              <DirectionsBusIcon style={style.icon} />
              <DirectionsBoatIcon style={style.icon} />
              <img src={CarSharing} alt='car-shearing' style={style.car} />
            </Box>
            <Typography>
              Kiev
              <ArrowForwardIcon style={style.arrow} />
              Wroclaw
              <ArrowForwardIcon style={style.arrow} />
              {city.properties.display_name}
            </Typography>
            <Box style={style.bottomContainer}>
              <Typography style={style.time}>8 h 36 m</Typography>
              <Box style={style.priceContainer}>
                <Typography style={style.price}>€ 100.00</Typography>
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {items.map((item) => (
            <SearchResultItem key={item} item={item} />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>

  )
}

import React, { useState, useEffect } from 'react';
import locations from '../..//../data/jsons/cheapTripData/locations.json';
import TravelInfo from './TravelInfo';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccordionDetails from '@mui/material/AccordionDetails';
import SearchResultItem from '../../../presentation/components/searchResult/SearchResultItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { resultStyle } from '../../../presentation/components/searchResult/style';
import useRouteCard from '../../../presentation/hooks/useRouteCard';

function RouteCard({ route }) {
  const { style, timeTravel, priceTravel, travelInfo } = useRouteCard(route);
  return (
    <>
      {locations ? (
        <>
          <div style={{ marginTop: '20px' }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Box style={style.box}>
                  <Box style={style.inline}>
                    {/*{defineIconOfTransport(data.transportation_type)}*/}
                  </Box>
                  <Typography>
                    {locations[route.from] && (
                      <span>
                        {locations[route.from].name +
                          ', ' +
                          locations[route.from].country_name}
                      </span>
                    )}
                    <ArrowForwardIcon
                      fontSize='small'
                      sx={{ verticalAlign: 'text-bottom' }}
                    />
                    {locations[route.to] && (
                      <span>
                        {locations[route.to].name +
                          ', ' +
                          locations[route.to].country_name}
                      </span>
                    )}
                  </Typography>
                  <Box style={style.bottomContainer}>
                    <Typography style={style.time}>{timeTravel}</Typography>
                    <Box style={style.priceContainer}>
                      <Typography style={style.price}>{priceTravel}</Typography>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {travelInfo &&
                    travelInfo.length !== 0 &&
                    travelInfo.map((travelInfo) => (
                      <TravelInfo travelInfo={travelInfo} key={travelInfo.to} />
                    ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          {/*<h3>Route info: </h3>*/}
          {/*<p>{route.price} euro</p>*/}
          {/*{locations[route.from]*/}
          {/*    && <p>from: {locations[route.from].name + ', ' + locations[route.from].country_name}</p>}*/}
          {/*{locations[route.to]*/}
          {/*    && <p>to: {locations[route.to].name + ', ' + locations[route.to].country_name}</p>}*/}
          {/*/!*<p>id: {route.id}</p>*!/*/}
          {/*<p>duration: {route.trip_duration}</p>*/}
          {/*<div>*/}
          {/*    {travelInfo && travelInfo.length !== 0*/}
          {/*        && travelInfo.map(travelInfo => (*/}
          {/*            <TravelInfo travelInfo={travelInfo} key={travelInfo.to}/>*/}
          {/*        ))}*/}
          {/*</div>*/}
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}

export default RouteCard;

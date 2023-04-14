import React, {useState, useEffect} from 'react';
import directRoutes from '../../cheapTripData/direct_routes.json'
import locations from '../../cheapTripData/locations.json'
import TravelInfo from "./TravelInfo";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Box} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccordionDetails from "@mui/material/AccordionDetails";
import SearchResultItem from "../SearchResult/SearchResultItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import {resultStyle} from "../SearchResult/style";

function RouteCard({route}) {
    const style = useMediaQuery('(max-width:650px)')
        ? resultStyle.sm
        : resultStyle.lg;

    const timeTravel = `${Math.floor(route.duration / 60)}h ${route.duration % 60}m`;

    const priceTravel = `€ ${route.price}`;

    const [travelInfo, setTravelInfo] = useState(null)
    useEffect(() => {
        if (!directRoutes) return
        let tempKeys = route.direct_routes.split(',')
        // .map(tdId => {
        //     return (Object.keys(directRoutes)).filter(key => directRoutes[key].id == tdId)[0]
        // })
        console.log(tempKeys)
        let temp = []
        tempKeys.map(key => {
            const routeItem = {
                'route': key,
                ...directRoutes[key],
            }
            temp.push(routeItem)
        })
        console.log(temp)
        setTravelInfo(temp)
    }, [directRoutes])

    useEffect(() => {
        console.log(travelInfo)
    }, [travelInfo])

    return (
        <>
            {locations
                ? <>
                    <div style={{marginTop: '20px'}}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                            >
                                <Box style={style.box}>
                                    <Box style={style.inline}>
                                        {/*{defineIconOfTransport(data.transportation_type)}*/}
                                    </Box>
                                    <Typography>
                                        {locations[route.from] && <span>{locations[route.from].name +
                                            ', ' + locations[route.from].country_name}</span>}
                                        <ArrowForwardIcon
                                            fontSize='small'
                                            sx={{verticalAlign: 'text-bottom'}}
                                        />
                                        {locations[route.to] && <span>{locations[route.to].name +
                                            ', ' + locations[route.to].country_name}</span>}
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
                                    {travelInfo && travelInfo.length !== 0
                                        && travelInfo.map(travelInfo => (
                                            <TravelInfo travelInfo={travelInfo} key={travelInfo.to}/>
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
                : <h3>Loading...</h3>}
        </>
    );
}

export default RouteCard;
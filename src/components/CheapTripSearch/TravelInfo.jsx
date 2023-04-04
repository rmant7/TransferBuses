import React, {useState} from 'react';
import locations from '../../cheapTripData/locations.json'
import additional_information from '../../cheapTripData/inner_jsons/80001.json'
import useMediaQuery from "@mui/material/useMediaQuery";
import {resultItemStyle} from "../SearchResult/style";
import {Box, Button, Link, Typography} from "@material-ui/core";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Modal from '@mui/material/Modal';
import s from './cheaptrip.module.css'

function TravelInfo({travelInfo}) {
    const style = useMediaQuery('(max-width:650px)')
        ? resultItemStyle.sm
        : resultItemStyle.lg

    const lessThan480 = useMediaQuery('(max-width:480px)')

    const [additionalInfoOpened, setAdditionalInfoOpened] = useState(false)

    return (
        <div>
            {locations
                ? <>
                    <Box style={style.itemContainer}>
                        <Box style={style.directions}>
                            <Typography style={style.boldText}>
                                {locations[travelInfo.from] &&
                                    <span>{locations[travelInfo.from].name
                                        + ', ' + locations[travelInfo.from].country_name}</span>}
                                <ArrowForwardIcon
                                    fontSize='small'
                                    sx={{verticalAlign: 'text-bottom'}}
                                />
                                {locations[travelInfo.to] &&
                                    <span>{locations[travelInfo.to].name
                                        + ', ' + locations[travelInfo.to].country_name}</span>}
                            </Typography>
                            {/*{defineIconOfTransport(data.transportation_type)}*/}
                        </Box>
                        <Box style={style.directions}>
                            <Typography sx={{color: 'rgb(119, 87, 80)'}}>{travelInfo.duration} min</Typography>
                            <Box
                                sx={lessThan480
                                    ? {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }
                                    : {}
                                }>
                                {/*{defineTypeOfTransport(data.transportation_type)}*/}
                                <Button variant='outlined' type='button' onClick={() => setAdditionalInfoOpened(true)}>
                                    Additional information
                                </Button>
                                <Link
                                    href='https://www.booking.com/index.en-gb.html'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <Button variant='outlined' style={style.buyTicket} type='button'>
                                        Booking
                                    </Button>
                                </Link>
                                <Link
                                    href='https://www.hostelworldgroup.com'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <Button variant='outlined' style={style.buyTicket} type='button'>
                                        Hostel world
                                    </Button>
                                </Link>
                            </Box>
                            <Typography style={style.price}>{travelInfo.price} </Typography>
                        </Box>
                    </Box>

                    {/*<h4>Travel info: </h4>*/}
                    {/*<p>id: {travelInfo.id}</p>*/}
                    {/*{locations[travelInfo.from] &&*/}
                    {/*    <p>from: {locations[travelInfo.from].name + ', ' + locations[travelInfo.from].country_name}</p>}*/}
                    {/*{locations[travelInfo.to] &&*/}
                    {/*    <p>to: {locations[travelInfo.to].name + ', ' + locations[travelInfo.to].country_name}</p>}*/}
                    {/*{transport[travelInfo.transport] &&*/}
                    {/*    <p>transport: {transport[travelInfo.transport].name}</p>}*/}
                    {/*<p>price: {travelInfo.price} euro</p>*/}
                    {/*<p>time: {travelInfo.duration} minutes</p>*/}

                    {additional_information && additionalInfoOpened &&
                        <Modal
                            open={additionalInfoOpened}
                            onClose={() => setAdditionalInfoOpened(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className={s.modal}>
                                <h5>Additional information</h5>

                                <h5>A test message</h5>

                                <p><b>From: </b></p>
                                <p>Air code: {additional_information.from.air_code}</p>
                                <p>Station: {additional_information.from.station}</p>
                                <p>Latitude: {additional_information.from.coords.lat}</p>
                                <p>Longtitude: {additional_information.from.coords.lon}</p>
                                <p><b>To: </b></p>
                                <p>Air code: {additional_information.to.air_code}</p>
                                <p>Station: {additional_information.to.station}</p>
                                <p>Latitude: {additional_information.to.coords.lat}</p>
                                <p>Longtitude: {additional_information.to.coords.lon}</p>
                                <p><b>Info: </b></p>
                                <p>Duration: {Math.floor(additional_information.duration_min / 60)}
                                    h {additional_information.duration_min % 60}m
                                </p>
                                <p>Distance: {additional_information.distance_km}km</p>
                                <p>Frequency: {additional_information.frequency.info}</p>
                            </div>
                        </Modal>}
                </>
                : <div>Loading</div>}
        </div>
    );
}

export default TravelInfo;
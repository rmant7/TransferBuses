import React, {useState} from 'react';
import locations from '../../cheapTripData/locations.json'
import transport from '../../cheapTripData/transport.json'
import additional_information from '../../cheapTripData/inner_jsons/80001.json'

function TravelInfo({travelInfo}) {
    return (
        <div>
            {locations
                ? <>
                    <h4>Travel info: </h4>
                    {/*<p>id: {travelInfo.id}</p>*/}
                    {locations[travelInfo.from] &&
                        <p>from: {locations[travelInfo.from].name + ', ' + locations[travelInfo.from].country_name}</p>}
                    {locations[travelInfo.to] &&
                        <p>to: {locations[travelInfo.to].name + ', ' + locations[travelInfo.to].country_name}</p>}
                    {transport[travelInfo.transport] &&
                        <p>transport: {transport[travelInfo.transport].name}</p>}
                    <p>price: {travelInfo.price} euro</p>
                    <p>time: {travelInfo.duration} minutes</p>
                    {additional_information &&
                        <div>
                            <h5>Additional information</h5>
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
                        </div>}
                </>
                : <div>Loading</div>}
        </div>
    );
}

export default TravelInfo;
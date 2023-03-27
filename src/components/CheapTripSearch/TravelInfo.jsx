import React, {useState} from 'react';
import locations from '../../cheapTripData/locations.json'
import transport from '../../cheapTripData/transport.json'

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
                </>
                : <div>Loading</div>}
        </div>
    );
}

export default TravelInfo;
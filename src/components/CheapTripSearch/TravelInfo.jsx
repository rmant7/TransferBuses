import React, {useState} from 'react';
import locations from '../../cheapTripData/locations.json'
import transport from '../../cheapTripData/transportation_types.json'

function TravelInfo({travelInfo}) {
    // const [locations, setLocations] = useState(null)
    // import('../../cheapTripData/locations.json').then(obj => {
    //     setLocations(obj.default)
    // })

    return (
        <div>
            {locations
                ? <>
                    <h4>Travel info: </h4>
                    <p>id: {travelInfo.id}</p>
                    {locations[travelInfo.from] &&
                        <p>from: {locations[travelInfo.from].name + ', ' + locations[travelInfo.from].country_name}</p>}
                    {locations[travelInfo.to] &&
                        <p>to: {locations[travelInfo.to].name + ', ' + locations[travelInfo.to].country_name}</p>}
                    {transport[travelInfo.transportation_type] &&
                        <p>transport: {transport[travelInfo.transportation_type].name}</p>}
                    <p>price: {travelInfo.euro_price} euro</p>
                    <p>time: {travelInfo.time_in_minutes} minutes</p>
                </>
                : <div>Loading</div>}
        </div>
    );
}

export default TravelInfo;
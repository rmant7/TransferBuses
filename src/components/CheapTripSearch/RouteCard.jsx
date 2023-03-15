import React, {useState, useEffect} from 'react';
import travelData from '../../cheapTripData/travel_data.json'
import locations from '../../cheapTripData/locations.json'
import TravelInfo from "./TravelInfo";

function RouteCard({route}) {
    const [travelInfo, setTravelInfo] = useState(null)
    useEffect(() => {
        console.log(route)
        console.log(route.travel_data)
        let tempKeys = route.travel_data
            .map(tdId => (Object.keys(travelData)).filter(key => travelData[key].id === tdId)[0])
        console.log(tempKeys)
        let temp = []
        tempKeys.map(key => {
            console.log(travelData[key])
            temp.push(travelData[key])
        })
        console.log(temp)
        setTravelInfo(temp)
    }, [])

    useEffect(() => {
        console.log(travelInfo)
    }, [travelInfo])

    return (
        <>
            <h3>Route info: </h3>
            <p>{route.euro_price} euro</p>
            {locations[route.from]
                && <p>from: {locations[route.from].name + ', ' + locations[route.from].country_name}</p>}
            {locations[route.to]
                && <p>to: {locations[route.to].name + ', ' + locations[route.to].country_name}</p>}
            <p>id: {route.id}</p>
            <p>duration: {route.trip_duration}</p>
            <div>
                {travelInfo && travelInfo.length !== 0
                    && travelInfo.map(travelInfo => (
                        <TravelInfo travelInfo={travelInfo} key={travelInfo.id}/>
                    ))}
            </div>
        </>
    );
}

export default RouteCard;
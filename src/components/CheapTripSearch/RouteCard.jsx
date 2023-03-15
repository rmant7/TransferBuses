import React, {useState, useEffect} from 'react';
import travelData from '../../cheapTripData/travel_data.json'
import TravelInfo from "./TravelInfo";

function RouteCard({route}) {
    const [travelInfo, setTravelInfo] = useState(null)
    useEffect(() => {
        let tempKeys = route.travel_data
            .map(tdId => Object.keys(travelData).filter(key => travelData[key].id === tdId))
        let temp = []
        tempKeys.map(key => {
            temp.push(travelData[key])
        })
        setTravelInfo(temp)
    }, [])

    return (
        <div>
            <p>{route.euro_price} euro</p>
            <p>from: {route.from}</p>
            <p>to: {route.to}</p>
            <p>id: {route.id}</p>
            <div>
                {travelInfo && travelInfo.length !== 0
                    && travelInfo.map(travelInfo => <TravelInfo travelInfo={travelInfo}/>)}
            </div>
            <p>duration: {route.trip_duration}</p>
        </div>
    );
}

export default RouteCard;
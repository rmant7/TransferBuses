import React, {useState, useEffect} from 'react';
import directRoutes from '../../cheapTripData/direct_routes.json'
import locations from '../../cheapTripData/locations.json'
import TravelInfo from "./TravelInfo";

function RouteCard({route}) {
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
            temp.push(directRoutes[key])
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
                    <h3>Route info: </h3>
                    <p>{route.price} euro</p>
                    {locations[route.from]
                        && <p>from: {locations[route.from].name + ', ' + locations[route.from].country_name}</p>}
                    {locations[route.to]
                        && <p>to: {locations[route.to].name + ', ' + locations[route.to].country_name}</p>}
                    {/*<p>id: {route.id}</p>*/}
                    <p>duration: {route.trip_duration}</p>
                    <div>
                        {travelInfo && travelInfo.length !== 0
                            && travelInfo.map(travelInfo => (
                                <TravelInfo travelInfo={travelInfo} key={travelInfo.to}/>
                            ))}
                    </div>
                </>
                : <h3>Loading...</h3>}
        </>
    );
}

export default RouteCard;
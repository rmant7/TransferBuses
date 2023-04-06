import React, {useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import locations from '../../cheapTripData/locations.json'
import common_routes from '../../cheapTripData/routes.json'
import fixed_routes from '../../cheapTripData/fixed_routes.json'
import flying_routes from '../../cheapTripData/flying_routes.json'
import RouteCard from "./RouteCard";
import s from './cheaptrip.module.css'
import classes from "../SearchCheapTrip/SearchComponent.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {Button} from "@material-ui/core";
import i18n from "../../i18n";
import { lowerCase } from 'lodash';

function CheapTripSearch(props) {
    const routes = {...flying_routes, ...fixed_routes, ...common_routes}

    const locationsKeysSorted = function () {
        if (!locations) return
        let temp = {...locations}
        return (Object.keys(temp)).sort((a, b) => {
            return temp[a].name > temp[b].name ? 1 : -1
        })
    }()

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [fromKey, setFromKey] = useState('')
    const [toKey, setToKey] = useState('')
    const [asyncFromOptions, setAsyncFromOptions] = useState([])
    const [asyncToOptions, setAsyncToOptions] = useState([])
    const [geoLocation, setGeoLocation] = useState({latitude: 0, longitude: 0})

    const fromOptions = locationsKeysSorted
        ? locationsKeysSorted.map(key =>
            ({
                label: locations[key].name + ', ' + locations[key].country_name,
                key: key
            }))
        : []
    const toOptions = locationsKeysSorted
        ? [{label: 'Anywhere', key: '0'}, ...locationsKeysSorted.map(key => ({
            label: key !== '0'
                ? locations[key].name + ', ' + locations[key].country_name
                : '',
            key: key
        }))]
        : []

    const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null)

    const cleanForm = () => {
        setFrom('')
        setTo('')
        setFromKey('')
        setToKey('')
        setSelectedRoutesKeys(null)
    }
    const submit = () => {
        if (from === '') return
        // console.log(from)
        // console.log(fromKey)
        let routesKeys = Object.keys(routes)
        const filteredByFrom = routesKeys.filter(key => routes[key].from === +fromKey)
        if (to === '') {
            setTo('Anywhere')
            setToKey('0')
        } else if (to === 'Anywhere') {
            const sortedByPrice = filteredByFrom
                .sort((a, b) => routes[a].euro_price - routes[b].euro_price)
            setSelectedRoutesKeys(sortedByPrice)
        } else {
            const filteredByTo = filteredByFrom.filter(key => routes[key].to === +toKey)
            const sortedByPrice = filteredByTo
                .sort((a, b) => routes[a].euro_price - routes[b].euro_price)
            setSelectedRoutesKeys(sortedByPrice)
        }
    }

    const PAGINATION_LIMIT = 10
    const PING_LIMIT = 1000
    // function to check ping
    const ping = async () => {
		const start = Date.now()
		await fetch('photon.komoot.io/api')
        const end = Date.now()
        return end - start

	}
    // function to get distance between points
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;  // distance returned
     }
     function deg2rad(deg) {
        return deg * (Math.PI/180)
     }
    //  get array ellemen by input value
    const findAutocomplete = async (cityName) => {
		///****active after change input********* */
		const url = `https://photon.komoot.io/api/?q=${cityName}&osm_tag=place:city`;
		const response = await fetch(url);
		let data = (await response.json()).features;
		return data;
	};
    const asycnAutocomplete = async(e, setState) => {
        const p = await ping()
        // check ping
        if(p <= PING_LIMIT) {
            const value = e.target.value
            let data = await findAutocomplete(value)
            // get geolocation 
            navigator.geolocation.getCurrentPosition(function(position) {
                setGeoLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
            // create array with needs fields
            let array = data.map(item => ({
                label: item.properties.name,
                key: fromOptions.find(el => el.label.includes(item.properties.name))?.key || null,
                latitude: item.geometry.coordinates[1],
                longitude: item.geometry.coordinates[0],
            }))
            for(let i = 0; i< array.length; i++) {
                let distance = getDistanceFromLatLonInKm(parseInt(geoLocation.latitude), 
                parseInt(geoLocation.longitude),
                array[i].latitude,
                array[i].longitude); 
                array[i].distance = distance;
             }
            //  sort array by distance
             array = array.sort(function(a, b) {
                return a.distance - b.distance
             });
            //  get array unique elements
            const uniqueArray =  [...new Map(array.map(item =>
                [item['label'], item])).values()]; 
            setState(uniqueArray)
        } else {
            setState([])

        }
    }
    const checkFromOption = asyncFromOptions.length !== 0 ? asyncFromOptions : fromOptions
    const checkToOption = asyncToOptions.length !== 0 ? asyncToOptions : toOptions
    return (
        <div>
            <form action="" className={s.autocomplete}>
                <Autocomplete
                    value={from || ''}
                    onChange={(e, newValue) => {
                        setFrom(newValue ? newValue.label : '')
                        setFromKey(newValue.key ? newValue.key : '')
                    }}
                    onInputChange={(e) => asycnAutocomplete(e, setAsyncFromOptions)}
                    disablePortal
                    blurOnSelect
                    openOnFocus
                    options={checkFromOption}
                    sx={{width: '100%'}}
                    renderInput={(params) => <TextField {...params} label="From"/>}
                />
                <DoubleArrowIcon className={classes.media_icon}/>
                <Autocomplete
                    value={to || ''}
                    onChange={(e, newValue) => {
                        setTo(newValue ? newValue.label : '')
                        setToKey(newValue ? newValue.key : '')
                    }}
                    onInputChange={(e) => asycnAutocomplete(e, setAsyncToOptions )}
                    disablePortal
                    blurOnSelect
                    openOnFocus
                    options={checkToOption}
                    sx={{width: '100%'}}
                    renderInput={(params) => <TextField {...params} label="To"/>}
                />
            </form>
            <div className={classes.filter_buttons}>
                <Button variant="outlined" onClick={cleanForm} type="reset">
                    {i18n.t("Clean")}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    style={{marginLeft: "10px"}}
                    type="button"
                >
                    {i18n.t("Let's Go")}
                </Button>
            </div>
            <div>
                {routes && selectedRoutesKeys && selectedRoutesKeys
                    .sort((a, b) => routes[a].direct_routes.length - routes[b].direct_routes.length)
                    .slice(0, PAGINATION_LIMIT).map(key => {
                        return (
                            routes[key] ? <RouteCard route={routes[key]} key={key}/> : <div>Loading...</div>
                        )
                    })}
                {routes && selectedRoutesKeys && selectedRoutesKeys.length === 0 && <p>No such routes</p>}
            </div>
        </div>
    )
}

export default CheapTripSearch;
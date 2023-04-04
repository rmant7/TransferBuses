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
import {lowerCase} from 'lodash';
import {asyncAutocomplete} from './asyncAutocomplete';

function CheapTripSearch(props) {
    const routes = {...flying_routes, ...fixed_routes, ...common_routes}

    // Here the routes with a common key will merge into an array: 89091: [{...},{...}]
    const routesForRender = {};
    for (const key in flying_routes) {
        routes[key] = [flying_routes[key]];
    }
    for (const key in fixed_routes) {
        if (routes[key]) {
            if (JSON.stringify(routes[key]) === JSON.stringify(fixed_routes[key])) {
                routes[key].push(fixed_routes[key]);
            }
        } else {
            routes[key] = fixed_routes[key] ? [fixed_routes[key]] : [];
        }
    }
    for (const key in common_routes) {
        if (routes[key]) {
            if (JSON.stringify(routes[key]) === JSON.stringify(common_routes[key])) {
                routes[key].push(common_routes[key]);
            }
        } else {
            routes[key] = common_routes[key] ? [common_routes[key]] : [];
        }
    }
    console.log(routes);

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
    const startAsyncAutocomplete = (e, setState, options) => {
        // get geolocation
        navigator.geolocation.getCurrentPosition(function (position) {
            setGeoLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
        asyncAutocomplete(e, setState, options, geoLocation)
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
                    onInputChange={(e) => startAsyncAutocomplete(e, setAsyncFromOptions, fromOptions)}
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
                    onInputChange={(e) => startAsyncAutocomplete(e, setAsyncToOptions, toOptions)}
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
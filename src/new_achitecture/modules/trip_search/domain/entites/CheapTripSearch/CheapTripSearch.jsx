import React, {useEffect, useState} from 'react';
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import locations from '../../../data/jsons/cheapTripData/locations.json'
import common_routes from '../../../data/jsons/cheapTripData/routes.json'
import fixed_routes from '../../../data/jsons/cheapTripData/fixed_routes.json'
import flying_routes from '../../../data/jsons/cheapTripData/flying_routes.json'
import RouteCard from "./RouteCard";
import s from './cheaptrip.module.css'
import classes from "../../../presentation/components/searchResult/SearchComponent.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {Button} from "@material-ui/core";
import i18n from "../utils/language/i18n";
import {asyncAutocomplete} from './asyncAutocomplete';
import ClearIcon from "@material-ui/icons/Clear";

function CheapTripSearch(props) {
    const routes = {...flying_routes, ...fixed_routes, ...common_routes}

    // Here the routes with a common key will merge into an array like: 89091: [{...}, {...}]
    const routesForRender = {};
    for (const key in flying_routes) {
        routesForRender[key] = [flying_routes[key]];
    }
    for (const key in fixed_routes) {
        if (routesForRender[key]) {
            routesForRender[key].push(fixed_routes[key]);
        } else {
            routesForRender[key] = fixed_routes[key] ? [fixed_routes[key]] : [];
        }
    }
    for (const key in common_routes) {
        if (routesForRender[key]) {
            routesForRender[key].push(common_routes[key]);
        } else {
            routesForRender[key] = common_routes[key] ? [common_routes[key]] : [];
        }
    }

    const locationsKeysSorted = function () {
        if (!locations) return;
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
    const [inputValueFrom, setInputValueFrom] = useState('')
    const [inputValueTo, setInputValueTo] = useState('')

    const fromOptions = locationsKeysSorted ?
        locationsKeysSorted.map(key =>
            ({
                label: locations[key].name,
                key: key
            }))
        : []
    const toOptions = locationsKeysSorted ?
        [{label: 'Anywhere', key: '0'}, ...locationsKeysSorted.map(key => ({
            label: key !== '0' ? locations[key].name : '',
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

    const PAGINATION_LIMIT = 10;
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

    const checkFromOption = asyncFromOptions.length !== 0 ? asyncFromOptions : fromOptions;
    const checkToOption = asyncToOptions.length !== 0 ? asyncToOptions : toOptions;

    let inputFromStyle = {
        color: "rgb(118, 118, 118)"
    }
    let inputToStyle = {
        color: "rgb(118, 118, 118)"
    }

    useEffect(() => {

    }, []);




    return (
        <div>
            <form action="" className={s.autocomplete}>
                <Autocomplete
                    value={from}
                    onChange={(e, newValue) => {
                        setFrom(newValue ? newValue.label : '')
                        setFromKey(newValue ? newValue.key : '')
                    }}
                    onInputChange={(e, newValue) => {
                        setInputValueFrom(newValue)
                    }}
                    disablePortal
                    freeSolo
                    blurOnSelect
                    openOnFocus
                    inputValue={inputValueFrom}
                    options={checkFromOption.sort((a, b)=> {
                        if (a.label.toLowerCase().startsWith(inputValueFrom.toLowerCase()) &&
                            !b.label.toLowerCase().startsWith(inputValueFrom.toLowerCase()))
                            return -1
                    })}
                    onFocus={() => inputFromStyle = {color: "#ff5722"}}
                    onBlur={() => inputFromStyle = {color: "rgb(118, 118, 118)"}}
                    sx={{width: '100%'}}
                    clearIcon={true}
                    ListboxProps={{ style: { maxHeight: 140 } }}
                    renderInput={(params) =>
                        <TextField {...params}
                                   label="From"
                                   variant="standard"
                                   InputLabelProps={{
                                       style: inputFromStyle
                                   }}
                                   sx={{
                                       '& .MuiInput-underline:before': { borderBottomColor: 'rgb(118, 118, 118)' },
                                       '& .MuiInput-underline:after': { borderBottomColor: '#ff5722' },
                                   }}
                        />
                    }
                    isOptionEqualToValue={(option, value) => option.label === value}
                />
                <ClearIcon style={{color: 'rgb(118, 118, 118)'}}
                           onClick={() => {
                               setFrom('');
                               setInputValueFrom('')
                               setFromKey('')
                           }}
                />

                <DoubleArrowIcon className={classes.media_icon}/>
                <Autocomplete
                    value={to}
                    onChange={(e, newValue) => {
                        setTo(newValue ? newValue.label : '')
                        setToKey(newValue ? newValue.key : '')
                    }}
                    onInputChange={(e, newValue) => {
                        setInputValueTo(newValue)
                    }}
                    disablePortal
                    freeSolo
                    blurOnSelect
                    openOnFocus
                    inputValue={inputValueTo}
                    options={checkFromOption.sort((a, b)=> {
                        if (a.label.toLowerCase().startsWith(inputValueTo.toLowerCase()) &&
                            !b.label.toLowerCase().startsWith(inputValueTo.toLowerCase()))
                            return -1
                    })}
                    onFocus={() => inputToStyle = {color: "#ff5722"}}
                    onBlur={() => inputToStyle = {color: "rgb(118, 118, 118)"}}
                    sx={{width: '100%'}}
                    clearIcon={true}
                    ListboxProps={{ style: { maxHeight: 140 } }}
                    renderInput={(params) =>
                        <TextField {...params}
                                   label="To"
                                   variant="standard"
                                   InputLabelProps={{
                                       style: inputToStyle
                                   }}
                                   sx={{
                                       '& .MuiInput-underline:before': { borderBottomColor: 'rgb(118, 118, 118)' },
                                       '& .MuiInput-underline:after': { borderBottomColor: '#ff5722' },
                                   }}
                        />}
                    isOptionEqualToValue={(option, value) => option.label === value}
                />
                <ClearIcon style={{color: 'rgb(118, 118, 118)'}}
                           onClick={() => {
                               setTo('');
                               setInputValueTo('')
                               setToKey('')
                           }}
                />
            </form>
            <div className={classes.filter_buttons}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={cleanForm}
                    type="reset"
                    disableElevation={true} // disable shade
                    style={{textTransform: "none"}}
                >
                    {i18n.t("Clear form")}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    style={{marginLeft: "10px", textTransform: "none", color: "#fff"}}
                    type="button"
                    disableElevation="true"
                    disabled={to === '' || from === ''}
                >
                    {i18n.t("Let's go")}
                </Button>
            </div>
            <div>
                {routes && selectedRoutesKeys && selectedRoutesKeys
                    .sort((a, b) => routes[a].direct_routes.length - routes[b].direct_routes.length)
                    .slice(0, PAGINATION_LIMIT).map((key) => {
                        return routesForRender[key].map((route, index) => {
                                return <RouteCard route={route} key={key + index}/>
                            }
                        )
                    })}
                {routes && selectedRoutesKeys && selectedRoutesKeys.length === 0 && <p>No such routes</p>}
            </div>
        </div>
    )
}

export default CheapTripSearch;
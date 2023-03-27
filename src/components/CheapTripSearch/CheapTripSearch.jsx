import React, {useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import locations from '../../cheapTripData/locations.json'
import common_routes from '../../cheapTripData/routes.json'
import fixed_routes from '../../cheapTripData/fixed_routes.json'
import flying_routes from '../../cheapTripData/flying_routes.json'
import RouteCard from "./RouteCard";
import s from './cheaptrip.module.css'

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
        console.log(from)
        console.log(fromKey)
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

    return (
        <div>
            <form action="" className={s.autocomplete}>
                <Autocomplete
                    value={from || ''}
                    onChange={(e, newValue) => {
                        setFrom(newValue ? newValue.label : '')
                        setFromKey(newValue.key ? newValue.key : '')
                    }}
                    disablePortal
                    blurOnSelect
                    openOnFocus
                    options={fromOptions}
                    sx={{width: '40%'}}
                    renderInput={(params) => <TextField {...params} label="From"/>}
                />
                <Autocomplete
                    value={to || ''}
                    onChange={(e, newValue) => {
                        setTo(newValue ? newValue.label : '')
                        setToKey(newValue ? newValue.key : '')
                    }}
                    disablePortal
                    blurOnSelect
                    openOnFocus
                    options={toOptions}
                    sx={{width: '40%'}}
                    renderInput={(params) => <TextField {...params} label="To"/>}
                />
            </form>
            <div className={s.buttons}>
                <button onClick={cleanForm}>Clean form</button>
                <button onClick={submit}>Let's go!</button>
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
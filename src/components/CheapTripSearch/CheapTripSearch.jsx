import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Autocomplete, TextField} from "@mui/material";
import routes from '../../cheapTripData/routes.json'
import s from './cheaptrip.module.css'
import RouteCard from "./RouteCard";

function CheapTripSearch(props) {
    const locations = useSelector(state => state.data.locations)
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
        ? [{label: 'Anywhere', key: 0}, ...locationsKeysSorted.map(key => ({
            label: locations[key].name + ', ' + locations[key].country_name,
            key: key
        }))]
        : []

    const [selectedRoutesKeys, setSelectedRoutesKeys] = useState(null)

    const cleanForm = () => {
        setFrom('')
        setTo('')
        setFromKey('')
        setTo('')
        setSelectedRoutesKeys(null)
    }
    const submit = () => {
        if (fromKey === '') return
        let routesKeys = Object.keys(routes)
        const filteredByFrom = routesKeys.filter(key => routes[key].from === +fromKey)
        if (toKey === '0' || toKey === '') {
            setTo('Anywhere')
            setToKey('0')
            setSelectedRoutesKeys(filteredByFrom)
        } else {
            const filteredByTo = filteredByFrom.filter(key => routes[key].to === +toKey)
            setSelectedRoutesKeys(filteredByTo)
        }
    }

    return (
        <div>
            <form action="">
                <Autocomplete
                    value={from || ''}
                    onChange={(e, newValue) => {
                        setFrom(newValue ? newValue.label : '')
                        setFromKey(newValue ? newValue.key : '')
                    }}
                    disablePortal
                    blurOnSelect
                    openOnFocus
                    options={fromOptions}
                    sx={{width: 300}}
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
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="To"/>}
                />
            </form>
            <button onClick={cleanForm}>Clean form</button>
            <button onClick={submit}>Let's go!</button>
            <div>
                {selectedRoutesKeys && selectedRoutesKeys.map(key => (
                    <RouteCard route={routes[key]}/>
                ))}
                {selectedRoutesKeys && selectedRoutesKeys.length === 0 && <p>No such routes</p>}
            </div>
        </div>
    )
}

export default CheapTripSearch;
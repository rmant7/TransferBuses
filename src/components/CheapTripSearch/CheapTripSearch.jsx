import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Autocomplete, TextField} from "@mui/material";

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

    const cleanForm = () => {
        setFrom('')
        setTo('')
    }

    return (
        <div>
            <form action="">
                <Autocomplete
                    value={from}
                    onChange={(e, newValue) => {
                        setFrom(newValue);
                    }}
                    disablePortal
                    blurOnSelect
                    openOnFocus
                    options={fromOptions}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="From"/>}
                />
                <Autocomplete
                    value={to}
                    onChange={(e, newValue) => {
                        setTo(newValue);
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
        </div>
    )
}

export default CheapTripSearch;
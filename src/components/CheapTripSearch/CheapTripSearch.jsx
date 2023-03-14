import React from 'react';
import AutoComplete from "../AutoComplete/AutoComplete";
import CloseIcon from "@mui/icons-material/Close";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import classes from "../SearchCheapTrip/SearchComponent.module.css";
import {Button} from "@material-ui/core";
import i18n from "../../i18n";
import RoutesList from "../AutoComplete/RoutesList";
import SearchResultView from "../SearchResult/SearchResultView";
import SearchFailResultView from "../SearchResult/SearchFailResultView";
import {useSelector} from "react-redux";

function CheapTripSearch(props) {
    const locations = useSelector(state => state.data.locations)



    return (
        <div>
            <select name="from">
                {locations && Object.keys(locations).map(key => (
                    <option key={key}>{locations[key].name + ', ' + locations[key].country_name}</option>
                ))}
            </select>
            <select name="to">
                {locations && Object.keys(locations).map(key => (
                    <option key={key}>{locations[key].name + ', ' + locations[key].country_name}</option>
                ))}
            </select>
        </div>
    )
}

export default CheapTripSearch;
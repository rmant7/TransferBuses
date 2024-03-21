import React from 'react';
import chs from "./CityHeaderComponent.module.css"
import {NavLink} from "react-router-dom";

const CityHeaderComponent = () => {
    return (
        <div className={chs.containerHeader}>
            <div className={chs.headline}>
            <NavLink className={chs.logo} to={"/budgettraveltips/"}>
                <span className={chs.logoTrip}>CheapTrip</span>
            </NavLink>
            <span className={chs.sloganHeader}>
                <span className={chs.sloganHeaderChilds}>Pay less,</span>
                <span className={chs.sloganHeaderChilds}> visit more!</span>
            </span>
            </div>
        </div>
    );
};

export default CityHeaderComponent;
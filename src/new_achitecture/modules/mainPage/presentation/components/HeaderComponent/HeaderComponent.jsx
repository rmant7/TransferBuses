import React from 'react';
import { AppBar, Toolbar } from "@material-ui/core";
// import { Sidebar } from "..";
import Sidebar from "./Sidebar/Sidebar";
import css from "./HeaderComponent.module.css";
import { LogoHeader } from "./Logos/Logos";
import Nav from "./Nav/Nav";
import { useLocation } from 'react-router';
import {CONTACTS_ROUTE, MAIN_ROUTE} from "../../../../trip_search/domain/entites/utils/constants/constants";

const HeaderComponent = () => {
    //const page_mode = useStatePath();
    return (
        <AppBar>
            <Toolbar className={css.navbar}>
                {/*<LogoHeader page_mode={page_mode} />
                <Nav />*/}
            </Toolbar>
            {/*<Sidebar page_mode={page_mode} />*/}
        </AppBar>
    );
}

export default HeaderComponent;

function useStatePath() {
    const { pathname } = useLocation();
    if (pathname === MAIN_ROUTE || pathname === CONTACTS_ROUTE) {
        return "CheapTrip";
    }
    return "TransferBuses";
}








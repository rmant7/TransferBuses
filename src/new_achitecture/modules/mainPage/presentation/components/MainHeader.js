import React from 'react';
import {LogoHeader} from "./HeaderComponent/Logos/Logos";
import Nav from "./HeaderComponent/Nav/Nav";
import Sidebar from "./HeaderComponent/Sidebar/Sidebar";
import {AppBar, Toolbar} from "@material-ui/core";

function MainHeader(props) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                {/*<LogoHeader page_mode={'CheapTrip'} />
                <Nav />*/}
            </Toolbar>
            {/*<Sidebar page_mode={'CheapTrip'} />*/}
        </AppBar>
    );
}

export default MainHeader;
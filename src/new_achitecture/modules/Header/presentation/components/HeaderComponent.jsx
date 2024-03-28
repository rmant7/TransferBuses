import React, {useState} from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import css from "./HeaderComponent.module.css";
import {useLocation} from 'react-router';
import {
    CONTACTS_ROUTE,
    MAIN_ROUTE,
    PASSENGER_ROUTE, TRAVEL_TIPS,
} from "../../../trip_search/domain/entites/utils/constants/constants";
import {useStyles} from "../../../../general/MUI/useStyles";
import {Link, NavLink} from "react-router-dom";
import ContactMailIcon from '@mui/icons-material/ContactMail';


const Header = () => {
    // refactor to redux
    const [logo, setLogo] = useState("CheapTrip");
    const { pathname } = useLocation();
    const classes = useStyles();

    const ROUTES = [
        {name: 'contacts', path: CONTACTS_ROUTE},
        {name: 'TransferBuses', path: PASSENGER_ROUTE},
    ]

    return (
        <AppBar className={css.appbar} elevation={0}>
            <Toolbar className={css.navbar}>
                <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                    <NavLink className={css.logo} to={MAIN_ROUTE}>
                        <span className={css.logoTrip}>CheapTrip</span>
                    </NavLink>
                    <span className={css.sloganHeader}>
        <span className={css.sloganHeaderChilds}>Pay less, visit more!</span>
                    </span>
                </div>
                <nav className={css.nav}>
                    <Link
                        to={PASSENGER_ROUTE}
                        edge='end'
                        className={css.menuButton}
                    >
                        Transfer Buses
                    </Link>
                    <Link
                    to={TRAVEL_TIPS}
                    edge='end'
                    className={css.menuButton}
                    >
                        Travel Tips
                    </Link>
                    <Link
                    to={CONTACTS_ROUTE}
                    edge='end'
                    className={css.menuButton}>
                    <ContactMailIcon/>
                </Link>
                </nav>

            </Toolbar>

        </AppBar>
    );
}

export default Header;










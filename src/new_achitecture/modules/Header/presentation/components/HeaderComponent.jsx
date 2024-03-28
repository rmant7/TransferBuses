import React, {useState, MouseEvent} from 'react';
import {AppBar, Toolbar, Menu, MenuList, MenuItem, Box,} from "@material-ui/core";
import css from "./HeaderComponent.module.css";
import {useHistory, useLocation} from 'react-router';
import {
    CONTACTS_ROUTE,
    MAIN_ROUTE,
    PASSENGER_ROUTE, TRAVEL_TIPS,
} from "../../../trip_search/domain/entites/utils/constants/constants";
import {useStyles} from "../../../../general/MUI/useStyles";
import {Link, NavLink} from "react-router-dom";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from "@mui/material/IconButton";
import {ListItemText} from "@mui/material";

const Header = () => {
    // refactor to redux
    const [logo, setLogo] = useState("CheapTrip");
    const {pathname} = useLocation();
    const classes = useStyles();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const closeMenu = () => {
        setAnchorEl(null)
    }

    const ROUTES = [
        {name: 'contacts', path: CONTACTS_ROUTE},
        {name: 'TransferBuses', path: PASSENGER_ROUTE},
    ]
    const closeHandler = path => {
        history.push(path);
        closeMenu();
    }
    const underHeader = () => {
        if (pathname === MAIN_ROUTE || pathname === CONTACTS_ROUTE) {
            return <div className={css.tipsUnderHeader}><Link to={'/budgetTravelTips'} className={css.Link_tips}>Budget
                travel tips &gt;&gt;
            </Link></div>;
        }
        return <></>;
    }
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
                <Box className={css.burger}>
                    <IconButton onClick={openMenu} edge="end" color='inherit' aria-controls="simple-menu"
                                aria-haspopup="true">
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                        anchorEl={anchorEl}
                        keepMounted
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuList>
                            <MenuItem className={css.burgerText} button key={CONTACTS_ROUTE}>
                                <ContactMailIcon style={{marginRight: "5px", width: "1.1rem", height: "1.1rem"}}/>
                                <ListItemText
                                    primary={"Contacts"}
                                    onClick={() => closeHandler(CONTACTS_ROUTE)}
                                />
                            </MenuItem>
                            <MenuItem className={css.burgerText} button key={PASSENGER_ROUTE}>
                                <ListItemText
                                primary={"Transfer Buses"}
                                onClick={() => closeHandler(PASSENGER_ROUTE)}
                            /></MenuItem>
                            <MenuItem className={css.burgerText} button key={TRAVEL_TIPS}><ListItemText
                                primary={"Travel Tips"}
                                onClick={() => closeHandler(TRAVEL_TIPS)}
                            /></MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Toolbar>

        </AppBar>
    );
}

export default Header;










import React from 'react';
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { setSidebar} from "../../../../../../general/redux/slices/appSettingsSlice";
import { useDispatch } from "react-redux";
import css from "./Nav.module.css";
import {useStyles} from "../../../../../../general/MUI/useStyles";

const Nav = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <nav className={css.nav}>
            {/* <LanguageSelector />
            <currenciesSelector /> */}
            <IconButton
                onClick={() => dispatch(setSidebar(true))}
                edge="end"
                color="inherit"
                aria-label="menu"
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
        </nav>
    );
};

export default Nav;


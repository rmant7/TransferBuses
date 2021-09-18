import React from 'react';
import { useHistory } from 'react-router';
import { AppBar, Container, IconButton, Typography, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MenuIcon from '@material-ui/icons/Menu';

import { MAIN_ROUTE } from '../../utils/constants';
import { Sidebar, LanguageSelector } from '..';
import { setSidebar } from '../../redux/reducers/appReducer';
import CurrenciesSelector from '../CurrenciesSelector/CurrenciesSelector';
import { useStyles } from '../../utils/useStyles';
// import {useTranslation} from "react-i18next";

// const Navbar = ({ changeLanguage }) => {
const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed">
      {/*<Container maxWidth="lg" fixed >*/}
      {/*<Container maxWidth={'false !important'}>*/}
      {/*<Container className={classes.toolbarContainer}>*/}
      <Container style={{maxWidth: '100% !important'}}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push(MAIN_ROUTE)}>
            <span className={classes.title}
                  style={{marginLeft:"-16px", paddingRight:"16px", paddingBottom:"4px"}}
            >TransferBuses</span>
          </Typography>
          <nav className={classes.nav}>
            <LanguageSelector />
            <CurrenciesSelector />
            <IconButton
              onClick={() => dispatch(setSidebar(true))}
              edge="end"
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
          </nav>
        </Toolbar>
      </Container>
      <Sidebar />
    </AppBar>
  );
};

export default Navbar;

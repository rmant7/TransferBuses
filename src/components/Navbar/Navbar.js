import React from 'react';
import { useHistory } from 'react-router';
import { AppBar, Container, IconButton, Typography, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../../utils/useStyles';
import { MAIN_ROUTE } from '../../utils/constants';
import { Sidebar, LanguageSelector } from '..';
import { setSidebar } from '../../redux/reducers/appReducer';
import CurrenciesSelector from '../CurrenciesSelector/CurrenciesSelector';

const Navbar = ({ changeLanguage }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg" fixed>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push(MAIN_ROUTE)}>
            <span className={classes.titleName}>TransferBuses</span>
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

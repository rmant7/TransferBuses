import React from 'react';
import { useHistory } from 'react-router';
import { AppBar, Container, IconButton, Typography, Toolbar, Link } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../../utils/useStyles';
import { menuData } from '../../utils/menuData';
import { MAIN_ROUTE } from '../../utils/constants';
import Sidebar from './Sidebar/Sidebar';
import { setSidebar } from '../../redux/reducers/appReducer';
import logo from '../../assets/logo.png';
const Navbar = () => {
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
            <img src={logo} alt="Transfer Buses Logo" />
            <span className={classes.titleName}>TransferBuses</span>
          </Typography>
          <nav>
            {menuData.map((item) => (
              <Link
                color="inherit"
                variant="button"
                key={item.title}
                className={classes.link}
                onClick={() => history.push(item.path)}>
                {item.title}
              </Link>
            ))}
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

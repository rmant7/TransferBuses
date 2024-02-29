import React from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import css from './Nav.module.css';
import { useStyles } from '../../../../../../general/MUI/useStyles';
import useSidebar from '../../../hooks/useSidebar';

const Nav = () => {
  const { openSidebar } = useSidebar();
  const classes = useStyles();
  const handleOpenSidebar = () => {
    openSidebar();
  };

  return (
    <nav className={css.nav}>
      {/* <LanguageSelector />
            <currenciesSelector /> */}
      <IconButton
        onClick={() => handleOpenSidebar()}
        edge='end'
        color='inherit'
        aria-label='menu'
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    </nav>
  );
};

export default Nav;

import React from 'react';
import { AppBar, Toolbar } from "@material-ui/core";
// import { Sidebar } from "..";
import Sidebar from "./Sidebar/Sidebar";
import css from "./HeaderComponent.module.css";
import { LogoHeader } from "./Logos/Logos";
import Nav from "./Nav/Nav";
import { MAIN_ROUTE, CONTACTS_ROUTE } from "../../utils/constants";
import { useLocation } from 'react-router';

const HeaderComponent = () => {
  const page_mode = useStatePath();
  return (
    <AppBar position="fixed" className={css.elevation4}>
      <Toolbar className={css.navbar}>
        <LogoHeader page_mode={page_mode} />
        <Nav />
      </Toolbar>
      <Sidebar page_mode={page_mode} />
    </AppBar>
  );
}

export default HeaderComponent;

function useStatePath() {
  const { pathname } = useLocation();
  // if (pathname === MAIN_ROUTE || pathname === CONTACTS_ROUTE) {
  if (pathname === MAIN_ROUTE) {
    return "CheapTrip";
  }
  if (pathname === CONTACTS_ROUTE) {
    return "Contacts";
  }
  return "TransferBuses";
}
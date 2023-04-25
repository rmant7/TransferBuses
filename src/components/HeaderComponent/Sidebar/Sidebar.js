import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Drawer, ListItem, List, ListItemText, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import i18n from "../../../i18n";
import { getSidebar } from '../../../redux/selectors';
import { setSidebarAction } from '../../../redux/actions/app-actions';
import css from "./Sidebar.module.css";
import MenuTrip from "../MenuTrip/MenuTrip";
import { MAIN_ROUTE, CONTACTS_ROUTE } from '../../../utils/constants';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

const Sidebar = props => {
  const dispatch = useDispatch();
  const sidebar = useSelector(getSidebar);
  const history = useHistory();

  const closeHandler = path => {
    history.push(path);
    dispatch(setSidebarAction(false));
  };
  return (
    <Drawer
      anchor="right"
      open={sidebar}
      onClose={() => dispatch(setSidebarAction(false))}
    >

      <div className={css.sideBarHeader}>
        {/* <span>{props.page_mode}</span> */}
        {/* <div className={css.sideBarLine} /> */}
          <Typography
            style={{ fontSize: "1.25rem" }}
            className={css.sideBarHeaderText}>
            Our services
          </Typography>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(setSidebarAction(false))}
          />
      </div>

      <List>
        <ListItem button key={MAIN_ROUTE}>
          <AirplaneTicketOutlinedIcon style={{ marginRight: "5px", width: "1.2rem", height: "1.2rem" }}/>
          <ListItemText
            primary={i18n.t("CheapTrip")}
            onClick={() => closeHandler(MAIN_ROUTE)}
          />
        </ListItem>

        {/* <div className={css.sideBarLine} /> */}

        <MenuTrip />

        <ListItem button key=''>
          <BookOutlinedIcon style={{ marginRight: "5px", width: "1.2rem", height: "1.2rem" }}/>
          <ListItemText
            primary={i18n.t("BudgetTravelTips")}
            onClick={() => closeHandler()}
          />
        </ListItem>

        {/* <div className={css.sideBarLine} /> */}

        <ListItem button key={CONTACTS_ROUTE}>
          <PhoneOutlinedIcon style={{ marginRight: "5px", width: "1.1rem", height: "1.1rem" }}/>
          <ListItemText
            primary={i18n.t("Contacts")}
            onClick={() => closeHandler(CONTACTS_ROUTE)}
          />
        </ListItem>

        {/* <div className={css.sideBarLine} /> */}
      </List>

    </Drawer>

  );
};

export default Sidebar;









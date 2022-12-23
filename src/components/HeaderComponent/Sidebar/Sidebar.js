import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Drawer, ListItem, List, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import i18n from "../../../i18n";
import { getSidebar } from '../../../redux/selectors';
import { setSidebarAction } from '../../../redux/actions/app-actions';
import css from "./Sidebar.module.css";
import MenuTrip from "../MenuTrip/MenuTrip";
import { MAIN_ROUTE, CONTACTS_ROUTE } from '../../../utils/constants';

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
        <span>{props.page_mode}</span>
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(setSidebarAction(false))}
        />
      </div>

      <List>
        <ListItem button key={MAIN_ROUTE}>
          <ListItemText
            primary={i18n.t("CheapTrip")}
            onClick={() => closeHandler(MAIN_ROUTE)}
          />
        </ListItem>

        <MenuTrip />

        <ListItem button key={CONTACTS_ROUTE}>
          <ListItemText
            primary={i18n.t("Contacts")}
            onClick={() => closeHandler(CONTACTS_ROUTE)}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;









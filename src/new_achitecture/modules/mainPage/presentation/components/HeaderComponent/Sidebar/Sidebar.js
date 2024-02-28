import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Drawer, ListItem, List, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import i18n from "../../../../../trip_search/domain/entites/utils/language/i18n";
import { getSidebar } from '../../../../../trip_search/presentation/redux/reducers/selectors';
import { setSidebarAction } from '../../../../../trip_search/presentation/redux/reducers/actions/app-actions';
import css from "./Sidebar.module.css";
import { MAIN_ROUTE, CONTACTS_ROUTE } from '../../../../../trip_search/domain/entites/utils/constants/constants';
import MenuTrip from "../MenuTrip/MenuTrip";

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
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(setSidebarAction(false))}
        />
      </div>

      <List>
        <div className={css.sideBarLine} />

        <ListItem button key={MAIN_ROUTE}>
          <ListItemText
            primary={i18n.t("CheapTrip")}
            onClick={() => closeHandler(MAIN_ROUTE)}
          />
        </ListItem>

        <div className={css.sideBarLine} />

        <MenuTrip />

        <div className={css.sideBarLine} />

        <ListItem button key={CONTACTS_ROUTE}>
          <ListItemText
            primary={i18n.t("Contacts")}
            onClick={() => closeHandler(CONTACTS_ROUTE)}
          />
        </ListItem>

        <div className={css.sideBarLine} />
      </List>

    </Drawer>

  );
};

export default Sidebar;









import React from 'react';
import { Drawer, ListItem, List, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import i18n from '../../../../../trip_search/domain/entites/utils/language/i18n';
import css from './Sidebar.module.css';
import {
  MAIN_ROUTE,
  CONTACTS_ROUTE,
} from '../../../../../trip_search/domain/entites/utils/constants/constants';
import MenuTrip from '../MenuTrip/MenuTrip';
import useSidebar from '../../../hooks/useSidebar';

const Sidebar = (props) => {
  const { sidebar, closeAndProceedTo, closeSidebar } = useSidebar();

  const handleCloseSidebar = () => {
    closeSidebar();
  };

  return (
    <Drawer anchor='right' open={sidebar} onClose={() => handleCloseSidebar()}>
      <div className={css.sideBarHeader}>
        {/* <span>{props.page_mode}</span> */}
        <CloseIcon
          style={{ cursor: 'pointer' }}
          onClick={() => handleCloseSidebar()}
        />
      </div>
      <List>
        <div className={css.sideBarLine} />
        <ListItem button key={MAIN_ROUTE}>
          <ListItemText
            primary={i18n.t('CheapTrip')}
            onClick={() => closeAndProceedTo(MAIN_ROUTE)}
          />
        </ListItem>
        <div className={css.sideBarLine} />
        <MenuTrip />
        <div className={css.sideBarLine} />
        <ListItem button key={CONTACTS_ROUTE}>
          <ListItemText
            primary={i18n.t('Contacts')}
            onClick={() => closeAndProceedTo(CONTACTS_ROUTE)}
          />
        </ListItem>
        <div className={css.sideBarLine} />
      </List>
    </Drawer>
  );
};

export default Sidebar;

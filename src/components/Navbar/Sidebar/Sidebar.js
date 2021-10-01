import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Drawer, ListItem, List, ListItemText, Container, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { menuData } from '../../../utils/menuData';
import { useStyles } from '../../../utils/useStyles';
import i18n from "../../../i18n";
import { getSidebar } from '../../../redux/selectors';
import { setSidebarAction } from '../../../redux/actions/app-actions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector(getSidebar);
  const classes = useStyles();
  const history = useHistory();

  console.log(sidebar);

  const closeHandler = (path) => {
    history.push(path);
    dispatch(setSidebarAction(false));
  };
  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.paper }}
      open={sidebar}
      onClose={() => dispatch(setSidebarAction(false))}
    >
      <Container fluid className={classes.sidebarHeader}>
        <Container className={classes.sidebarHeaderInfo}>
          <CloseIcon style={{cursor: "pointer"}} onClick={() => dispatch(setSidebarAction(false))} />
          TransferBuses
        </Container>
      </Container>

      <List
        onClick={() => dispatch(setSidebarAction(false))}
        className={classes.sidebarList}
      >
        {menuData.map(item => (
          <ListItem button key={item.path}>
            <ListItemText
              primary={i18n.t(item.title)}
              onClick={() => closeHandler(item.path)}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

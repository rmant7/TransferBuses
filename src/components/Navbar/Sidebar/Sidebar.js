import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Drawer, ListItem, List, ListItemText, Container } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { menuData } from '../../../utils/menuData';
import { useStyles } from '../../../utils/useStyles';
import { setSidebar } from '../../../redux/reducers/appReducer';

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.app.sidebar);
  const classes = useStyles();
  const history = useHistory();

  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.paper }}
      open={sidebar}
      onClose={() => dispatch(setSidebar(false))}>
      <Container fluid className={classes.sidebarHeader}>
        <Container className={classes.sidebarHeaderInfo}>
          <CloseIcon onClick={() => dispatch(setSidebar(false))} />
          TransferBuses
        </Container>
      </Container>

      <List onClick={() => console.log("Need to close drawer on click here")} className={classes.sidebarList}>
        {menuData.map((item) => (
          <ListItem button key={item.path}>
            <ListItemText primary={item.title} onClick={() => history.push(item.path)} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

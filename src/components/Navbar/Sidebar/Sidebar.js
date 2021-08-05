import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ava from '../../../assets/avatar.png';
import {
  Drawer,
  ListItem,
  List,
  ListItemText,
  Container,
  Typography,
  Avatar,
} from '@material-ui/core';
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
    <Drawer anchor="right" open={sidebar} onClose={() => dispatch(setSidebar(false))}>
      <Container fluid className={classes.sidebarHeader}>
        <Container className={classes.sidebarHeaderInfo}>
          <CloseIcon onClick={() => dispatch(setSidebar(false))} />
          TranBus
        </Container>

        <Typography variant="h5" align="center">
          tproger1986
        </Typography>
        <Typography className={classes.sidebarEmail} gutterBottom>
          tproger1986@gmail.com
        </Typography>
        <Avatar alt="state.user.name" src={ava} className={classes.sidebarAvatar} />
      </Container>

      <List className={classes.sidebarList}>
        {menuData.map((item) => (
          <ListItem button key={item.path}>
            <ListItemText align="center" onClick={() => history.push(item.path)}>
              {item.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

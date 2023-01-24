import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import css from "./MenuTrip.module.css";
import { useStyles } from "../../../utils/useStyles";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setSidebarAction } from '../../../redux/actions/app-actions';
import { PASSENGER_ROUTE, DRIVER_ROUTE } from '../../../utils/constants';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rowHandleClick = path => {
    history.push(path);
    setAnchorEl(null);
    dispatch(setSidebarAction(false));
  };
  return (
    <div className={css.MenuTrip}>

      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={css.MenuTrip_btn}
      >
        TransferBuses
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'center' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.paperMenu }}
      >
        <MenuItem disabled>TransferBuses</MenuItem>
        <MenuItem onClick={() => rowHandleClick(PASSENGER_ROUTE)}>I'm a passenger</MenuItem>
        <MenuItem onClick={() => rowHandleClick(DRIVER_ROUTE)}>I'm a carrier</MenuItem>
      </Menu>

    </div>
  );
}





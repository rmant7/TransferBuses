import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import css from './MenuTrip.module.css';
import {
  PASSENGER_ROUTE,
  DRIVER_ROUTE,
} from '../../../../../trip_search/domain/entites/utils/constants/constants';
import { useStyles } from '../../../../../../general/MUI/useStyles';
import useMenuTrip from '../../../hooks/useMenuTrip';

const MenuTrip = () => {
  const { anchorEl, setAnchor, closeMenuTrip, clickAndProceedTo } =
    useMenuTrip();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  return (
    <div className={css.MenuTrip}>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        className={css.MenuTrip_btn}
      >
        TransferBuses
      </Button>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenuTrip}
        classes={{ paper: classes.paperMenu }}
      >
        <MenuItem disabled>TransferBuses</MenuItem>
        <MenuItem onClick={() => clickAndProceedTo(PASSENGER_ROUTE)}>
          I'm a passenger
        </MenuItem>
        <MenuItem onClick={() => clickAndProceedTo(DRIVER_ROUTE)}>
          I'm a carrier
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuTrip;

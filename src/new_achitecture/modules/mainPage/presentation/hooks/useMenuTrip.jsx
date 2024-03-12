import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { setSidebarAction } from '../../../trip_search/presentation/redux/reducers/actions/app-actions';
import useSidebar from './useSidebar';

const useMenuTrip = () => {
  const { closeSidebar } = useSidebar();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const setAnchor = (element) => {
    setAnchorEl(element);
  };

  const closeMenuTrip = () => {
    setAnchorEl(null);
  };

  const clickAndProceedTo = (path) => {
    history.push(path);
    setAnchorEl(null);
    closeSidebar();
  };

  const menuTripFunctions = {
    setAnchor,
    closeMenuTrip,
    clickAndProceedTo,
  };

  return { anchorEl, ...menuTripFunctions };
};

export default useMenuTrip;

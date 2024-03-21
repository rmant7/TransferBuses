import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// import { setSidebarAction } from '../../../trip_search/presentation/redux/reducers/actions/app-actions';
import {getSidebar} from "../../../../general/redux/selectors";

 // incorrect imports!
export function setSidebarAction(isSidebar) {
  return (dispatch) => dispatch({ type: 'SET_SIDEBAR', payload: isSidebar });
}

const useSidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector(getSidebar);
  const history = useHistory();

  const closeAndProceedTo = (path) => {
    history.push(path);
    dispatch(setSidebarAction(false));
  };

  const closeSidebar = () => {
    dispatch(setSidebarAction(false));
  };
  const openSidebar = () => {
    dispatch(setSidebarAction(true));
  };

  const sideBarFunctions = {
    closeAndProceedTo,
    closeSidebar,
    openSidebar,
  };

  return { sidebar, ...sideBarFunctions };
};

export default useSidebar;

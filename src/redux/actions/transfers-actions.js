import { getNextTransfers, getTransfers } from "../../services/data-service";
import { loadingNextTransfersAction, loadingTransfersAction } from "./loading-actions";
import _ from "lodash";
import { setFilterApplyAction } from "./filters-actions";
import { MAX_PAGE_SIZE } from "../../utils/constants";

export const SET_TRANSFERS_DATA = "set-transfers-data";
export const SET_TRANSFERS_IS_RECEIVED = "set-transfers-is-received";
export const SET_TRANSFERS_MESSAGE = "set-transfers-message";
export const SET_TRANSFERS_IS_NEXT = "set-transfers-is-next";

export function setTransfersAction(transfers) {
  return (dispatch) => {
    dispatch(setTransfersDataAction(transfers));
    dispatch(setTransfersReceivedAction(true));
    dispatch(setTransfersNextAction(transfers.length === MAX_PAGE_SIZE));
  };
}

export function setTransfersDataAction(data) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFERS_DATA,
      payload: data,
    });
}

export function setTransfersNextAction(isNext) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFERS_IS_NEXT,
      payload: isNext,
    });
}

export function setTransfersReceivedAction(isReceived) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFERS_IS_RECEIVED,
      payload: isReceived,
    });
}

export function setTransfersMessageAction(msg) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFERS_MESSAGE,
      payload: msg,
    });
}

export function getTransfersAction() {
  return async (dispatch) => {
    loadingTransfersAction(true);
    setTransfersReceivedAction(false);
    try {
      const transfers = await getTransfers();
      dispatch(setTransfersAction(transfers.slice()));
      dispatch(setFilterApplyAction(false));
    } catch (e) {
      dispatch(setTransfersMessageAction(e));
      dispatch(setTransfersReceivedAction(false));
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

export function getNextTransfersAction(lastTransfers) {
  return async (dispatch) => {
    dispatch(loadingNextTransfersAction(true));
    dispatch(setTransfersReceivedAction(false));
    try {
      const nextTransfers = await getNextTransfers(lastTransfers[lastTransfers.length - 1]);
      dispatch(setTransfersAction(_.concat(lastTransfers, nextTransfers)));
    } catch (e) {
      dispatch(setTransfersMessageAction(e));
      dispatch(setTransfersReceivedAction(false));
    } finally {
      dispatch(loadingNextTransfersAction(false));
    }
  };
}

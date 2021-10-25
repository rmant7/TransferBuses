import { getNextTransfers, getTransfers } from "../../services/data-service";
import { loadingNextTransfersAction, loadingTransfersAction } from "./loading-actions";
import _ from "lodash";
import { SET_IS_FILTER_APPLY } from "./filters-actions";
import { MAX_PAGE_SIZE } from "../../utils/constants";

export const SET_TRANSFERS_DATA = "set-transfers-data";
export const SET_TRANSFERS_IS_RECEIVED = "set-transfers-is-received";
export const SET_TRANSFERS_MESSAGE = "set-transfers-message";
export const SET_TRANSFERS_IS_NEXT = "set-transfers-is-next";

export function getTransfersAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    dispatch({
      type: SET_TRANSFERS_IS_RECEIVED,
      payload: false,
    });
    try {
      const transfers = await getTransfers();
      dispatch(loadingNextTransfersAction(false));
      dispatch({
        type: SET_TRANSFERS_IS_NEXT,
        payload: transfers.length === MAX_PAGE_SIZE,
      });
      dispatch({
        type: SET_IS_FILTER_APPLY,
        payload: false,
      });
      dispatch({
        type: SET_TRANSFERS_IS_RECEIVED,
        payload: true,
      });
      dispatch({
        type: SET_TRANSFERS_DATA,
        payload: transfers.slice(),
      });
    } catch (e) {
      dispatch({
        type: SET_TRANSFERS_MESSAGE,
        payload: e,
      });
      dispatch({
        type: SET_TRANSFERS_IS_RECEIVED,
        payload: false,
      });
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

export function getNextTransfersAction(lastTransfers) {
  return async (dispatch) => {
    dispatch(loadingNextTransfersAction(true));
    dispatch({
      type: SET_TRANSFERS_IS_RECEIVED,
      payload: false,
    });
    try {
      const nextTransfers = await getNextTransfers(lastTransfers[lastTransfers.length - 1]);
      dispatch({
        type: SET_TRANSFERS_IS_RECEIVED,
        payload: true,
      });
      dispatch({
        type: SET_TRANSFERS_IS_NEXT,
        payload: nextTransfers.length === MAX_PAGE_SIZE,
      });
      dispatch({
        type: SET_TRANSFERS_DATA,
        payload: _.concat(lastTransfers, nextTransfers),
      });
    } catch (e) {
      dispatch({
        type: SET_TRANSFERS_MESSAGE,
        payload: e,
      });
      dispatch({
        type: SET_TRANSFERS_IS_RECEIVED,
        payload: false,
      });
    } finally {
      dispatch(loadingNextTransfersAction(false));
    }
  };
}

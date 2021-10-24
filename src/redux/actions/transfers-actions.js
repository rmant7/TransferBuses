import { getNextTransfers, getTransfers, uploadNewTransfer } from "../../services/data-service";
import {
  loadingNextTransfersAction,
  loadingTransfersAction,
  loadingUploadTransferAction,
} from "./loading-actions";
import _ from "lodash";
import { SET_IS_FILTER_APPLY } from "./filters-actions";
import { MAX_PAGE_SIZE } from "../../utils/constants";

export const SET_SAVE_NEW_TRANSFER = "set-save-new-transfer";
export const SET_DATA = "set-transfers-data";
export const SET_IS_RECEIVED = "set-transfers-is-received";
export const SET_MESSAGE = "set-transfers-message";
export const SET_IS_NEXT = "set-transfers-is-next";

export function getTransfersAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    dispatch({
      type: SET_IS_RECEIVED,
      payload: false,
    });
    try {
      const transfers = await getTransfers();
      dispatch({
        type: SET_IS_NEXT,
        payload: transfers.length === MAX_PAGE_SIZE,
      });
      dispatch({
        type: SET_IS_FILTER_APPLY,
        payload: false,
      });
      dispatch({
        type: SET_IS_RECEIVED,
        payload: true,
      });
      dispatch({
        type: SET_DATA,
        payload: transfers.slice(),
      });
    } catch (e) {
      dispatch({
        type: SET_MESSAGE,
        payload: e,
      });
      dispatch({
        type: SET_IS_RECEIVED,
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
      type: SET_IS_RECEIVED,
      payload: false,
    });
    try {
      const nextTransfers = await getNextTransfers(lastTransfers[lastTransfers.length - 1]);
      dispatch({
        type: SET_IS_RECEIVED,
        payload: true,
      });
      dispatch({
        type: SET_IS_NEXT,
        payload: nextTransfers.length === MAX_PAGE_SIZE,
      });
      dispatch({
        type: SET_DATA,
        payload: _.concat(lastTransfers, nextTransfers),
      });
    } catch (e) {
      dispatch({
        type: SET_MESSAGE,
        payload: e,
      });
      dispatch({
        type: SET_IS_RECEIVED,
        payload: false,
      });
    } finally {
      dispatch(loadingNextTransfersAction(false));
    }
  };
}

export function saveNewTransferAction(transfer) {
  return async (dispatch) => {
    dispatch(loadingUploadTransferAction(true));
    try {
      await uploadNewTransfer(transfer)
        .then((response) => {
          console.log(response);
          // dispatch({
          //   type: SET_SAVE_NEW_TRANSFER,
          //   payload: { isAdded: true, transfer: response.data },
          // });
          // history.push("/");
        })
        .catch((error) => {
          console.log(error);
          // setState({ error: error });
          dispatch({
            type: SET_SAVE_NEW_TRANSFER,
            payload: { isAdded: false, data: {}, msg: error },
          });
        });
    } catch (e) {
      dispatch({ type: SET_SAVE_NEW_TRANSFER, payload: { isAdded: false, data: {}, msg: e } });
    } finally {
      dispatch(loadingUploadTransferAction(false));
    }
  };
}

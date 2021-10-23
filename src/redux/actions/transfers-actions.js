import { getNextTransfers, getTransfers, uploadNewTransfer } from "../../services/data-service";
import { getCityById } from "../../utils/cities";
import { setFiltersAction } from "./filters-actions";
import {
  loadingNextTransfersAction,
  loadingTransfersAction,
  loadingUploadTransferAction,
} from "./loading-actions";
import _ from "lodash";

export const SET_SAVE_NEW_TRANSFER = "set-save-new-transfer";
export const SET_TRANSFERS = "set-received-transfers";
export const SET_NEXT_TRANSFERS = "set-received-next-transfers";

export function getTransfersAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      // dispatch({ type: SET_TRANSFERS, payload: [] });
      const transfers = await getTransfers();
      dispatch({
        type: SET_TRANSFERS,
        payload: transfers.slice(),
      });
      dispatch({
        type: SET_NEXT_TRANSFERS,
        payload: transfers.slice(),
      });
    } catch (e) {
      dispatch({
        type: SET_TRANSFERS,
        payload: [],
      });
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

export function getNextTransfersAction(last) {
  return async (dispatch) => {
    dispatch(loadingNextTransfersAction(true));
    try {
      const nextTransfers = await getNextTransfers(last);
      dispatch({
        type: SET_NEXT_TRANSFERS,
        payload: nextTransfers,
      });
      dispatch({
        type: SET_TRANSFERS,
        payload: _.concat(last, nextTransfers),
      });
    } catch (e) {
      dispatch({
        type: SET_NEXT_TRANSFERS,
        payload: [],
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
            payload: { isAdded: false, transfer: {} },
          });
        });
    } catch (e) {
      dispatch({ type: SET_SAVE_NEW_TRANSFER, payload: {} });
    } finally {
      dispatch(loadingUploadTransferAction(false));
    }
  };
}

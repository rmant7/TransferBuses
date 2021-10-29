import { getTransfer, uploadNewTransfer } from "../../services/data-service";
import { loadingTransferAction, loadingUploadTransferAction } from "./loading-actions";

export const SET_TRANSFER_IS_RECEIVED = "set-transfer-is-received";
export const SET_TRANSFER_IS_SAVED = "set-transfer-is-saved";
export const SET_TRANSFER_DATA = "set-transfer-data";
export const SET_TRANSFER_MESSAGE = "set-transfer-message";

export function getTransferAction(id) {
  return async (dispatch) => {
    dispatch(loadingTransferAction(true));
    try {
      const transfer = await getTransfer(id);
      dispatch({
        type: SET_TRANSFER_IS_RECEIVED,
        payload: true,
      });
      dispatch({
        type: SET_TRANSFER_DATA,
        payload: transfer,
      });
    } catch (e) {
      dispatch({ type: SET_TRANSFER_IS_RECEIVED, payload: false });
      dispatch({ type: SET_TRANSFER_MESSAGE, payload: e });
    } finally {
      dispatch(loadingTransferAction(false));
    }
  };
}

export function setSavedNewTransferAction(isSaved) {
  return (dispatch) => {
    dispatch({
      type: SET_TRANSFER_IS_SAVED,
      payload: isSaved,
    });
  };
}

export function saveNewTransferAction(transfer) {
  return async (dispatch) => {
    dispatch(loadingUploadTransferAction(true));
    try {
      const res = await uploadNewTransfer(transfer);
      dispatch({
        type: SET_TRANSFER_IS_SAVED,
        payload: true,
      });
      dispatch({
        type: SET_TRANSFER_DATA,
        payload: res,
      });
      dispatch({ type: SET_TRANSFER_MESSAGE, payload: "success" });
    } catch (e) {
      dispatch({ type: SET_TRANSFER_IS_SAVED, payload: false });
      dispatch({ type: SET_TRANSFER_MESSAGE, payload: e });
    } finally {
      dispatch(loadingUploadTransferAction(false));
    }
  };
}

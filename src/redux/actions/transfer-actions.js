import { getTransfer, uploadNewTransfer } from "../../services/data-service";
import { loadingTransferAction, loadingUploadTransferAction } from "./loading-actions";

export const SET_TRANSFER_IS_RECEIVED = "set-transfer-is-received";
export const SET_TRANSFER_IS_SAVED = "set-transfer-is-saved";
export const SET_TRANSFER_DATA = "set-transfer-data";
export const SET_TRANSFER_MESSAGE = "set-transfer-message";

export function getTransferAction(id) {
  return async (dispatch) => {
    dispatch(loadingTransferAction(true));
    dispatch(setTransferReceivedAction(false));
    try {
      const transfer = await getTransfer(id);
      dispatch(setTransferDataAction(transfer));
      dispatch(setTransferReceivedAction(true));
    } catch (e) {
      dispatch(setTransferReceivedAction(false));
      dispatch(setTransferMessageAction(e));
    } finally {
      dispatch(loadingTransferAction(false));
    }
  };
}

export function setSavedNewTransferAction(isSaved) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFER_IS_SAVED,
      payload: isSaved,
    });
}

export function setTransferReceivedAction(isReceived) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFER_IS_RECEIVED,
      payload: isReceived,
    });
}

export function setTransferDataAction(data) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFER_DATA,
      payload: data,
    });
}

export function setTransferMessageAction(msg) {
  return (dispatch) =>
    dispatch({
      type: SET_TRANSFER_MESSAGE,
      payload: msg,
    });
}

export function saveNewTransferAction(transfer) {
  return async (dispatch) => {
    dispatch(loadingUploadTransferAction(true));
    dispatch(setSavedNewTransferAction(false));
    try {
      const res = await uploadNewTransfer(transfer);
      dispatch(setTransferDataAction(res));
      dispatch(setSavedNewTransferAction(true));
      dispatch(setTransferMessageAction("success"));
    } catch (e) {
      dispatch(setSavedNewTransferAction(false));
      dispatch(setTransferMessageAction(e));
    } finally {
      dispatch(loadingUploadTransferAction(false));
    }
  };
}

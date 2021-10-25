import { uploadNewTransfer } from "../../services/data-service";
import { loadingUploadTransferAction } from "./loading-actions";

export const SET_TRANSFER_IS_SAVED = "set-transfer-is-saved";
export const SET_TRANSFER_DATA = "set-transfer-data";
export const SET_TRANSFER_MESSAGE = "set-transfer-message";

export function saveNewTransferAction(transfer) {
  return async (dispatch) => {
    dispatch(loadingUploadTransferAction(true));
    try {
      await uploadNewTransfer(transfer);
      dispatch({
        type: SET_TRANSFER_IS_SAVED,
        payload: true,
      });
    } catch (e) {
      dispatch({ type: SET_TRANSFER_IS_SAVED, payload: false });
      dispatch({ type: SET_TRANSFER_MESSAGE, payload: e });
    } finally {
      dispatch(loadingUploadTransferAction(false));
    }
  };
}

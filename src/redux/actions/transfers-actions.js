import { getTransfers, uploadTransfer } from "../../services/data-service";
import { getCityById } from "../../utils/cities";
import { setFiltersAction } from "./filters-actions";
import { loadingTransfersAction, loadingUploadTransferAction } from "./loading-actions";

export const SET_SAVE_NEW_TRANSFER = "set-save-new-transfer";
export const SET_TRANSFERS = "set-received-transfers";

export function getTransfersAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
      const transfers = await getTransfers();
      dispatch({
        type: SET_TRANSFERS,
        payload: { isReceived: true, transfers: transfers.slice() },
      });
      dispatch(setFiltersAction(Array.from(new Set(transfers.map((t) => getCityById(t.from))))));
    } catch (e) {
      dispatch({
        type: SET_TRANSFERS,
        payload: { isReceived: false, transfers: [] },
      });
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

export function saveNewTransferAction(transfer) {
  return async (dispatch) => {
    dispatch(loadingUploadTransferAction(true));
    try {
      await uploadTransfer(transfer)
        .then((response) => {
          console.log(response);
          dispatch({
            type: SET_SAVE_NEW_TRANSFER,
            payload: { isAdded: true, transfer: response.data },
          });
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

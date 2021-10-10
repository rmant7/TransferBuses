import { getTransfers, uploadTransfer } from "../../services/data-service";
import { getCityById } from "../../utils/cities";
import { setFiltersAction } from "./filters-actions";
import { loadingTransfersAction, loadingUploadTransferAction } from "./loading-actions";

export const SET_SAVE_NEW_TRANSFER = 'set-save-new-transfer';
export const SET_TRANSFERS = 'set-received-transfers';

export function getTransfersAction() {
    return async (dispatch) => {
        try {
            dispatch(loadingTransfersAction(true));
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
            const transfers = await getTransfers();
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: true, transfers } });
            dispatch(setFiltersAction(Array.from(new Set(transfers.map(t => getCityById(t.from))))));
            dispatch(loadingTransfersAction(false));
        } catch (e) {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false, transfers: [] } });
            dispatch(loadingTransfersAction(false));
        };
    };
}

export function saveNewTransferAction(transfer) {
    return async (dispatch) => {
        try {
            dispatch(loadingUploadTransferAction(true));
            await uploadTransfer(transfer).then((response) => {
                console.log(response);
                dispatch({ type: SET_SAVE_NEW_TRANSFER, payload: { isAdded: true, transfer: response.data } });
                // history.push("/");
            })
                .catch((error) => {
                    console.log(error);
                    // setState({ error: error });
                    dispatch({ type: SET_SAVE_NEW_TRANSFER, payload: { isAdded: false, transfer: {} } });
                });
            dispatch(loadingUploadTransferAction(false));
        } catch (e) {
            dispatch({ type: SET_SAVE_NEW_TRANSFER, payload: {} });
            dispatch(loadingUploadTransferAction(false));
        };
    };
}
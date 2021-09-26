import { getTransfers, uploadTransfer } from "../../services/data-service";
import { loadingTransfersAction } from "./loadingActions";

export const SET_ADD_NEW_TRANSFER = 'set-add-new-transfer';
export const SET_TRANSFERS = 'set-received-transfers';

export function getTransfersAction() {
    return async (dispatch) => {
        try {
            dispatch(loadingTransfersAction(true));
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
            const transfers = await getTransfers();
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: true, transfers } });
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
            const uploaded = await uploadTransfer(transfer);
            dispatch({ type: SET_ADD_NEW_TRANSFER, payload: uploaded });
        } catch (e) {
            dispatch({ type: SET_ADD_NEW_TRANSFER, payload: {} });
        };
    };
}
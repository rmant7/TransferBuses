import { getTransfers, uploadTransfer } from "../../services/data-service";
import { SET_FILTERS } from "./filtersActions";
import { SET_LOADING_TRANSFERS } from "./loadingActions";

export const SET_ADD_NEW_TRANSFER = 'set-add-new-transfer';
export const SET_TRANSFERS = 'set-received-transfers';

export function getTransfersAction() {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
            dispatch({ type: SET_LOADING_TRANSFERS, payload: true });
            const transfers = await getTransfers();
            dispatch({ type: SET_LOADING_TRANSFERS, payload: false });
            const filters = Array.from(new Set(transfers));
            dispatch({ type: SET_FILTERS, payload: filters });
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: true, transfers } });
        } catch (e) {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
            dispatch({ type: SET_LOADING_TRANSFERS, payload: false });
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
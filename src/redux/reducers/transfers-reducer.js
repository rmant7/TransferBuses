import { SET_SAVE_NEW_TRANSFER, SET_TRANSFERS } from "../actions/transfers-actions";

const receiveTransfersState = {
    isReceived: false,
    transfers: []
}

export function transfersReducer(state = receiveTransfersState, action) {
    return action.type === SET_TRANSFERS ? action.payload : state;
}

export function fromCityTransfersReducer(state = receiveTransfersState, action) {
    return action.type === SET_TRANSFERS ? action.payload : state;
}

const newTransferState = {
    isAdded: false,
    transfer: {}
};

export function saveNewTransferReducer(state = newTransferState, action) {
    return action.type === SET_SAVE_NEW_TRANSFER ? action.payload : state;
}
import { SET_ADD_NEW_TRANSFER, SET_TRANSFERS } from "../actions/transfersActions";

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
    isAdded: false
};

export function addNewTransferReducer(state = newTransferState, action) {
    return action.type === SET_ADD_NEW_TRANSFER ? action.payload : state;
}
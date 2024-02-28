import { SET_FILTER_APPLY } from "./actions/filters-actions";
import { SET_NEXT_TRANSFERS, SET_SAVE_NEW_TRANSFER, SET_TRANSFERS } from "./actions/transfers-actions";

const receiveTransfersState = {
  isFilterApply: false,
  transfers: [],
  nextTransfers: [],
};

export function transfersReducer(state = receiveTransfersState, action) {
  switch (action.type) {
    case SET_FILTER_APPLY:
      return { ...state, isFilterApply: action.payload };
    case SET_TRANSFERS:
      return { ...state, transfers: action.payload };
    case SET_NEXT_TRANSFERS:
      return { ...state, nextTransfers: action.payload };
    default:
      return state;
  }
}

export function fromCityTransfersReducer(state = receiveTransfersState, action) {
  return action.type === SET_TRANSFERS ? action.payload : state;
}

const newTransferState = {
  isAdded: false,
  transfer: {},
};

export function saveNewTransferReducer(state = newTransferState, action) {
  return action.type === SET_SAVE_NEW_TRANSFER ? action.payload : state;
}

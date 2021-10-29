import {
  SET_TRANSFER_DATA,
  SET_TRANSFER_IS_SAVED,
  SET_TRANSFER_MESSAGE,
  SET_TRANSFER_IS_RECEIVED,
} from "../actions/transfer-actions";

const initialTransferState = {
  isReceived: false,
  data: {},
  msg: "",
};

const newTransferState = {
  isSaved: false,
  data: {},
  msg: "",
};

export function transferReducer(state = initialTransferState, action) {
  switch (action.type) {
    case SET_TRANSFER_IS_RECEIVED:
      return { ...state, isReceived: action.payload };
    case SET_TRANSFER_DATA:
      return { ...state, data: action.payload };
    case SET_TRANSFER_MESSAGE:
      return { ...state, msg: action.payload };
    default:
      return state;
  }
}

export function saveNewTransferReducer(state = newTransferState, action) {
  switch (action.type) {
    case SET_TRANSFER_IS_SAVED:
      return { ...state, isSaved: action.payload };
    case SET_TRANSFER_DATA:
      return { ...state, data: action.payload };
    case SET_TRANSFER_MESSAGE:
      return { ...state, msg: action.payload };
    default:
      return state;
  }
}

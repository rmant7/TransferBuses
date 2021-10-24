import { SET_DATA, SET_IS_NEXT, SET_IS_RECEIVED, SET_MESSAGE, SET_SAVE_NEW_TRANSFER } from "../actions/transfers-actions";

const receiveTransfersState = {
  isReceived: false,
  isNext: false,
  data: [],
  msg: "",
};

export function transfersReducer(state = receiveTransfersState, action) {
  switch (action.type) {
    case SET_IS_RECEIVED:
      return { ...state, isReceived: action.payload };
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_MESSAGE:
      return { ...state, msg: action.payload };
    case SET_IS_NEXT:
      return { ...state, isNext: action.payload };
    default:
      return state;
  }
}

const newTransferState = {
  isAdded: false,
  data: {},
  msg: "",
};

export function saveNewTransferReducer(state = newTransferState, action) {
  return action.type === SET_SAVE_NEW_TRANSFER ? action.payload : state;
}

import {
  SET_TRANSFERS_DATA,
  SET_TRANSFERS_IS_NEXT,
  SET_TRANSFERS_IS_RECEIVED,
  SET_TRANSFERS_MESSAGE,
} from "../actions/transfers-actions";

const receiveTransfersState = {
  isReceived: false,
  isNext: false,
  data: [],
  msg: "",
};

export function transfersReducer(state = receiveTransfersState, action) {
  switch (action.type) {
    case SET_TRANSFERS_IS_RECEIVED:
      return { ...state, isReceived: action.payload };
    case SET_TRANSFERS_DATA:
      return { ...state, data: action.payload };
    case SET_TRANSFERS_MESSAGE:
      return { ...state, msg: action.payload };
    case SET_TRANSFERS_IS_NEXT:
      return { ...state, isNext: action.payload };
    default:
      return state;
  }
}

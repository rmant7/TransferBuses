import {
  SET_TRANSFER_DATA,
  SET_TRANSFER_IS_SAVED,
  SET_TRANSFER_MESSAGE,
} from "../actions/transfer-upload-action";

const newTransferState = {
  isSaved: false,
  data: {},
  msg: "",
};

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

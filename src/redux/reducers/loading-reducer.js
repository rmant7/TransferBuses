import {
  SET_LOADING,
  SET_LOADING_NEXT_TRANSFERS,
  SET_LOADING_TRANSFER,
  SET_LOADING_TRANSFERS,
  SET_LOADING_UPLOAD_TRANSFER,
} from "../actions/loading-actions";

const defaultLoadingState = {
  isLoading: false,
  isLoadingTransfers: false,
  isLoadingTransfer: false,
  isLoadingNextTransfers: false,
  isLoadingNewTransfer: false,
};

export function loadingReducer(state = defaultLoadingState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_LOADING_TRANSFERS:
      return { ...state, isLoadingTransfers: action.payload };
    case SET_LOADING_TRANSFER:
      return { ...state, isLoadingTransfer: action.payload };
    case SET_LOADING_NEXT_TRANSFERS:
      return { ...state, isLoadingNextTransfers: action.payload };
    case SET_LOADING_UPLOAD_TRANSFER:
      return { ...state, isLoadingNewTransfer: action.payload };
    default:
      return state;
  }
}

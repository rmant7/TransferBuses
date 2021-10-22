export const SET_LOADING = "set-loading";
export const SET_LOADING_TRANSFERS = "set-loading-transfers";
export const SET_LOADING_NEXT_TRANSFERS = "set-loading-next-transfers";
export const SET_LOADING_UPLOAD_TRANSFER = "set-loading-upload-transfer";

export function loadingAction(isLoading) {
  return (dispatch) => dispatch({ type: SET_LOADING, payload: isLoading });
}

export function loadingTransfersAction(isLoading) {
  return (dispatch) => dispatch({ type: SET_LOADING_TRANSFERS, payload: isLoading });
}

export function loadingNextTransfersAction(isLoading) {
  return (dispatch) => dispatch({ type: SET_LOADING_NEXT_TRANSFERS, payload: isLoading });
}

export function loadingUploadTransferAction(isLoading) {
  return (dispatch) => dispatch({ type: SET_LOADING_UPLOAD_TRANSFER, payload: isLoading });
}

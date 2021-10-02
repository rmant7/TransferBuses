export const SET_LOADING = 'set-loading';
export const SET_LOADING_TRANSFERS = 'set-loading-transfers';

export function loadingAction(isLoading) {
    return (dispatch) => dispatch({ type: SET_LOADING, payload: isLoading });
}

export function loadingTransfersAction(isLoading) {
    return (dispatch) => dispatch({ type: SET_LOADING_TRANSFERS, payload: isLoading });
}
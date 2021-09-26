import { SET_LOADING, SET_LOADING_TRANSFERS } from "../actions/loadingActions";

const defaultLoadingState = {
    isLoading: true,
    isLoadingTransfers: true
};

export function loadingReducer(state = defaultLoadingState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_LOADING_TRANSFERS:
            return { ...state, isLoadingTransfers: action.payload };
        default:
            return state;
    }
}

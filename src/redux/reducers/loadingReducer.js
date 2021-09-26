import { SET_LOADING, SET_LOADING_TRANSFERS } from "../actions/loadingActions";

const defaultLoadingState = {
    loading: true,
    loadingTransfers: true
};

export function loadingReducer(state = defaultLoadingState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, sidebar: action.payload };
        case SET_LOADING_TRANSFERS:
            return { ...state, lang: action.payload };
        default:
            return state;
    }
}

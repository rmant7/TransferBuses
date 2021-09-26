import { SET_FILTERS, SET_SELECT_FILTER } from "../actions/filtersActions";

const filtersState = {
    filters: []
};

export function filtersReducer(state = filtersState, action) {
    return action.type === SET_FILTERS ? action.payload : state;
};

const selectedFiletrState = {};

export function selectFilterReducer(state = selectedFiletrState, action) {
    return action.type === SET_SELECT_FILTER ? action.payload : state;
};
export const SET_FILTERS = 'set-filters';
export const SET_SELECT_FILTER = 'set-select-filter';

export function setFiltersAction(filters) {
    return (dispatch) => dispatch({ type: SET_FILTERS, payload: filters });
}

export function selectFilterAction(cityId) {
    return (dispatch) => dispatch({ type: SET_SELECT_FILTER, payload: cityId });
}
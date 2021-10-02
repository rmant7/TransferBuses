export const SET_FROM_CITY = 'set-from-city';
export const SET_TO_CITY = 'set-to-city';

export function inputFromCityAction(txt) {
    return (dispatch) => dispatch({ type: SET_FROM_CITY, payload: txt });
}

export function inputToCityAction(txt) {
    return (dispatch) => dispatch({ type: SET_TO_CITY, payload: txt });
}
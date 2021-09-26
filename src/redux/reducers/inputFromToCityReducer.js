import { SET_FROM_CITY, SET_TO_CITY } from "../actions/inputFromToCityActions";

const inputFromToState = {
    inputFromCity: '',
    inputToCity: ''
}

export function inputFromToCityReducer(state = inputFromToState, action) {
    switch (action.type) {
        case SET_FROM_CITY:
            return { ...state, inputFromCity: action.payload };
        case SET_TO_CITY:
            return { ...state, inputToCity: action.payload };
        default:
            return state;
    }
}
import { SET_FILTER_FROM_CITIES, SET_IS_FILTER_APPLY } from "../actions/filters-actions";

const filtersState = {
  isFilterApply: false,
  fromCities: [],
};

export function filtersReducer(state = filtersState, action) {
  switch (action.type) {
    case SET_IS_FILTER_APPLY:
      return { ...state, isFilterApply: action.payload };
    case SET_FILTER_FROM_CITIES:
      return { ...state, fromCities: action.payload };
    default:
      return state;
  }
}

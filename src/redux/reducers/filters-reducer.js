import {
  SET_FILTERS_FOR_APPLY,
  SET_FILTER_FROM_CITIES,
  SET_FILTER_TO_CITIES,
  SET_IS_FILTER_APPLY,
} from "../actions/filters-actions";

const filtersState = {
  isFilterApply: false,
  filtersForApply: [],
  fromCities: [],
  toCities: [],
};

export function filtersReducer(state = filtersState, action) {
  switch (action.type) {
    case SET_IS_FILTER_APPLY:
      return { ...state, isFilterApply: action.payload };
    case SET_FILTERS_FOR_APPLY:
      return { ...state, filtersForApply: action.payload };
    case SET_FILTER_FROM_CITIES:
      return { ...state, fromCities: action.payload };
    case SET_FILTER_TO_CITIES:
      return { ...state, toCities: action.payload };
    default:
      return state;
  }
}

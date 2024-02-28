import { getTransfersByFromCityId } from "../../../../data/api/data-service";
import { loadingTransfersAction } from "./loading-actions";
import { SET_TRANSFERS } from "./transfers-actions";

export const SET_FILTERS = "set-filters";
export const SET_FILTER_APPLY = "set-filters-apply";
export const SET_SELECT_FILTER = "set-select-filter";

export function applyFilterFromCityIdAction(fromCityId) {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      const filteredCities = await getTransfersByFromCityId(fromCityId);
      dispatch({
        type: SET_FILTER_APPLY,
        payload: true,
      });
      dispatch({
        type: SET_TRANSFERS,
        payload: filteredCities.slice(),
      });
    } catch (e) {
      dispatch({
        type: SET_TRANSFERS,
        payload: [],
      });
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

export function setFiltersAction(filters) {
  return (dispatch) => dispatch({ type: SET_FILTERS, payload: filters });
}

export function selectFilterAction(city) {
  return (dispatch) => dispatch({ type: SET_SELECT_FILTER, payload: city });
}

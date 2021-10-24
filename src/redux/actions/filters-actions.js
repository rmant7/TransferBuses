import { getAllTransfers, getTransfersByFromCityId } from "../../services/data-service";
import { getCityById } from "../../utils/cities";
import { loadingTransfersAction } from "./loading-actions";
import { SET_DATA, SET_IS_RECEIVED, SET_MESSAGE } from "./transfers-actions";

export const SET_FILTER_FROM_CITIES = "set-filter-from-cities";
export const SET_IS_FILTER_APPLY = "set-is-filters-apply";

export function applyFilterFromCityIdAction(city) {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      const filteredTransfers = await getTransfersByFromCityId(city);
      dispatch({
        type: SET_IS_FILTER_APPLY,
        payload: true,
      });
      dispatch({
        type: SET_IS_RECEIVED,
        payload: true,
      });
      dispatch({
        type: SET_DATA,
        payload: filteredTransfers.slice(),
      });
    } catch (e) {
      dispatch({
        type: SET_IS_RECEIVED,
        payload: false,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: e,
      });
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

export function getFiltersAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      const transfers = await getAllTransfers();
      const fromCities = Array.from(new Set(transfers.map((t) => getCityById(t.from))));
      dispatch({
        type: SET_FILTER_FROM_CITIES,
        payload: fromCities,
      });
    } catch (e) {
      dispatch({
        type: SET_FILTER_FROM_CITIES,
        payload: [],
      });
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

import _ from "lodash";
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

export function filtersCityFromAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      const transfers = await getAllTransfers();
      const fromCities = transfers.map((t) => getCityById(t.from));
      const fromCitiesEn = Array.from(new Set(fromCities.map((c) => c.name)));
      const fromCitiesRu = Array.from(new Set(fromCities.map((c) => c.name_ru)));
      dispatch({
        type: SET_FILTER_FROM_CITIES,
        payload: _.concat(fromCitiesEn, fromCitiesRu),
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

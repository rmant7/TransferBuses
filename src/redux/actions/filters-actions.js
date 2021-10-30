import { getAllFiltersFromCity, getAllFiltersToCity } from "../../services/data-service";
import { getCityById } from "../../utils/cities-util";
import { convertToFilter } from "../../utils/filters-util";
import { loadingTransfersAction } from "./loading-actions";
import {
  getTransfersByAction,
} from "./transfers-actions";

export const SET_FILTER_FROM_CITIES = "set-filter-from-cities";
export const SET_FILTER_TO_CITIES = "set-filter-to-cities";
export const SET_IS_FILTER_APPLY = "set-is-filters-apply";
export const SET_FILTERS_FOR_APPLY = "set-filters-for-apply";

// export function applyFilterFromCityIdAction(city) {
//   return async (dispatch) => {
//     dispatch(loadingTransfersAction(true));
//     try {
//       const filteredTransfers = await getTransfersByFromCityId(city);
//       dispatch({
//         type: SET_IS_FILTER_APPLY,
//         payload: true,
//       });
//       dispatch({
//         type: SET_TRANSFERS_IS_RECEIVED,
//         payload: true,
//       });
//       dispatch({
//         type: SET_TRANSFERS_DATA,
//         payload: filteredTransfers.slice(),
//       });
//     } catch (e) {
//       dispatch({
//         type: SET_TRANSFERS_IS_RECEIVED,
//         payload: false,
//       });
//       dispatch({
//         type: SET_TRANSFERS_MESSAGE,
//         payload: e,
//       });
//     } finally {
//       dispatch(loadingTransfersAction(false));
//     }
//   };
// }

export function setFilterApplyAction(isApply) {
  return (dispatch) =>
    dispatch({
      type: SET_IS_FILTER_APPLY,
      payload: isApply,
    });
}

export function setFiltersForApplyAction(filters) {
  return (dispatch) =>
    dispatch({
      type: SET_FILTERS_FOR_APPLY,
      payload: filters,
    });
}

export function applyFiltersAction(values, keys) {
  return (dispatch) => {
    const filters = convertToFilter(values, keys);
    dispatch(setFiltersForApplyAction(filters));
    dispatch(getTransfersByAction(filters));
  };
}

export function filtersFromCityAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      const filters = await getAllFiltersFromCity();
      const fromCities = filters.map((v) => getCityById(v._id));
      // const fromCitiesEn = Array.from(fromCities.map((c) => c.name));
      const fromCitiesRu = Array.from(fromCities.map((c) => c.name_ru));
      dispatch({
        type: SET_FILTER_FROM_CITIES,
        // payload: _.concat(fromCitiesEn, fromCitiesRu),
        payload: fromCitiesRu,
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

export function filtersToCityAction() {
  return async (dispatch) => {
    dispatch(loadingTransfersAction(true));
    try {
      const filters = await getAllFiltersToCity();
      const toCities = filters.map((v) => getCityById(v._id));
      // const fromCitiesEn = Array.from(fromCities.map((c) => c.name));
      const toCitiesRu = Array.from(toCities.map((c) => c.name_ru));
      dispatch({
        type: SET_FILTER_TO_CITIES,
        payload: toCitiesRu,
      });
    } catch (e) {
      dispatch({
        type: SET_FILTER_TO_CITIES,
        payload: [],
      });
    } finally {
      dispatch(loadingTransfersAction(false));
    }
  };
}

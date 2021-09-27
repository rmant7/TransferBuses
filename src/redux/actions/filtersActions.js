import { getTransfersByFromCityId } from "../../services/data-service";
import { loadingTransfersAction } from "./loadingActions";
import { SET_TRANSFERS } from "./transfersActions";

export const SET_FILTERS = 'set-filters';
export const SET_SELECT_FILTER = 'set-select-filter';

export function applyFilterFromCityIdAction(fromCityId) {
    return async (dispatch) => {
        try {
            dispatch(loadingTransfersAction(true));
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
            const filteredCities = await getTransfersByFromCityId(fromCityId);
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: true, transfers: filteredCities } });
            dispatch(loadingTransfersAction(false));
        } catch (e) {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false, transfers: [] } });
            dispatch(loadingTransfersAction(false));
        };
    };
}

export function setFiltersAction(filters) {
    return (dispatch) => dispatch({ type: SET_FILTERS, payload: filters });
}

export function selectFilterAction(city) {
    return (dispatch) => dispatch({ type: SET_SELECT_FILTER, payload: city });
}
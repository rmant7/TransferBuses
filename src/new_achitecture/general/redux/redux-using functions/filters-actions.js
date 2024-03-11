import { getTransfersByFromCityId } from "../../../modules/trip_search/data/api/data-service";
import { setLoadingTransfers } from "../../../modules/trip_search/presentation/redux/slices/loadingSlice";
import {setFilterApply, setTransfers} from "../../../modules/trip_search/presentation/redux/slices/transferSlice";

export function applyFilterFromCityIdAction(fromCityId) {
  return async (dispatch) => {
    dispatch( setLoadingTransfers(true));
    try {
      const filteredCities = await getTransfersByFromCityId(fromCityId);
      dispatch(setFilterApply(true));
      dispatch(setTransfers(filteredCities.slice()));
    } catch (e) {
      dispatch(setTransfers([]));
    } finally {
      dispatch(setLoadingTransfers(false));
    }
  };
}
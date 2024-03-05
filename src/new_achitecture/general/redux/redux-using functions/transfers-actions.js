import { getNextTransfers, getTransfers } from "../../../modules/trip_search/data/api/data-service";
import {  setLoadingTransfers, setLoadingNextTransfers} from "../../../modules/trip_search/presentation/redux/slices/loadingSlice";
import _ from "lodash";
import {setFilterApply, setTransfers, setNextTransfers} from '../../../modules/trip_search/presentation/redux/slices/transferSlice';


export function getTransfersAction() {
  return async (dispatch) => {
    dispatch(setLoadingTransfers(true));
    try {
      const transfers = await getTransfers();
      dispatch(setFilterApply(true));
      dispatch(setTransfers(transfers.slice()));
      dispatch(setNextTransfers(transfers.slice()));
    } catch (e) {
      dispatch(setTransfers([]));
    } finally {
      dispatch(setLoadingTransfers(false));
    }
  };
}

export function getNextTransfersAction(lastTransfers) {
  return async (dispatch) => {
    dispatch(setLoadingNextTransfers(true));
    try {
      const nextTransfers = await getNextTransfers(lastTransfers[lastTransfers.length - 1]);
      dispatch(setNextTransfers(nextTransfers));
      dispatch(setTransfers(_.concat(lastTransfers, nextTransfers)));
    } catch (e) {
      dispatch(setNextTransfers([]));
    } finally {
      dispatch(setLoadingNextTransfers(false));
    }
  };
}

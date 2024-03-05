import { combineReducers } from 'redux';
import appReducer from '../../modules/trip_search/presentation/redux/reducers/app-reducer';
import {
  filtersReducer,
  selectFilterReducer,
} from '../../modules/trip_search/presentation/redux/reducers/filters-reducer';
import { inputFromToCityReducer } from '../../modules/trip_search/presentation/redux/reducers/inputs-reducer';
import { loadingReducer } from '../../modules/trip_search/presentation/redux/reducers/loading-reducer';
import {
  fromCityTransfersReducer,
  saveNewTransferReducer,
  transfersReducer,
} from '../../modules/trip_search/presentation/redux/reducers/transfers-reducer';
import dataReducer from '../../modules/trip_search/presentation/redux/reducers/dataSlice';
import cheapTripSearch from './../../modules/trip_search/presentation/redux/reducers/cheapTripSearch/cheapTripSearchSlice';

export const rootReducer = combineReducers({
  app: appReducer,
  transfersData: transfersReducer,
  saveNewTransfer: saveNewTransferReducer,
  fromCityTransfersData: fromCityTransfersReducer,
  filters: filtersReducer,
  selectFilter: selectFilterReducer,
  inputFromToCity: inputFromToCityReducer,
  loading: loadingReducer,
  data: dataReducer,
  cheapTripSearch,
});
